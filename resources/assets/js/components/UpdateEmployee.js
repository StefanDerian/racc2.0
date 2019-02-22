import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import EmployeeForm from './EmployeeForm'
import { Redirect } from 'react-router'
import axios from 'axios'
import {BASE_API} from '../global/url'
import {types as messagetypes,actions as messageactions, messageReducer} from '../redux/message'


import { connect } from 'react-redux';
const mapDispatchToProps = (dispatch, ownProps) => ({
  failed: (msg) => dispatch(messageactions.failed(msg)),
  loading: (msg) => dispatch(messageactions.loading(msg)),
  success: (msg) => dispatch(messageactions.success(msg)),
  reset: () => dispatch(messageactions.reset())

})
const mapStateToProps = ({messageReducer}) => {
	return {
	}
}
class UpdateEmployee extends Component{

  constructor(props){
    super(props)
    this.updateEmployee = this.updateEmployee.bind(this)
    this.state = {
      isRedirect:false
    }

  }


  updateEmployee(values){
    console.log(values)
    var self = this
    self.props.loading("Updating Client Please Wait")

    axios.put("/api/updateemployee/"+this.props.match.params.id,values).then(
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

  render () {
    const match = this.props.match
    return (
      <div>
        <EmployeeForm id = {match.params.id} onSubmit = {this.updateEmployee}/>
        {/** this.state.isRedirect && <Redirect to='/Employee'/> **/ }
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateEmployee)
