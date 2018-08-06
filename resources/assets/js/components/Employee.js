import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import axios from 'axios'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { connect } from 'react-redux';
import {actions as employeeactions, employeeReducer} from '../redux/employee'
import {actions as selecteactions, selectReducer} from '../redux/select'
import {types as messagetypes,actions as messageactions, messageReducer} from '../redux/message'
import { BrowserRouter as Router, Route, Switch,Link, Redirect } from 'react-router-dom';
import {BASE_API} from '../global/url'
const mapDispatchToProps = (dispatch, ownProps) => ({
  failed: (msg) => dispatch(messageactions.failed(msg)),
  loading: (msg) => dispatch(messageactions.loading(msg)),
  success: (msg) => dispatch(messageactions.success(msg)),
  reset: () => dispatch(messageactions.reset())

})

//getting select data from redux
const mapStateToProps = ({employeeReducer, selectReducer,messageReducer}) => {

  return{
    employees :employeeReducer.all,
  }
}

class Employee extends Component{


  constructor(props){
    super(props)
    this.fetchEmployees = this.fetchEmployees.bind(this)
    this.state = {
      employees : [],
      id:0,
    }
  }
  fetchEmployees(){
    //employees data
    var self = this
    axios.get(BASE_API+"employeedata/1")
    .then(res => res)
    .then(function(response){
      var employees = response.data.data
      console.log("employees",employees)
      self.setState({employees:employees})

    }).catch(function(error){
      console.log(error)
    })
  }
  render () {
    var self = this
    var options = {
      onRowClick: function(row){
        self.setState({
          id:row.UserID
        })

      }
    }
    return (
      <div>
        <Link to ={{pathname:"/CreateEmployee"}} className="btn btn-primary pull-right">Create Employee</Link>
        <BootstrapTable data={this.state.employees} options = {options} pagination hover stripped>
          <TableHeaderColumn isKey dataField='UserID' dataSort={ true }>Employee ID</TableHeaderColumn>
          <TableHeaderColumn  dataField='DisplayName' dataSort={ true }>Display Name</TableHeaderColumn>
          <TableHeaderColumn  dataField='UserName' dataSort={ true }>User Name</TableHeaderColumn>
          <TableHeaderColumn  dataField='UserType' dataSort={ true }>User Type</TableHeaderColumn>
          <TableHeaderColumn  dataField='language' dataSort={ true }>Language</TableHeaderColumn>
          <TableHeaderColumn  dataField='email' dataSort={ true }>Email</TableHeaderColumn>

        </BootstrapTable>

        {this.state.id !== 0 && <Redirect to={'/UpdateEmployee/'+this.state.id} /> }
      </div>
    )
  }
  componentWillMount(){
    //fetch note data from the id of the client
    this.fetchEmployees()
  }
}

export default Employee
