import React, {Component, useState} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { EditingState, DataTypeProvider } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow , TableEditRow, TableEditColumn,
          TableColumnResizing, DragDropProvider, TableColumnReordering, TableColumnVisibility
          } from '@devexpress/dx-react-grid-bootstrap4';

import {BASE_ACCOUNTANT_API} from '../global/url'
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {actions as employeeactions, employeeReducer} from '../redux/employee'
import {actions as selecteactions, selectReducer} from '../redux/select'
import {actions as accountantActions, accountantReducer} from '../redux/accountant'
import {types as messagetypes,actions as messageactions, messageReducer} from '../redux/message'
//import ReactTable from "react-table";
//import "react-table/react-table.css";
import { BrowserRouter as Router, Route, Switch,Link, Redirect } from 'react-router-dom';
import axios from 'axios'

import { Form, Text,Select,Checkbox } from 'react-form';

//import ActionColumn  from './ReactGridAddOn/plugins/ActionColumn/ActionColumn'



const mapDispatchToProps = (dispatch, ownProps) => ({
  failed: (msg) => dispatch(messageactions.failed(msg)),
  loading: (msg) => dispatch(messageactions.loading(msg)),
  success: (msg) => dispatch(messageactions.success(msg)),
  reset: () => dispatch(messageactions.reset())

})

//getting select data from redux
const mapStateToProps = ({employeeReducer, selectReducer,messageReducer,accountantReducer}) => {
  console.log(accountantReducer)
  return{
    employeesSelect :employeeReducer.select,
    employeeSelectForm: employeeReducer.selectForm,
    statusSelect: selectReducer.status,
    statusSelectForm: selectReducer.statusForm,
    selectAccountantStatus: accountantReducer.selectStatus
  }
}
// for some reason the custom data provider is put here
const DateEditor = ({ value, onValueChange }) => (
    <div className = "form-group"  >
      <input type ="date" className="form-control"
      value={value}
      onChange={e => onValueChange(e.target.value)}
      />
    </div>

);
//end of the custom data provider
const DateFormatter = ({ value }) => (
  <span className="badge badge-secondary">
    {value ? value : 'undefined'}
  </span>
);
const DateProvider = props => (
  <DataTypeProvider
    formatterComponent={DateFormatter}
    editorComponent={DateEditor}
    {...props}
  />
);
// for some reason the custom data provider is put here
const StatusDropdownEditor = ({ value, onValueChange }) => (


  <select
    className="form-control"
    value={value}
    onChange={e => onValueChange(e.target.value)}
  >

    <option value='unpaid'>
      Unpaid
    </option>
    <option value = 'paid'>
      Paid
    </option>
    <option value = 'email_sent'>
      Email Sent
    </option>
  </select>
);
//end of the custom data provider
const DropdownFormatter = ({ value }) => (
  <span className="badge badge-secondary">
    {value ? value : 'undefined'}
  </span>
);
const StatusDropdownProvider = props => (
  <DataTypeProvider
    formatterComponent={DropdownFormatter}
    editorComponent={StatusDropdownEditor}
    {...props}
  />
);






class AccountantDetail extends Component{
  constructor(props){
    super(props);


    this.state = {
      payments:[],
      tempPayments : [], //for filtering purpose, so when it whant to go back to its previous state it just have to refer to `clients` state
      column:[
        {
          title: 'id',
          name: 'id',
          getCellValue: row => (row.id ? row.id : undefined)
        },
        {
          title: 'amount',
          name: 'amount',
        },
        {
          title: 'Payment Date',
          name: 'payment_date',

        },
        {
          title: 'status',
          name: 'status',
          getCellValue: row => (row.status ? row.status : undefined)
        },
        {
          title: 'Send Email',
          name: 'actionButton',
          editable: false
        }

      ],
      editingColumnExtensions: [
       {
         columnName: 'payment_date',
         createRowChange: (row, value) => ({ ...row, payment_date: value }),
       },
       {
         columnName: 'amount',
         createRowChange: function (row, value){
              console.log(row, value)
              return {...row, amount:value}
          },
       },
       {
         columnName: 'status',
         createRowChange: (row, value) => ({ ...row, status: value }),
       },
       {
         columnName: 'actionButton',
         editingEnabled: false
       },

     ],
      defaultColumnWidths: [
        { columnName: 'id', width: 180 },
        { columnName: 'amount', width: 180 },
        { columnName: 'payment_date', width: 180 },
        { columnName: 'status', width: 180 },
        { columnName: 'actionButton', width: 180 },
      ],
      formdata:{
        FirstName:"",
        LastName:"",
        DateofBirth:"",
        Mobile:"",
        Vexpiry:["",""],
        tim:["",""],// last contact date
        CurrentStatus:"",
        UserID:"",//the employee user id
        Nationality:"",
        Course:"",
        Visa:""
      }
      //end of form data
    }
    this.insertPayment = this.insertPayment.bind(this)
    this.updatePayment = this.updatePayment.bind(this)
    this.commitChanges = this.commitChanges.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.addActionBtn = this.addActionBtn.bind(this)

  }
  fetchData(){
    var self = this
    axios.get("/api/educationPayment/"+this.props.eduId)
    .then(res => res)
    .then(function(response){
      //set the state for client data

      console.log(response)
      return response.data
    }).then((data) => {
      if(!data.education){
        self.props.failed("no payments yet for this application")
      }else{

        var education = data.education
        var computedEducation = education.map((value) => {

                                value.actionButton = self.addActionBtn.call(self, { index: value.id })

                                return value
                              })
        console.log("my data",computedEducation)
        self.setState({
            tempPayments: computedEducation,
            payments: computedEducation
          })

        self.props.success("successfully loaded the payment data")
      }
    })
    .catch(function(error){
      console.log(error)
      self.props.failed("Failed loading data. Something went wrong")
    })
  }
  insertPayment(values){
    var self = this
    console.log(values)
    var tempActionButton = self.addActionBtn.call(self, { index: values.id })
    delete values.actionButton
    var newValues = {...values,...{education_id:this.props.eduId}}
    var finalResult = []
    //values.education_id = this.props.eduId
    axios.post("/api/educationPaymentInsert/",newValues)
    .then(
      function(response){
        return response
      }).then(
        function(result){

          if(result.data.success){
            self.props.success(result.data.msg)
            //if it goes into the register greet it
            //self.sleep(1000)
            console.log("insert payment after api",result.data)
            finalResult =  result.data.inserted_payment
          }else{
            self.props.failed(result.data.msg)
          }
        }
        ).catch(function(error){
          console.log(error)
          self.props.failed("Sorry an Error has Occurred")


        })
        return finalResult
  }

