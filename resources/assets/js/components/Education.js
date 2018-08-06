import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import axios from 'axios'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { connect } from 'react-redux';
import {actions as employeeactions, employeeReducer} from '../redux/employee'
import {actions as selecteactions, selectReducer} from '../redux/select'
import {types as messagetypes,actions as messageactions, messageReducer} from '../redux/message'
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

  }
}
class Education extends Component{


  constructor(props){
    super(props)

    this.state = {
      education:[]
    }
    //this.onAfterInsertRow = this.afterInsertRow.bind(this)
    //this.onAfterSaveCell = this.afterSaveCell.bind(this)
    this.fetchEducation = this.fetchEducation.bind(this)
  }
  fetchEducation(){
    var self = this;
    var url = BASE_API+"education/"+this.props.id

    self.props.loading("loading data please wait")
    axios.get(url)
    .then(res => res)
    .then(function(response){
      //set the state for client data

      console.log(response.data)
      if(response.data.data){
        self.props.failed("you still do not have any education data yet")
      }
      self.setState({education:response.data.education})

      return response.data.data
    })
    .catch(function(error){
      self.props.loading("Failed loading data. Something went wrong")
    })
  }
  onAfterInsertRow(row) {
    //after new education data received
    //deleted because we dont need id
    delete row.id;
    row.UserID = this.props.id
    var self = this;
    var url = BASE_API+"educationinsert/"

    axios.post(url,row).then(
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
        this.fetchEducation()


  }
  onAfterSaveCell(row){
    //after the updated education data created
    console.log(row)
    var self = this
    self.props.loading("Updating Client Please Wait")
    //this is row without id
    var row2 = {...row}
    delete row2.id
    axios.put(BASE_API+"educationupdate/"+row.id,row2).then(
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
    //this.fetchEducation()
  }

  render () {
    const statusTypes = ["application submitted","got conditional offer","waiting for document","received COE","visa application"]
    const options = {
      afterInsertRow: this.onAfterInsertRow.bind(this)   // A hook for after insert rows
    };
    const cellEditProp = {
     mode: 'click',
     //beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
     afterSaveCell: this.onAfterSaveCell.bind(this),  // a hook for after saving cell
     blurToSave:true
    }
    return (
      <div>
        <BootstrapTable cellEdit={ cellEditProp } insertRow = {true} data={this.state.education} options = {options}>
          <TableHeaderColumn isKey = {true} dataField='id'>id</TableHeaderColumn>
          <TableHeaderColumn dataField='uni' dataSort={ true }>Institution</TableHeaderColumn>
          <TableHeaderColumn dataField='status' editable={ { type: 'select', options: { values: statusTypes } }} dataSort={ true }>Status</TableHeaderColumn>
          <TableHeaderColumn dataField='course' dataSort={ true }>Course</TableHeaderColumn>
          <TableHeaderColumn dataField='Intake' editable={ { type: 'date' } } dataSort={ true }>Intake</TableHeaderColumn>
          <TableHeaderColumn dataField='comment' editable={ { type: 'TextArea' } } dataSort={ true }>Comment</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }

  componentWillMount(){
    this.fetchEducation()
  }


}

export default connect(mapStateToProps,mapDispatchToProps)(Education)
