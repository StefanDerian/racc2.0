import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import ClientForm from './ClientForm'
import { Redirect } from 'react-router'
import axios from 'axios'
import {BASE_API} from '../global/url'
import {types as messagetypes,actions as messageactions, messageReducer} from '../redux/message'

import Note from './Note'
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
class UpdateClient extends Component{

  constructor(props){
    super(props)
    this.updateClient = this.updateClient.bind(this)
    this.state = {
      isRedirect:false
    }
  
  }


  updateClient(values){
    console.log(values)
    var self = this
    self.props.loading("Updating Client Please Wait")

    axios.put(BASE_API+"updateclient/"+this.props.id,values).then(
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
    return (
      <div>
        <ClientForm id = {this.props.id} onSubmit = {this.updateClient}/>
        <Note id = {this.props.id}/>
        {this.state.isRedirect && <Redirect to='/Home'/>}
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateClient)
