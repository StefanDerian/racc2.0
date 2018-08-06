import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import axios from 'axios'
import {BASE_API} from '../global/url'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Form, Text,Select,Checkbox, TextArea } from 'react-form';
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

class Note extends Component{

  constructor(props){
    super(props)
    this.state = {
      notes:[]
    }
    this.handleNewNote = this.handleNewNote.bind(this)
    this.handleNoteEdit = this.handleNoteEdit.bind(this)
    this.fetchNotes = this.fetchNotes.bind(this)
  }
  /**
  **fetching a note and called whenever there is a new note or initialization
  **/
  fetchNotes(){
    var self = this
    axios.get(BASE_API+"note/"+this.props.id).then(
      function(response){
        return response
      }).then(
      function(response){
        self.setState({
          notes:response.data.data
        })
      }
    )
  }




  /**
  **handling the update of new note
  **/
  handleNoteEdit(row,cellName,values){
    var self = this
    self.props.loading("Editing Note Please Wait")

    //combined between fields and values
    var combined = {[cellName]:values}
    console.log(combined)
    axios.put(BASE_API+"updatenote/"+row.ID,combined).then(
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
  /**
  **handling the submit of the new notes
  **/
  handleNewNote(values){
    var self = this
    self.props.loading("Inserting new Note Please Wait")

    //assigning more detailed property for writer id and user id
    // values.UserID = this.props.id
    // values.writer = localStorage.getItem("id")
    values = {...values, UserID:this.props.id,writer:localStorage.getItem("id")}


    console.log("submit notes",values)
    axios.post(BASE_API+"createnote/",values).then(
      function(response){
        return response
      }).then(
        function(result){

          if(result.data.success){
            self.props.success(result.data.msg)
            self.fetchNotes()
          }else{
            self.props.failed(result.data.msg)
          }
        }
        ).catch(function(error){
          self.props.failed("Sorry an Error has Occurred")


        })
  }
  render () {
    {/*for saving data after the cell editing done if no error happened*/}
    const onAfterSaveCell = (row, cellName, cellValue) => {
      this.handleNoteEdit(row,cellName,cellValue)
    }
    {/*for validating data before the insertion to prevent empty data*/}
    const onBeforeSaveCell = (row, cellName, cellValue) => {
      // You can do any validation on here for editing value,
      // return false for reject the editing
      if (cellValue == "" || !cellValue){
        this.props.failed("content cannot be empty")
        return false
      }
      return true;
    }
    const self = this
    const cellEditProp = {
     mode: 'click',
     nonEditableRows: function() {
       // if the id is not match with localstorage or session id then the cell wont be editable
       return self.state.notes.filter(p => p.writer != localStorage.getItem("id")).map(p => p.ID);
     },
     beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
     afterSaveCell: onAfterSaveCell  // a hook for after saving cell
    }
    return (
      <div>
        <Form ref = "clientForm" onSubmit = {(values, e, formApi) => {this.handleNewNote(values,formApi)}}>
          {formApi => (
            <form onSubmit={formApi.submitForm}  >
              <div className = "row">
                <div className = "form-group">
                  <label htmlFor="content"> Type your notes here:</label>
                  <TextArea className = "form-control note-form" id = "content" field="Content" />
                </div>
              </div>
              <button type="submit" className = "btn btn-primary" >Submit</button>

            </form>
          )}
        </Form>
        <BootstrapTable cellEdit={ cellEditProp } ref = "notesTable" data={this.state.notes}>
          <TableHeaderColumn isKey dataField='ID' dataSort={ true } editable={ false }>Notes ID</TableHeaderColumn>
          <TableHeaderColumn dataField='Content' editable={ { type: 'textarea'} }>Content</TableHeaderColumn>
          <TableHeaderColumn dataField='DisplayName' editable={ false }>Writer</TableHeaderColumn>
          <TableHeaderColumn dataField='Time' editable={ false }>Date</TableHeaderColumn>

        </BootstrapTable>
      </div>
    )
  }



  componentWillMount(){
    //fetch note data from the id of the client
    this.fetchNotes()
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Note)
