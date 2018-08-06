import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

import ClientForm from './ClientForm'
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
class CreateClient extends Component{

  constructor(props){
    super(props)
    this.state = {
      done:false,
      openSuccessModal:false,
      modalMessage:"Thank You For FIlling the form our friendly staffs will assists you"

    }
    this.createClient = this.createClient.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.sleep = this.sleep.bind(this)
  }

  toggleModal(message = "Thank You For FIlling the form our friendly staffs will assists you"){

    this.setState({openSuccessModal:!this.state.openSuccessModal,modalMessage:message})
  }
  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }


  createClient(values){
    console.log(values)
    if(!values.ConsultantID && localStorage.getItem("id")){
      // if  aunthitecated and the user id local storage exist and as Agent
      // assign the id of consultant to the collumn
      values["ConsultantID"] = localStorage.getItem("id")
    }
      // if not aunthitecated and the user id local storage does not exist




    var self = this
    self.props.loading("Updating Client Please Wait")

    axios.post(BASE_API+"createclient",values).then(
      function(response){
        return response
      }).then(
        function(result){

          if(result.data.success){
            self.props.success(result.data.msg)
            //if it goes into the register greet it
            self.sleep(1000)
            self.setState({done:true})
            self.toggleModal()
            console.log(result.data.data)
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
        <ClientForm onSubmit = {this.createClient}/>
        {this.state.done && this.props.isAuthenticated && <Redirect to='/Home'/>}
        {/*a modal for notifying error*/}
        <Modal2 title ="Congratulations" status = "good" message={this.state.modalMessage} isOpen={this.state.openSuccessModal} toggle={this.toggleModal}/>
      </div>
    )
  }






}

export default connect(mapStateToProps,mapDispatchToProps)(CreateClient)
