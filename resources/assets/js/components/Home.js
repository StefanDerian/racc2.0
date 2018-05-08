import React from 'react'
import PropTypes from 'prop-types'



import axios from 'axios'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

//import { Col,Button, htmlForm, label, Text, htmlFormText } from 'reactstrap';
import { Col } from 'reactstrap';
import Sidebar from 'react-sidebar';

import {BASE_API} from '../global/url'


//changed to htmlForm because of the layout problem with react-strap library
import { Form, Text,Select,Checkbox } from 'react-form';

class Home extends React.Component {

  constructor(props){
    super(props);


    this.state = {
      clients:[],
      urgentIds : [],
      sidebarOpen:true,
      sidebarDocked:true,
      //form data
      formdata:{
        firstname:"",
        lastname:"",
        dob:"",
        phone:"",
        vexpiry:"",
        lastContactu:"",
        lastContactb:"",
        status:"",
        consultant:"",
        urgent:""
      },
      defaultFormData:{}




      //end of form data
    }
    this.trClasshtmlFormat = this.trClasshtmlFormat.bind(this);
    this.onSetSidebarToggle = this.onSetSidebarToggle.bind(this);
  }
  //htmlFor opening and closing sodebar
  onSetSidebarToggle(){
    this.setState({sidebarOpen:!this.state.sidebarOpen})

  }


  //indicating urgent row
  trClasshtmlFormat(row, rowIndex) {
    // row is the current row data
    return row.urgent == 0 ? "" : "table-danger";  // return className name.
  }
  handleRowSelect(row, isSelected, e){

    //mainly because to update the urgency data
    //assign the row data
    var object = {}


    //if the row is selected

    if(isSelected){
      console.log(row.FirstName + "is selected")
      object = {...object,urgent:1}


      //or else
    }else{

      console.log(row.FirstName + "is not selected")
      object = {...object, urgent:0}


    }

    console.log(object)
    //serialize it so it can be sent to the laravel router
    const serialized = JSON.stringify(object);

    axios.put(BASE_API+"updateclient/"+row.clientId+"/"+serialized)
    .then(function(response){

    }).catch(function(error){

    })





  }

  //onselected row

