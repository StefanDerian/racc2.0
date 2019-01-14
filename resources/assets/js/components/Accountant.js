import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactTable from "react-table";
import {BASE_ACCOUNTANT_API} from '../global/url'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {actions as employeeactions, employeeReducer} from '../redux/employee'
import {actions as selecteactions, selectReducer} from '../redux/select'
import {types as messagetypes,actions as messageactions, messageReducer} from '../redux/message'
import "react-table/react-table.css";
import { BrowserRouter as Router, Route, Switch,Link, Redirect } from 'react-router-dom';



const mapDispatchToProps = (dispatch, ownProps) => ({
  failed: (msg) => dispatch(messageactions.failed(msg)),
  loading: (msg) => dispatch(messageactions.loading(msg)),
  success: (msg) => dispatch(messageactions.success(msg)),
  reset: () => dispatch(messageactions.reset())

})

//getting select data from redux
const mapStateToProps = ({employeeReducer, selectReducer,messageReducer}) => {

  return{
    employeesSelect :employeeReducer.select,
    employeeSelectForm: employeeReducer.selectForm,
    statusSelect: selectReducer.status,
    statusSelectForm: selectReducer.statusForm,

  }
}
class Accountant extends Component{
  constructor(props){
    super(props)
    this.state = {
      clients:[],
      tempClients : [], //for filtering purpose, so when it whant to go back to its previous state it just have to refer to `clients` state
      //end of form data
      urgentIds : [],
    }
  }


  render(){
    const options = {
      exportCSVText: 'Export CSV',
      printToolBar: true
    };
    const selectRow = {
      mode: 'checkbox', // or checkbox
      className: 'table-danger',// change class name or turn this into red once selected
      onSelect: this.handleRowSelect, //handle row selection
      selected:this.state.urgentIds, //selected value of urgent data
      clickToExpand: true,// expand the detail of the data
      showOnlySelected: true //display urgent client only
    };
    const expandColumnComponent = ({ isExpandableRow, isExpanded }) => {
        let content = '';

        if (isExpandableRow) {
          content = (isExpanded ? '(-)' : '(+)' );
        } else {
          content = ' ';
        }
        return (
          <div> <button className = "btn btn-danger btn-sm">{ content } </button></div>
        );
    }
    const expandComponent = (row)=>{

      return (
        <div>
            <div className = "row">
              <Link to ={{pathname:"Detail/"+row.UserID+"/accountantDetail"}} className="btn btn-primary">Update Education Payment</Link>
              <Link to ={{pathname:"Detail/"+row.UserID+"/education"}} className="btn btn-primary">Update Education Data</Link>
            </div>
            <div className = "row">
              <dl>
                <dt>First Name</dt>
                <dd>{row.FirstName}</dd>
                <dt>Last Name</dt>
                <dd>{row.LastName}</dd>
                <dt>Mobile Number</dt>
                <dd>{row.Mobile}</dd>
                <dt>Date of Birth</dt>
                <dd>{row.DateofBirth}</dd>
                <dt>Email</dt>
                <dd>{row.Email}</dd>
                <dt>Nationality</dt>
                <dd>{row.Nationality}</dd>
                <dt>Client Status</dt>
                <dd>{row.CurrentStatus}</dd>
                <dt>Visa Expiry Date</dt>
                <dd>{row.Vexpiry}</dd>
                <dt>Visa Type</dt>
                <dd>{row.Visa}</dd>
                <dt>Course</dt>
                <dd>{row.Course}</dd>
                <dt>Expected Graduation Date</dt>
                <dd>{row.uni_compl}</dd>
                <dt>Due Date</dt>
                <dd>{row.duedate}</dd>


              </dl>

            </div>




        {/*detailed expanded data*/}
        </div>
      );
    }
    return (
      <div>

        <BootstrapTable ref = "accountantsTable" data={this.state.tempClients}

          style={{ width: "50%" }}
          options={options}

          expandableRow={(row) => true}
          expandComponent={ expandComponent }
          expandColumnOptions={ {
             expandColumnVisible: true,
             expandColumnComponent: expandColumnComponent,
             columnWidth: 50
           } }
          autoCollapse={ true }
          exportCSV striped hover pagination>
          <TableHeaderColumn isKey dataField='UserID' dataSort={ true }  hidden>Client ID</TableHeaderColumn>
          <TableHeaderColumn width="150px"  filter={ { type: 'TextFilter', delay: 1000 } } ref = 'FirstName' dataField='FirstName' dataSort={ true } columnTitle>First Name</TableHeaderColumn>
          <TableHeaderColumn width="150px" filter={ { type: 'TextFilter', delay: 1000 } } ref = 'LastName' dataField='LastName' dataSort={ true } columnTitle>LastName</TableHeaderColumn>
          <TableHeaderColumn width="150px"  filter={ { type: 'TextFilter', delay: 1000 } } ref = 'Mobile' dataField='Mobile' dataSort={ true } columnTitle>Mobile Number</TableHeaderColumn>
          <TableHeaderColumn width="150px" filter={ { type: 'TextFilter' } } ref = 'DateofBirth' dataField='DateofBirth' dataSort={ true } columnTitle>DOB</TableHeaderColumn>
          <TableHeaderColumn width="150px" filter={ { type: 'TextFilter', delay: 1000 } } ref = 'Email' dataField='Email' dataSort={ true } columnTitle>Email</TableHeaderColumn>
          <TableHeaderColumn width="150px" filter={ { type: 'TextFilter', delay: 1000 } } ref = 'Nationality' dataField='Nationality' dataSort={ true } columnTitle>Nationality</TableHeaderColumn>
          <TableHeaderColumn width="150px" filter={ { type: 'TextFilter', delay: 1000 } } dataField='Course' ref='Course' dataSort={ true } columnTitle>Course</TableHeaderColumn>

        </BootstrapTable>



        {/* <ReactTable
          data={this.state.tempClients}
          columns={[
            {
              Header: "Name",
              columns: [
                {
                  Header: "First Name",
                  accessor: "FirstName"
                },
                {
                  Header: "Last Name",
                  id: "LastName",
                  accessor: "LastName"
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className=" table -striped -highlight"
        /> */}
      </div>
    )
  }
  componentWillMount(){
    var self = this;
    var url = "/api/clientCustomData"

    self.props.loading("loading data please wait")
    axios.post(url,[["service","=","education"]])
    .then(res => res)
    .then(function(response){
      //set the state for client data

      console.log(response)
      if(response.data.data){
        self.props.failed("you still do not have any clients")
      }
      self.setState({clients:response.data.data})

      //set the state for temporary client data which is used for filtering
      self.setState({tempClients:response.data.data})

      return response.data.data
    }).then((reponse) => {
      //select urgent clients
      self.props.success("successfully loaded data")
      const urgent = self.state.clients.filter((client) =>{
        return client.urgent == 1
      });
      //get their id htmlFor the bootstrap react table library
      const filtered = urgent.map((client)=>{
        return client.clientId
      })

      //checkpoint for reseting data
      self.setState({defaultFormData: {...self.state.formdata}});
      //set it in state
      self.setState({urgentIds:filtered})

    })
    .catch(function(error){
      self.props.loading("Failed loading data. Something went wrong")
    })
  }
  shouldComponentUpdate(nextProps, nextState){
    var self = this;
    if(nextState!== this.state || nextProps!== this.props){
      return true

    }
    return false
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Accountant)
