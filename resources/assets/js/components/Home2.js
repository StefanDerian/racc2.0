  import React, {Component} from 'react';
  import PropTypes from 'prop-types'
  import axios from 'axios'
  import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
  import { connect } from 'react-redux';
  import {actions as employeeactions, employeeReducer} from '../redux/employee'
  import {actions as selecteactions, selectReducer} from '../redux/select'
  import {types as messagetypes,actions as messageactions, messageReducer} from '../redux/message'

  import ReactTable from "react-table";
  import "react-table/react-table.css";
  import checkboxHOC from "react-table/lib/hoc/selectTable";
  const CheckboxTable = checkboxHOC(ReactTable);


//import { Col,Button, htmlForm, label, Text, htmlFormText } from 'reactstrap';
  import { Col } from 'reactstrap';

  import { BrowserRouter as Router, Route, Switch,Link, Redirect } from 'react-router-dom';

  import {BASE_API} from '../global/url'

  import Drawer from 'react-motion-drawer'

  //changed to htmlForm because of the layout problem with react-strap library
  import { Form, Text,Select,Checkbox } from 'react-form';

  import PrintProvider, { Print, NoPrint } from 'react-easy-print';

  import PrintElement from "./PrintElement"

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
  class Home2 extends Component {

    constructor(props){
      super(props);


      this.state = {
        clients:[],
        tempClients : [], //for filtering purpose, so when it whant to go back to its previous state it just have to refer to `clients` state
        urgentIds : [],
        sidebarOpen:false,
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
      this.trClasshtmlFormat = this.trClasshtmlFormat.bind(this);
      this.filterClient = this.filterClient.bind(this);
      this.sleep = this.sleep.bind(this)
      this.print = this.print.bind(this)
    }

    print(){
      printJS({printable: this.state.tempClients, type: 'json', properties: ['FirstName', 'LastName', 'DateofBirth','Mobile','Email','Status','Vexpiry','Course','duedate','tim']})
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
        exportCSVText: 'Export CSV',
        printToolBar: true
      };

      var printData = <table>
            <thead>
              <tr>
                <td>
                  First Name
                </td>
                <td>
                  Last Name
                </td>
              </tr>
              {
                this.state.tempClients.map((values) =>
                  <tr>
                    <td>
                      {values.FirstName}
                    </td>
                    <td>
                      {values.LastName}
                    </td>
                  </tr>
                )
              }

            </thead>
          </table>





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
                <Link to ={{pathname:"Detail/"+row.clientId+"/updateclient"}} className="btn btn-primary">Update Client Data</Link>
                <Link to ={{pathname:"Detail/"+row.clientId+"/pte"}} className="btn btn-primary">Update Migration data</Link>
                <Link to ={{pathname:"Detail/"+row.clientId+"/education"}} className="btn btn-primary">Update Education Data</Link>
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
                  <dt>Last Contact Date</dt>
                  <dd>{row.tim}</dd>
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

      // for employee select filter format
      const enumFormatter = (cell, row, enumObject) => {
        return enumObject[cell];
      }

      const printElement = ({ children }) => ({
        type: PrintElement,
        props: {
          printdata: printData,
        }
      });

      return(
        <div>
          {/* <button type="reset" className="btn btn-warning" onClick={()=>{

              this.setState({sidebarOpen:true})
            }
          }>
            Filter
          </button> */ }

          {/* <ReactToPrint
            trigger={() => <a className="btn btn-primary" href="#">Print</a>}
            content={() => (<table>
                  <thead>
                    <tr>
                      <td>
                        First Name
                      </td>
                      <td>
                        Last Name
                      </td>
                    </tr>
                    {
                      this.state.tempClients.map((values) =>
                        <tr>
                          <td>
                            {values.FirstName}
                          </td>
                          <td>
                            {values.LastName}
                          </td>
                        </tr>
                      )
                    }

                  </thead>
                </table>)}
          /> */}

          {/*<Drawer open={this.state.sidebarOpen} onChange = {open => this.setState({ sidebarOpen:open})} drawerStyle = {{background:"#F9F9F9",boxShadow:"rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px"}}>*/}

            <Form onChange = {(values)=> {
                //the data of the changed values
                var data=values.values;
                //current state of the form data
                var currentdata=this.state.formdata;
                //copying the current state with the new state given
                this.setState({formdata:{...currentdata,...data}})

                this.filterClient(data)


                }


              }>
              {formApi => (

                  <form onSubmit={formApi.submitForm}>
                    <div className = "row">
                      <div className = "col-md-3 search-col">
                        <div className = "form-group"  >
                          <label htmlFor="FirstName"> First Name:</label>

                          <Text type="string" id="FirstName" className="form-control search-form" field="FirstName" placeholder="Search by First Name..."/>

                        </div>
                      </div>


                      <div className = "col-md-3 search-col">
                        <div className = "form-group">
                          <label htmlFor="LastName"> Last Name:</label>

                          <Text type="string" id="LastName" className="form-control search-form" field="LastName" placeholder="Search by Last Name..."/>

                        </div>

                      </div>

                      <div className = "col-md-3 search-col">
                        <div className = "form-group">
                          <label htmlFor="DateofBirth" > Date Of Birth:</label>
                          <Text type="date" id="DateofBirth" className="form-control search-form" field="DateofBirth" placeholder="dd/mm/yyyy"/>
                        </div>

                      </div>

                      <div className = "col search-col">
                        <div className = "form-group"  >
                          <label htmlFor="Mobile"> phone number:</label>
                          <Text type="string" id="Mobile" className="form-control search-form" field="Mobile" placeholder="Search by Phone Number..."/>
                        </div>
                      </div>

                      <div className = "col-md-3 search-col">
                        <div className = "form-group"  >
                          <label htmlFor="Vexpiry"> Visa Expiry Date bottom Range:</label>
                          <Text type="date" id="Vexpiry" className="form-control search-form" field="Vexpiry[0]" placeholder="dd/mm/yyyy"/>
                        </div>
                      </div>
                      <div className = "col-md-3 search-col">
                        <div className = "form-group"  >
                          <label htmlFor="Vexpiry"> Visa Expiry Date upper Range:</label>
                          <Text type="date" id="Vexpiry" className="form-control search-form" field="Vexpiry[1]" placeholder="dd/mm/yyyy"/>
                        </div>
                      </div>


                      <div className = "col-md-3 search-col">
                        <div className = "form-group"  >
                          <label htmlFor="tim"> last contact bottom Range:</label>
                          <Text type="date" id="tim" className="form-control search-form" field="tim[0]" placeholder="dd/mm/yyyy"/>
                        </div>
                      </div>
                      <div className = "col-md-3 search-col">
                        <div className = "form-group"  >
                          <label htmlFor="tim"> last contact upper range:</label>
                          <Text type="date" id="tim" className="form-control search-form" field="tim[1]" placeholder="dd/mm/yyyy"/>
                        </div>
                      </div>


                      <div className = "col-md-3 search-col">
                        <div className = "form-group"  >
                          <label htmlFor="tim"> graduation date bottom Range:</label>
                          <Text type="date" id="uni_Compl" className="form-control search-form" field="uni_Compl[0]" placeholder="dd/mm/yyyy"/>
                        </div>
                      </div>
                      <div className = "col-md-3 search-col">
                        <div className = "form-group"  >
                          <label htmlFor="tim"> graduation date upper range:</label>
                          <Text type="date" id="uni_Compl" className="form-control search-form" field="uni_Compl[1]" placeholder="dd/mm/yyyy"/>
                        </div>
                      </div>
                      <div className = "col-md-3 search-col">
                        <div className = "form-group"  >
                          <label htmlFor="Nationality"> Nationality:</label>
                          <Text type="string" id="Nationality" className="form-control search-form" field="Nationality"/>
                        </div>
                      </div>
                      <div className = "col-md-3 search-col">
                        <div className = "form-group"  >
                          <label htmlFor="Course"> Course:</label>
                          <Text type="string" id="Course" className="form-control search-form" field="Course"/>
                        </div>
                      </div>
                      <div className = "col-md-3 search-col">
                        <div className = "form-group"  >
                          <label htmlFor="Visa"> Visa Type:</label>
                          <Text type="string" id="Visa" className="form-control search-form" field="Visa"/>
                        </div>
                      </div>

                      <div className = "col-md-3 search-col">
                        <div className = "form-group">
                          <label htmlFor = "CurrentStatus">Status  :</label>
                          <Select field ="CurrentStatus"id="CurrentStatus" options={this.props.statusSelectForm} field="CurrentStatus" className = "form-control search-form"/>
                          </div>
                        </div>

                      <div className = "col-md-3 search-col">
                        { localStorage.getItem("type") == "MANAGER" &&


                          <div className = "form-group"  >
                            <label htmlFor = "UserID">Consultant:</label>
                            <Select field="UserID" id="UserID" options={this.props.employeeSelectForm}  className = "form-control search-form"/>
                            </div>

                          }
                        </div>
                    </div>


                      {/* restoring data via checkpoint*/}
                      <button type="reset" className="btn btn-warning btn-lg" onClick={()=>{
                          formApi.resetAll()
                          this.setState({formdata:this.state.defaultFormData})
                          this.setState({tempClients:this.state.clients})

                        }
                      }>
                        Reset
                      </button>


                    </form>


                  )}
                </Form>
                <Link to ={{pathname:"/CreateClient"}} className="btn btn-primary btn-lg pull-right">Create Client</Link>
                <button type="button" className="btn btn-warning btn-lg" onClick={()=>{

                  this.print()
                    }
                }>
                  Print
                </button>
        { /* </Drawer>*/}


          {/*every column must have filter attribute and ref if they want to be filtered*/}
          <CheckboxTable
              ref={r => (this.checkboxTable = r)}
              data={this.state.tempClients}
              style={{ width: "90%" }}
              columns={
                [
                  {
                    accessor: 'FirstName',
                    Header: 'First Name'
                  },
                  {
                    accessor: 'LastName',
                    Header: 'Last Name'
                  },
                  {
                    accessor: 'Mobile',
                    Header: 'Mobile'
                  },
                  {
                    accessor: 'DateofBirth',
                    Header: 'DOB'
                  },
                  {
                    accessor: 'Email',
                    Header: 'email'
                  },
                  {
                    accessor: 'Nationality',
                    Header: 'Nationality'
                  },
                  {
                    accessor: 'CurrentStatus',
                    Header: 'Current Status'
                  },
                  {
                    accessor: 'Vexpiry',
                    Header: 'Visa Expiry Date'
                  },
                  {
                    accessor: 'Course',
                    Header: 'Course'
                  },
                  {
                    accessor: 'Visa',
                    Header: 'Visa'
                  },
                  {
                    accessor: 'tim',
                    Header: 'Last Contact Date'
                  },
                  {
                    accessor: 'uni_Compl',
                    Header: 'Expected Graduation Date'
                  },
                  {
                    accessor: 'duedate',
                    Header: 'Due date'
                  },
                ]
              }
              defaultPageSize={10}
              className="-striped -highlight"

            />




            </div>
          );


        }
        sleep (time) {
          return new Promise((resolve) => setTimeout(resolve, time));
        }
        //function for filtering the data based on the tempClientData
        //this function is relying on ref attribute,filter, and the state of object
        // the state, filter and ref must be defined properly with same name and variable name

        filterClient(){

          this.sleep(1000).then(()=>{
            var filteredData = this.state.clients
            for (let [key, value] of Object.entries(this.state.formdata)) {
              // do something with key|value

              // if the column is exist as the column may not exist in some of the roles
              if(this.refs[key]){
                // if it is an array then it is a ranged filter such as date
                if (Array.isArray(value)){
                  // index 0 is bottom value and index 1 is upper value

                  if (value[0] !== "" && value[0] && value[1] !== "" && value[1]){


                    // this.refs[key].applyFilter({
                    //   date: new Date(value[0]),
                    //   comparator: '>='
                    //
                    // })
                    // this.refs[key].applyFilter({
                    //   date: new Date(value[1]),
                    //   comparator: '<='
                    //
                    // })
                    //filtering based on the tempClients state so the table will update as well
                    filteredData = filteredData.filter(function(values){


                        return new Date(values[key]) >= new Date(value[0]) && new Date(values[key]) <= new Date(value[1])
                    })


                  }
                  // else{
                  //   this.refs[key].cleanFiltered()
                  //   //this.setState({tempClients:this.state.clients})
                  // }

                }else{
                  if (value !== "" && value !== 0 && value !== -1 && value){
                    //console.log("value",value)
                    //this.refs[key].applyFilter(value)
                    filteredData = filteredData.filter(function(values){
                      //3. string.search
                      var string1 = values[key];
                      var expr = value;
                      if(string1.indexOf(expr) !== -1){
                        console.log("values",values[key])
                        console.log("value",value)
                      }
                      console.log(string1.indexOf(expr) !== -1)
                      return string1.indexOf(expr) !== -1
                    })
                  }else{
                    //this.refs[key].cleanFiltered()
                  }
                }

              }
            }
            this.setState({tempClients:filteredData})


          })



        }
        componentWillMount(){
          var self = this;
          var url = BASE_API+"clientdata"
          // to determine which is for agent and manager
          if(localStorage.getItem("type") != "MANAGER"){
            url += "/"+ localStorage.getItem("id")
          }else{
            url += "/"+ 0
          }
          self.props.loading("loading data please wait")
          axios.get(url)
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

      export default connect(mapStateToProps,mapDispatchToProps)(Home2);
