import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import axios from 'axios'
import {BASE_API} from '../global/url'
import { Form, Text,Select,Checkbox, TextArea,NestedField } from 'react-form';
import {types as messagetypes,actions as messageactions, messageReducer} from '../redux/message'
import { connect } from 'react-redux';

import EmailForm from './EmailForm'

import ReactHover from 'react-hover';

var Popover = require('react-popover-component');
require('react-popover-component/dist/styles.css');

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
class Pte extends Component{


  constructor(props){
    super(props)
    this.state = {
      totalCurrent:0,
      totalGoal:0,
      ptedata:{},
      new:true,
      formApi:{}
    }
    this.fetchPte = this.fetchPte.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.formApi = this.formApi.bind(this)
  }

  // for the ease of manipulating form
  formApi(formApi){
    this.setState({formApi:formApi})
  }
  /**
  **calculating current point and goal total
  **dict is the dictionary containing the calculation data, stateKey is the key of the state to be updated and dictKey is the key from the dictionary containing the data
  **/
  calculateTotal(dict,stateKey,dictKey){
    var total = 0
    for (let [key, value] of Object.entries(dict)) {
        // do something with key|value
        console.log(value[dictKey])
        if(value[dictKey])
          //for converting into integer value
          total += Math.trunc(value[dictKey])
    }
    this.setState({[stateKey]:total})
  }
  /**
  **handling submit to the database on the clientpoint table
  ** it can be either for new data or
  **/
  handleSubmit(values,formApi){
    var url = ""
    var self = this



    if(this.state.new){
        // if the pte data does not exists yet then it will create new one
      var insertData = []
      url = BASE_API+"migrationinsert/"
      for (let [key, value] of Object.entries(this.state.ptedata)) {
        if(!value.current)
          value.current = 0
        if(!value.goal)
          value.goal = 0
        var insertDict = {
          pointid:value.id,
          current:value.current,
          goal:value.goal,
          clientid:this.props.id
        }

        insertData.push(insertDict)

      }
      axios.post(url,insertData).then(function(response){
        return response
      }).then(
        function(result){

          if(result.data.success){
            self.props.success(result.data.msg)
            //set new to false to mark if the pte data is no longer new
            self.setState({new:false})
          }else{
            self.props.failed(result.data.msg)
          }
        }
        ).catch(function(error){

          self.props.failed("Sorry an Error has Occurred")


        })

    }else{
      // if pte data is already exists then it will update existing data associated with the client id
      var updateData = []

      for (let [key, value] of Object.entries(this.state.ptedata)) {
        if(!value.current)
          value.current = 0
        if(!value.goal)
          value.goal = 0
        var updateDict = {
          pointid:value.id,
          current:value.current,
          goal:value.goal,
          clientid:this.props.id
        }

        updateData.push(updateDict)

      }

      url = BASE_API+"migrationupdate/"+this.props.id
      axios.put(url,updateData).then(function(response){
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
    }
  /**
  **fetching pte scores data and called whenever there is a new note or initialization
  **/
  fetchPte(){
    console.log(this.props)

    var self = this
    axios.get(BASE_API+"migration/"+this.props.id).then(
      function(response){
        return response
      }).then(
      function(response){
        var data = []
        // if the pte data of a client already exist
        var formData = {}
        if(response.data.data.length > 0){
          data = response.data.data
          self.setState({
            new:false
          })

          //initialize the form data

          //console.log("pte1",data)
          for(let data2 of data){
            formData[data2.formname] = {}
            //console.log("pte",data2)
            //set the current and goal form respectively for each pte attribute

            // if else for handling null value
            if(data2.current){
              formData[data2.formname].current = data2.current
            }else{
              formData[data2.formname].current = 0
            }
            if(data2.goal){
              formData[data2.formname].goal = data2.goal
            }else{
              formData[data2.formname].goal = 0
            }


          }


        }
        // if the data does not exist yet
        if(response.data.type.length > 0){

          data = response.data.type

          for (let value of data) {
            formData[value.formname] = {}
            //console.log("pte",data2)
            //set the current and goal form respectively for each pte attribute to 0
            formData[value.formname].current = 0
            formData[value.formname].goal = 0
          }
        }
        //Converting to dictionary for easy operation later on
        var pteDict = {}
        for (let value of data) {
          pteDict[value.formname] = value

        }
        //console.log("ptedict",pteDict)
        self.setState({
          ptedata:pteDict
        })
        //initialize the total of current and goal data
        self.calculateTotal(self.state.ptedata,"totalCurrent","current")
        self.calculateTotal(self.state.ptedata,"totalGoal","goal")



        //initialize form values
        self.state.formApi.setAllValues(formData)
        //setting the form data



      }
    )
  }
  render () {

    //options for react-hover
    const options = {
      followCursor:true,
      shiftX: 20,
      shiftY: 0
    }
    var pteDataConst = Object.keys(this.state.ptedata).map((key, index) =>
      <tr key={this.state.ptedata[key].id}>
        <NestedField field ={this.state.ptedata[key].formname}>
          <td>
            <ReactHover options={options}>
              <ReactHover.Trigger type='trigger'>
                <button className="btn btn-warning btn-md"> ?</button>
              </ReactHover.Trigger>
              <ReactHover.Hover style={{background:"#FFFFFF",color:"#000000"}} type='hover'>
                <div className="card">
                  <div className="card-body">
                    <p> {this.state.ptedata[key].hint} </p>
                  </div>
                </div>
              </ReactHover.Hover>
            </ReactHover>
          </td>
          <td>{this.state.ptedata[key].formname}</td>
          <td><Text type="number" id = {this.state.ptedata[key].formname + " current"} className="form-control pte-form" field = "current"/></td>
          <td dangerouslySetInnerHTML={{ __html: this.state.ptedata[key].note }} />
          <td><Text type="number" id = {this.state.ptedata[key].formname + " goal"} className="form-control pte-form" field = "goal" /></td>
        </NestedField>
      </tr>
    );
    return (
      <div>

        <Form ref = "clientForm" getApi = {(formApi) => {this.formApi(formApi)}} onChange = {(values)=> {
              //the data of the changed values
              var data=values.values;


              //current state of the form data
              var currentdata=this.state.ptedata;

              console.log(values)
              //converting current data (old data) to new altered data
              //if current point or the goal point is still none then the program will assign it
              for (let [key, value] of Object.entries(data)) {
                  // do something with key|value
                  currentdata[key].current = value.current
                  currentdata[key].goal = value.goal
              }

              this.setState({ptedata: currentdata})
              //managing the change of the total of current and goal data
              this.calculateTotal(this.state.ptedata,"totalCurrent","current")
              this.calculateTotal(this.state.ptedata,"totalGoal","goal")


            }


          } onSubmit = {(values, e, formApi) => {this.handleSubmit(values,formApi)}}>
          {formApi => (
            <form onSubmit={formApi.submitForm}>
              <table className = "table table-stripped">
                <thead>
                  <tr>
                    <td>{/*for hint column*/}</td>
                    <td>Skills</td>
                    <td>Current Points</td>
                    <td>Notes</td>
                    <td>Goal Points</td>
                  </tr>
                </thead>
                <tbody>
                  {pteDataConst}
                  <tr>
                    <td>Total Current Point</td>
                    <td>{this.state.totalCurrent}</td>
                    <td>Total Goal Point </td>
                    <td>{this.state.totalGoal}</td>
                  </tr>
                </tbody>
              </table>
              <button type = "submit" className="btn btn-primary">Submit</button>
            </form>

            )
          }
        </Form>
        <EmailForm id = {this.props.id} migrationData={this.state.pteData} url ={"sendmigrationemail/"+this.props.id} ></EmailForm>
      </div>
    )
  }
  componentWillMount(){
    this.fetchPte()
  }
  shouldComponentUpdate(nextProps, nextState){
    var self = this;
		if(nextState!== this.state || nextProps!== this.props){
			return true
		}
		return false
	}

}

export default connect(mapStateToProps,mapDispatchToProps)(Pte)