  render () {
    const options = {
      exportCSVText: 'Custom Export CSV Text',
      printToolBar: true
    };
    const selectRow = {
      mode: 'checkbox', // or checkbox
      className: 'table-danger',
      onSelect: this.handleRowSelect,
      selected:this.state.urgentIds,
      clickToExpand: true
    };
    const expandComponent = (row)=>{
      return (
        <p>this is expanable</p>
      );
    }

    return(
      <div>

        {/*this is the tag with changing values detection*/}
        <Form onChange = {(values)=> {

            var data=values.values;
            var currentdata=this.state.formdata;
            console.log(values)
            this.setState({formdata:{...currentdata,...data}})}
          }>
          {formApi => (

              <form onSubmit={formApi.submitForm}>
                <div className = "row">
                <div className = "col-md-3 search-col">
                  <div className = "form-group"  >
                    <label htmlFor="firstname"> First Name:</label>

                    <Text type="string" id="firstname" className="form-control search-form" field="firstname" placeholder="Search by Name..."/>

                  </div>
                </div>

                <div className = "col-md-3 search-col">
                  <div className = "form-group">
                    <label htmlFor="lastname"> Last Name:</label>

                    <Text type="string" id="lastname" className="form-control search-form" field="lastname" placeholder="Search by Name..."/>

                  </div>

                </div>
                <div className = "col-md-3 search-col">
                  <div className = "form-group">
                    <label htmlFor="birthday"> Date Of Birth:</label>
                    <Text type="date" id="birthday" className="form-control search-form" field="dob" placeholder="dd/mm/yyyy"/>
                  </div>

                </div>
              <div className = "col-md-3 search-col">
                <div className = "form-group"  >
                  <label htmlFor="phone"> phone number:</label>
                  <Text type="string" id="phone" className="form-control search-form" field="phone" placeholder="Search by Phone Number..."/>
                </div>
              </div>
            </div>
            <div className = "row">
                <div className = "col-md-3 search-col">
                  <div className = "form-group"  >
                    <label htmlFor="vexpiry"> Visa Expiry Date:</label>
                    <Text type="date" id="vexpiry" className="form-control search-form" field="vexpiry" placeholder="dd/mm/yyyy"/>
                  </div>
                </div>
                <div className = "col-md-3 search-col">
                  <div className = "form-group"  >
                    <label htmlFor="lastContactb"> last contact upper range:</label>
                    <Text type="date" id="lastContactu" className="form-control search-form" field="lastContactu" placeholder="dd/mm/yyyy"/>
                  </div>
                </div>
                <div className = "col-md-3 search-col">
                  <div className = "form-group"  >
                    <label htmlFor="lastContactu"> last contact bottom Range:</label>
                    <Text type="date" id="lastContactu" className="form-control search-form" field="lastContactb" placeholder="dd/mm/yyyy"/>
                  </div>
                </div>
                <div className = "col-md-3 search-col">
                  <div className = "form-group">
                    <label htmlFor = "status">Status  :</label>
                    <Select field ="status"id="status" options={[{
                        label: 'Single',
                        value: 'single',
                      }]} field="status" className = "form-control search-form"/>
                    </div>
                  </div>
                </div>
                <div className = "row">
                  <div className = "col-md-3 search-col">
                    { localStorage.getItem("type") != "AGENT" &&


                      <div className = "form-group"  >
                        <label htmlFor = "consultant">Consultant:</label>
                        <Select field="consultant" id="consultant" options={[{
                            label: 'Single1',
                            value: 'single11',
                          }]} field="consultant"  className = "form-control search-form"/>
                        </div>

                      }
                    </div>
                    <div className = "col-md-3 search-col">
                      <div className = "form-group"  >
                        <label htmlFor="checkbox-urgent">Show urgent client only</label>
                        <Checkbox field="urgent" id="checkbox-urgent" />
                      </div>
                    </div>
                  </div>
                  {/* restoring data via checkpoint*/}
                  <button type="reset" className="btn btn-warning" onClick={()=>{
                      formApi.resetAll()
                      this.setState({formdata:this.state.defaultFormData})
                    }
                  }>
                    Reset
                  </button>
                  </form>

              )}
            </Form>


            <BootstrapTable data={this.state.clients}
              options={options}
              selectRow={ selectRow }
              expandableRow={(row) => true}
              expandComponent={ expandComponent }
              exportCSV striped hover pagination>
              <TableHeaderColumn isKey dataField='clientId' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Client ID</TableHeaderColumn>
              <TableHeaderColumn dataField='FirstName' dataSort={ true }>First Name</TableHeaderColumn>
              <TableHeaderColumn dataField='LastName' dataSort={ true }>LastName</TableHeaderColumn>
              <TableHeaderColumn dataField='Mobile' dataSort={ true }>Mobile Number</TableHeaderColumn>
              <TableHeaderColumn dataField='DateofBirth' dataSort={ true }>DOB</TableHeaderColumn>
              <TableHeaderColumn dataField='Email' dataSort={ true }>Email</TableHeaderColumn>
              <TableHeaderColumn dataField='CurrentStatus' dataSort={ true }>Status</TableHeaderColumn>
              <TableHeaderColumn dataField='Vexpiry'dataSort={ true }>Visa Expiry Date</TableHeaderColumn>
              <TableHeaderColumn dataField='Course' dataSort={ true }>Course</TableHeaderColumn>
              <TableHeaderColumn dataField='tim' dataSort={ true }>Last Contact Date</TableHeaderColumn>
              {localStorage.getItem("type") == "MANAGER" && <TableHeaderColumn dataField='DisplayName' dataSort={ true }>Consultant</TableHeaderColumn>}
              <TableHeaderColumn dataField='duedate'dataSort={ true }>Due Date</TableHeaderColumn>
            </BootstrapTable>

          </div>
        );


      }

      filter(values){

      }
      componentDidMount(){
        var self = this;
        axios.get(BASE_API+"clientdata")
        .then(res => res)
        .then(function(response){

          self.setState({clients:response.data.data})
          return response.data.data
        }).then((reponse) => {
          //select urgent clients
          const urgent = this.state.clients.filter((client) =>{
            return client.urgent == 1
          });
          //get their id htmlFor the bootstrap react table library
          const filtered = urgent.map((client)=>{
            return client.clientId
          })

          //checkpoint for reseting data
          this.setState({defaultFormData: {...self.state.formdata}});
          //set it in state
          self.setState({urgentIds:filtered})

        })
        .catch(function(error){
          console.log(error)
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

    export default Home;
