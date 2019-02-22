import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

import EmployeeForm from './EmployeeForm'
import { Redirect } from 'react-router'
import axios from 'axios'
import {BASE_API} from '../global/url'
import {types as messagetypes,actions as messageactions, messageReducer} from '../redux/message'
import {types, actions, authReducer} from '../redux/auth'
import { connect } from 'react-redux';
import  Modal2  from './Modal';
const mapDispatchToProps = (dispatch, ownProps) => ({
  failed: (msg) => dispatch(messageactions.failed(msg)),
  loading: (msg) => dispatch(messageactions.loading(msg)),
  success: (msg) => dispatch(messageactions.success(msg)),
  reset: () => dispatch(messageactions.reset())

})
const mapStateToProps = ({messageReducer,authReducer}) => {
	return {
    isAuthenticated: authReducer.isLoggedIn
	}
}
class CreateEmployee extends Component{

  constructor(props){
    super(props)
    this.state = {
      done:false,
      openSuccessModal:false,
      modalMessage:"Thank You For FIlling the form our friendly staffs will assists you"

    }
    this.createEmployee = this.createEmployee.bind(this)
    this.sleep = this.sleep.bind(this)
  }


  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }


  createEmployee(values){
    var self = this

    //values.UserType = "AGENT"



    self.props.loading("Creating Employee Please Wait")

    axios.post("/api/createemployee",values).then(
      function(response){
        return response
      }).then(
        function(result){

          if(result.data.success){
            self.props.success(result.data.msg)
            //if it goes into the register greet it
            self.sleep(1000)
            self.setState({done:true})
          }else{
            self.props.failed(result.data.msg)
          }
        }
        ).catch(function(error){
          console.log(error)
          self.props.failed("Sorry an Error has Occurred")


        })
  }

  render () {
    return (
      <div>
        <EmployeeForm onSubmit = {this.createEmployee}/>
        {this.state.done && this.props.isAuthenticated && <Redirect to='/Employee'/>}

      </div>
    )
  }






}

export default connect(mapStateToProps,mapDispatchToProps)(CreateEmployee)