  updatePayment(values){
    console.log(values)
    var self = this
    var tempActionButton = values.actionButton
    delete values.actionButton
    self.props.loading("Updating Payment Please Wait")

    axios.put("/api/educationPaymentUpdate/"+values.id,values).then(
      function(response){
        return response
      }).then(
        function(result){

          if(result.data.success){
            self.props.success(result.data.msg)

          }else{
            self.props.failed(result.data.msg)
          }
        }
        ).catch(function(error){
          self.props.failed("Sorry an Error has Occurred")


        })


  }


  commitChanges({ added, changed, deleted }) {
    var self = this
    let payments  = this.state.payments;
    if(added){
      console.log("added",added)

      added.forEach(function (item, key) {
      	var insertedPayment = self.insertPayment(item)
        console.log("insertedPayment",insertedPayment)
        var id = insertedPayment.id
        insertedPayment.actionButton = self.addActionBtn.call(self, { index: id })
        self.setState({
          tempPayments: [insertedPayment,...self.state.tempPayments],
          payments: [insertedPayment,...self.state.tempPayments,]
        })
      });
      console.log(this.state.tempPayments)
      //this.fetchData()
    }
    if (changed){

      console.log("changed",changed)
      for (var key in changed) {
      	if (changed.hasOwnProperty(key)) {
      		console.log(key); // key (ex. sandwich)
      		console.log(changed[key]); // value (ex. turkey)
          this.updatePayment(changed[key])

          //payment after edit
          var editedPayments = payments.map(function(value){
            if(value.id == changed[key].id){

              return {...value,...changed[key]}
            }
            return value
          });
          console.log(editedPayments)
          self.setState({
            tempPayments: editedPayments,
            payments: editedPayments
          })



      	}
      }

    }
    if (deleted){
      console.log("deleted",deleted)
    }


  }
  addActionBtn ({ index }){
       return (
           <button
               className="btn"
               onClick={id => alert('edit id: ' + index)}
           >
               Reset
           </button>
       );
   };

  render () {
    const getRowId = row => row.id;
    const actions = [
        {
            icon: 'Send Email',
            action: id => alert('edit id: ' + id)
        }
    ];
    //var [rows, setRows] = useState(this.state.tempPayments);
    return (
      <div>


          <Grid
            rows={this.state.tempPayments}
            columns={this.state.column}
            getRowId={getRowId}
            >
            <StatusDropdownProvider for = {['status']} />
            <DateProvider for = {['payment_date']} />
            <EditingState
               onCommitChanges={this.commitChanges}
               columnExtensions={this.state.editingColumnExtensions}
             />



            <Table />
            <DragDropProvider />

            <TableColumnResizing defaultColumnWidths={this.state.defaultColumnWidths} />
            <TableColumnReordering
                defaultOrder={['id','amount', 'payment_date', 'status','actionButton']}
            />
            <TableColumnVisibility
              defaultHiddenColumnNames={['id']}
            />

            <TableHeaderRow />


            <TableEditRow />

            <TableEditColumn
               showAddCommand
               showEditCommand

             />

          </Grid>


      </div>
    )
  }
  componentWillMount(){
    this.fetchData()
  }
  shouldComponentUpdate(nextProps, nextState){
    var self = this;
    if(nextState!== this.state || nextProps!== this.props){
      return true

    }
    return false
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AccountantDetail)
