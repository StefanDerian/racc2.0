import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {types as messagetypes,actions as messageactions, messageReducer} from '../redux/message'
import { connect } from 'react-redux';
import axios from 'axios';
import {BASE_API} from '../global/url';


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
/**
**component for sending the email with the dynamic content from the user written in TextArea
**other than that the content is statically written
**/
class EmailForm extends Component{

  constructor(props){
    super(props)

    this.state = {
      feedback:"",
      password:"",
      migrationData:[],
      clientData:{}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  /**
  **make request to api to send the email
  **/
  handleSubmit(event){
    event.preventDefault()
    var self = this

    var data = {
      auth:{
          email:"stefan.derian@gmail.com",
          pass:this.state.password
          },
      displayName:localStorage.getItem("displayName"),
      feedback:this.state.feedback,
      migrationData:this.state.migrationData,
      role:localStorage.getItem("type"),
      to:{
        email:"tploek@gmail.com",
        name:"Stefan Derian"
      }
    }




    axios.post(this.props.url,data).then(function(response){
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
  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  render () {
    return (
        <div>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="contentTextarea">Password:</label>

              <input type="password" id= "password" name="password" className="form-control" id="password" onChange={this.handleChange} value = {this.state.password}/>

            </div>
            <div className="form-group">
              <label htmlFor="contentTextarea">Feedback:</label>

              <textarea className="form-control" id="feedback" name="feedback" rows="3" onChange={this.handleChange} value = {this.state.content}></textarea>

            </div>
            <button className="btn btn-primary btn-md" type = "submit">Send Email</button>
          </form>
        </div>
    )
  }
  componentWillMount(){
    var self = this
    //getting ptedata
    axios.get(BASE_API+"migration/"+this.props.id).then(
      function(response){
        return response
      }).then(
      function(response){
        var data = []
        // if the pte data of a client already exist

        var formArray = []
        if(response.data.data.length > 0){
          data = response.data.data

          //initialize the form data

          //console.log("pte1",data)
          for(let data2 of data){
            var formData = {}
            //console.log("pte",data2)
            //set the current and goal form respectively for each pte attribute
            // if else for handling null value
            if(data2.current){
              formData.current = data2.current
            }else{
              formData.current = 0
            }
            if(data2.goal){
              formData.goal = data2.goal
            }else{
              formData.goal = 0
            }
            formArray.push(formData)
          }
        }
        // if the data does not exist yet
        if(response.data.type.length > 0){

          data = response.data.type

          for (let value of data) {
            var formData = {}
            //console.log("pte",data2)
            //set the current and goal form respectively for each pte attribute to 0
            formData.current = 0
            formData.goal = 0
            formArray.push(formData)
          }
        }

        //console.log("ptedict",pteDict)
        self.setState({
          migrationData:formArray
        })
      }
    )

    //get client data
    axios.get(BASE_API+"singleclient/"+this.props.id).then(
      function(response){
        return response
      }).then(
        function(result){
          if(result.data.success){
            var data = result.data.data

            // setting the current data and the backup data to initial state
            self.setState({clientData:data})
          }else{
            self.props.failed(result.data.msg)
          }

        }
      ).catch(function(error){

        self.props.failed(error)

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

export default connect(mapStateToProps,mapDispatchToProps)(EmailForm)
