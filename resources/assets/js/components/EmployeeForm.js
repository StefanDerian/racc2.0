import React , {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {BASE_API} from '../global/url'
import {RequiredText,AlphaText,AlphaNumbericText} from '../global/form'
import { Form, Text,Select,Checkbox,TextArea } from 'react-form';
import { Route, Redirect } from 'react-router'
import {types, actions, authReducer} from '../redux/auth'


import {types as messagetypes,actions as messageactions, messageReducer} from '../redux/message'
import {actions as selectactions, selectReducer} from '../redux/select'
import {actions as employeeactions, employeeReducer} from '../redux/employee'
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch, ownProps) => ({
  failed: (msg) => dispatch(messageactions.failed(msg)),
  loading: (msg) => dispatch(messageactions.loading(msg)),
  success: (msg) => dispatch(messageactions.success(msg)),
  reset: () => dispatch(messageactions.reset())

})
const mapStateToProps = ({authReducer,messageReducer,selectReducer,employeeReducer}) => {
	return {
		isAuthenticated:authReducer.isLoggedIn,
    serviceSelectForm:selectReducer.serviceForm,
    employeeSelectForm:employeeReducer.selectForm2,
    employeeRole:employeeReducer.selectRole,
    statusSelectForm:selectReducer.statusForm2,
	}
}

class EmployeeForm extends Component{

  constructor(props){
    super(props)
    this.state = {
      formdata:{},
      formApi:{},
      label:{},
      error:{},
      formDataBackup:{},
      modalMessage :"please Correct The Errors",
      openErrorModal:false,
      modalDanger:true,
      editPassword:false
    }
    // for the ease of manipulatig form
    this.formApi.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.resetUpdateForm = this.resetUpdateForm.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }



  /*When it come to edit, the checkbox is enabled wther they want to change the password or not*/
  handleCheckboxChange(value){
    this.setState({editPassword:!this.state.editPassword})
  }

  formApi(formApi){
    this.setState({formApi:formApi})
  }
  handleSubmit(values, e, formApi){

    //check if the password check needed or not

    if(this.state.editPassword || !this.props.id){
      //when it need to check the password (eg. the password change is needed or created)
      if((values.Password2 || values.RepeatPassword) && (values.Password2 !== values.RepeatPassword)){
        this.props.failed("The password must be matched")
        // check if the password and repeat password is the same
      }else{
        //when the password is eligible
        var self = this
        delete values.RepeatPassword
        values.password = values.Password2
        delete values.Password2
        self.props.onSubmit(values)
      }
    }else{
      // when no password check required at all
      var self = this
      delete values.RepeatPassword
      values.password = values.Password2
      delete values.Password2
      self.props.onSubmit(values)
    }







  }

  //to on off a modal
  toggleModal(message = "Please Correct All Error"){

    this.setState({openErrorModal:!this.state.openErrorModal,modalMessage:message})
  }
  resetForm(){
    this.state.formApi.resetAll()
  }

  resetUpdateForm(){
    // a function for reseting the form which is used for update
    this.state.formApi.setAllValues(this.state.formDataBackup)
  }



  render () {

    return (
      <div>
        <div className = "container-fluid">
        <div className = "jumbotron">
          <h1>Employee Management</h1>
          <Form ref = "clientForm" onSubmitFailure = {( errors, onSubmitError, formApi ) => {this.toggleModal()}} getApi = {(formApi) => {this.formApi(formApi)}} onSubmit = {(values, e, formApi) => {this.handleSubmit(values,formApi)}}>
            {formApi => (
                <form onSubmit={formApi.submitForm}  >


                    {/*Display Name*/}
                    <div className = "container">
                      <div className = "row">
                        <div className = "form-group"  >
                          <label htmlFor="DisplayName"> Display Name:</label>

                          <AlphaText type="string" id="DisplayName" className="form-control search-form" field="DisplayName"/>

                        </div>
                      </div>
                      {/*end Display Name*/}

                      {/*UserName*/}
                      <div className = "row">
                        <div className = "form-group"  >
                          <label htmlFor="UserName"> Username:</label>

                            <AlphaText type="string" id="UserName" className="form-control search-form" field="UserName"/>

                        </div>
                      </div>
                      {/*end UserName*/}

                      {/*language*/}
                      <div className = "row">
                        <div className = "form-group"  >
                          <label htmlFor="language"> language:</label>

                            <AlphaText type="string" id="language" className="form-control search-form" field="language"/>

                        </div>
                      </div>
                      {/*end language*/}

                      {/*Email*/}
                      <div className = "row">
                        <div className = "form-group"  >
                          <label htmlFor="Email"> Email:</label>

                          <RequiredText type="email" id="Email" className="form-control search-form" field="email"/>

                        </div>
                      </div>
                      {/*end Email*/}
                      {/*Role*/}
                      <div className = "row">
                        <div className = "form-group">
                          <label htmlFor = "UserType">Role  :</label>
                          <Select field ="UserType"id="UserType" options={this.props.employeeRole} className = "form-control search-form"/>
                        </div>
                      </div>
                      {/*end Role*/}
                      {/*password checkbox*/}
                      {this.props.id &&

                        <div className = "row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" name = "editPassword" value={this.state.editPassword} id="editPassword" onChange ={this.handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="editPassword">
                              Change Password
                            </label>
                          </div>

                        </div>

                      }
                      {/*end password checkbox*/}
                      {/*if the id is not present means that the password must be created
                        but if present then the password can be updated or not */}
                      {(!this.props.id || this.state.editPassword) &&
                        <div className = "row">
                          <div className = "form-group"  >
                            <label htmlFor="Password2"> Password:</label>

                            <RequiredText type="Password" id="Password2" className="form-control search-form" field="Password2"/>

                          </div>
                        </div>
                        }
                        {(!this.props.id || this.state.editPassword) &&
                        <div className = "row">
                          <div className = "form-group"  >
                            <label htmlFor="RepeatPassword">Repeat Password:</label>

                            <RequiredText type="Password" id="RepeatPassword" className="form-control search-form" field="RepeatPassword"/>

                          </div>
                        </div>

                      }
                    <div className = "row">
                      {/*in case the button need to show modal it get onclick event*/}
                      <button type="submit" className="btn btn-primary">
                        {this.props.id && "Update"}
                        {!this.props.id && "Create"}

                      </button>
                    </div>
                  </div>
                  </form>
              )}

            </Form>
          </div>
        </div>
      </div>

    )
  }

  componentWillMount(){
    var self = this
    if(this.props.id){
      axios.get("/api/singleemployee/"+this.props.id).then(
        function(response){
          return response
        }).then(
          function(result){
            if(result.data.success){
              var data = result.data.data

              // setting the current data and the backup data to initial state
              console.log(data)
              self.setState({formdata:data})
              self.setState({formDataBackup:data})
              self.state.formApi.setAllValues(data)
            }else{
              self.props.failed(result.data.msg)
            }

          }
        ).catch(function(error){

          self.props.failed(error)

        })

    }


  }


}

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeForm)
