import React, {Component} from 'react';

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Form, Text,Select,Checkbox,TextArea } from 'react-form';
import axios from 'axios'
import {BASE_API} from '../global/url'
// THE FORMS required for validation
import {RequiredText,AlphaText,AlphaNumbericText} from '../global/form'
import  Modal2  from './Modal';
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
    statusSelectForm:selectReducer.statusForm2,
	}
}

class ClientForm extends Component{

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
      modalDanger:true
    }
    // for the ease of manipulatig form
    this.formApi.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.resetUpdateForm = this.resetUpdateForm.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }
  // for the ease of manipulating form
  formApi(formApi){
    this.setState({formApi:formApi})
  }
  handleSubmit(values, e, formApi){

    //handle empty value
    // for (let [key, value] of Object.entries(values)){
    //   if(value === "" || !value || value == "0000-00-00"){
    //     if( value == "0000-00-00"){
    //       values[key] = "0001-01-01"
    //     }else{
    //       values[key] = 0
    //     }
    //
    //   }
    // }

    //if it comes to creating the client it must check the first and last name availability
    var self = this
    var clienturl = BASE_API+"clientcustomdata";

    if(this.props.id){
      clienturl += "/"+this.props.id
    }else{
      clienturl += "/"+0
    }
    console.log(clienturl)
    //checking firstname and lastname availability
    axios.post(clienturl,[["FirstName","=",values.FirstName],["LastName","=",values.LastName]]).then(
      function(response){
        console.log(response)
        return response
      }).then(
        function(result){
          if(result.data.success){
            var data = result.data.data
            if(data.length > 0){
              //if exist
              self.props.failed("Sorry, The First Name and Last Name already exist")
              self.toggleModal("Sorry, The First Name and Last Name already exist")
            }else{
              //if does not exist
              self.props.onSubmit(values)
              if(self.props.id){
                  self.setState({formDataBackup:values})
              }
              // if it comes to the registration form it will greet you and reset the form
              if(!self.props.isAuthenticated){
                self.resetForm()
              }
            }
          }else{
            self.props.failed("failed validating")
          }

        }
      ).catch(function(error){

        self.props.failed(error)

      })



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
        {/*a modal for notifying error*/}
        <Modal2 title ="oops" status = "bad" message={this.state.modalMessage} isOpen={this.state.openErrorModal} toggle={this.toggleModal}/>


        <div className = "jumbotron">
          <Form ref = "clientForm" onSubmitFailure = {( errors, onSubmitError, formApi ) => {this.toggleModal()}} getApi = {(formApi) => {this.formApi(formApi)}} onSubmit = {(values, e, formApi) => {this.handleSubmit(values,formApi)}}>
            {formApi => (
                <form onSubmit={formApi.submitForm}  >
                  <div className = "row">
                  {/*first level first column*/}
                    <div className = "col">
                        <h1>PERSONAL INFORMATION</h1>
                        <div className = "row">
                          {/*FirstName*/}
                          <div className = "col">
                            <div className = "form-group"  >
                              <label htmlFor="FirstName"> First Name:</label>

                              <AlphaText type="string" id="FirstName" className="form-control search-form" field="FirstName"/>

                            </div>
                          </div>
                          {/*end FirstName*/}

                          {/*LastName*/}
                          <div className = "col">
                            <div className = "form-group"  >
                              <label htmlFor="LastName"> Surname:</label>

                              <AlphaText type="string" id="LastName" className="form-control search-form" field="LastName"/>

                            </div>
                          </div>
                          {/*end LastName*/}

                        </div>
                        <div className = "row">
                          {/*Nationality*/}
                          <div className = "col">
                            <div className = "form-group"  >
                              <label htmlFor="Nationality"> Nationality:</label>

                              <RequiredText type="string" id="Nationality" className="form-control search-form" field="Nationality"/>

                            </div>
                          </div>
                          {/*end Nationality*/}

                          {/*Date of Birth*/}
                          <div className = "col">
                            <div className = "form-group"  >
                              <label htmlFor="DateofBirth"> Date of Birth:</label>

                              <RequiredText type="Date" id="DateofBirth" className="form-control search-form" field="DateofBirth"/>
                              {formApi.errors && <p>error alert</p>}
                            </div>
                          </div>
                          {/*end Date of Birth*/}

                        </div>
                        <div className = "row">
                          {/*Mobile*/}
                          <div className = "col">
                            <div className = "form-group"  >
                              <label htmlFor="Mobile"> Mobile Number:</label>

                              <RequiredText type="string" id="Mobile" className="form-control search-form" field="Mobile"/>

                            </div>
                          </div>
                          {/*end Mobile*/}

                          {/*Email*/}
                          <div className = "col">
                            <div className = "form-group"  >
                              <label htmlFor="Email"> Email:</label>

                              <RequiredText type="email" id="Email" className="form-control search-form" field="Email"/>

                            </div>
                          </div>
                          {/*end Email*/}

                        </div>
                        <div className = "row">
                          {/*Wechat*/}
                          <div className = "col-md-6">
                            <div className = "form-group"  >
                              <label htmlFor="wechat"> WeChat:</label>

                              <RequiredText type="string" id="wechat" className="form-control search-form" field="wechat"/>

                            </div>
                          </div>
                          {/*end Wechat*/}
                        </div>
                        <div className = "row">
                          {/*Current Address*/}
                          <div className = "col">
                            <div className = "form-group"  >
                              <label htmlFor="CurrentAddress"> Address:</label>

                              <Text type="string" id="CurrentAddress" className="form-control search-form" field="CurrentAddress"/>

                            </div>
                          </div>
                          {/*end Current Address*/}
                        </div>
                        <div className = "row">
                          {/*Home Address*/}
                          <div className = "col">
                            <div className = "form-group"  >
                              <label htmlFor="HomeAddress"> Home Address:</label>

                              <Text type="string" id="HomeAddress" className="form-control search-form" field="HomeAddress"/>

                            </div>
                          </div>
                          {/*end Home Address*/}
                        </div>

                        <h1>Services</h1>
                        <div className = "row">
                          {/*Select for Services*/}
                          <div className = "col">
                            <div className = "form-group">
                              <label htmlFor = "service">Services Needed  :</label>
                              <Select field ="service" id="service" options={this.props.serviceSelectForm} field="service" className = "form-control search-form"/>
                            </div>
                          </div>
                          {/*end Select for Services*/}

                          {/*know where did yu hear about us*/}
                          <div className = "col">
                            <div className = "form-group"  >
                              <label htmlFor="know"> Where did you hear about us? *</label>

                              <RequiredText type="string" id="know" className="form-control search-form" field="know"/>

                            </div>
                          </div>
                          {/*know where did yu hear about us*/}

                        </div>
                        <div className = "row">
                          {/*Visa*/}
                          <div className = "col">
                            <div className = "form-group">
                              <label htmlFor = "Visa">Current Visa:</label>
                              <AlphaText type="string" id="Visa" className="form-control search-form" field="Visa"/>
                            </div>
                          </div>
                          {/*end Visa*/}

                          {/*visa expiry date*/}
                          <div className = "col">
                            <div className = "form-group"  >
                              <label htmlFor="Vexpiry"> Visa Expiry Date</label>

                              <RequiredText type="date" id="Vexpiry" className="form-control search-form" field="Vexpiry"/>

                            </div>
                          </div>
                          {/*end visa expiry date*/}

                        </div>
                        {/*the passport only occur in the aunthitecated side*/}
                        {this.props.isAuthenticated &&
                        <div className = "row">
                          {/*Passport*/}
                          <div className = "col">
                            <div className = "form-group"  >
                              <label htmlFor="Passport"> Passport No:</label>

                              <Text type="string" id="Passport" className="form-control search-form" field="Passport"/>

                            </div>
                          </div>
                          {/*end Passport*/}

                          {/*Passport Expiry Date*/}

                          <div className = "col">
                            <div className = "form-group"  >
                              <label htmlFor="Pexpiry"> Pexpiry:</label>

                              <Text type="Date" id="Pexpiry" className="form-control search-form" field="Pexpiry"/>

                            </div>
                          </div>
                          {/*end Passport Expiry Date*/}

                        </div> }
                        {(!this.props.isAuthenticated || localStorage.getItem("type") == "MANAGER") &&
                        <div className = "row">
                          {/*Consultants only occur in admin side*/}
                          {/*Consultants*/}
                          <div className = "col-md-6">
                            <div className = "form-group">
                              <label htmlFor = "ConsultantID">Consultant  :</label>
                              <Select field ="ConsultantID" id="ConsultantID" options={this.props.employeeSelectForm} field="ConsultantID" className = "form-control search-form"/>
                            </div>
                          </div>
                        </div>
                        }
                          {/*end Consultant*/}
                    </div>

                    {/*end first level first column*/}
                    {/* first level second column*/}
                    <div className = "col">
                      <h1>Education Background</h1>
                      <h2>Current Study</h2>
                      {/*Current study*/}
                      <div className = "row">
                        {/*current universtiy*/}
                        <div className = "col">
                          <div className = "form-group"  >
                            <label htmlFor="Uni">University:</label>

                            <AlphaText type="string" id="Uni" className="form-control search-form" field="Uni"/>

                          </div>
                        </div>
                        {/*end current universtiy*/}

                        {/*current course and major*/}
                        <div className = "col">
                          <div className = "form-group"  >
                            <label htmlFor="Course">Course and Major:</label>

                            <AlphaText type="string" id="Course" className="form-control search-form" field="Course"/>

                          </div>
                        </div>
                        {/*end current course and major*/}

                      </div>
                      <div className = "row">
                        {/*current universtiy country*/}
                        <div className = "col">
                          <div className = "form-group"  >
                            <label htmlFor="Ccountry">Country:</label>

                            <AlphaText type="string" id="Ccountry" className="form-control search-form" field="Ccountry"/>

                          </div>
                        </div>
                        {/*end current universtiy country*/}

                        {/*current Completion date*/}
                        <div className = "col">
                          <div className = "form-group"  >
                            <label htmlFor="uni_Compl">Estimated Completion Date:</label>

                            <RequiredText type="Date" id="uni_Compl" className="form-control search-form" field="uni_Compl"/>

                          </div>
                        </div>
                        {/*end current Completion date*/}

                      </div>
                      {/*end current study*/}
                      <h2>Previous Study</h2>
                      {/*prev study*/}
                      <div className = "row">
                        {/*previous universtiy*/}
                        <div className = "col">
                          <div className = "form-group"  >
                            <label htmlFor="prevUni"> Previous University/HighSchool:</label>

                            <AlphaText type="string" id="prevUni" className="form-control search-form" field="prevUni"/>

                          </div>
                        </div>
                        {/*end previous universtiy*/}

                        {/*Previous course and major*/}
                        <div className = "col">
                          <div className = "form-group"  >
                            <label htmlFor="prevStudy">Course and Major:</label>

                            <Text type="string" id="prevStudy" className="form-control search-form" field="prevStudy"/>
                            <p>Leave it blank if it is a highschool</p>
                          </div>
                        </div>
                        {/*end Previous course and major*/}

                      </div>
                      <div className = "row">
                        {/*previous universtiy*/}
                        <div className = "col">
                          <div className = "form-group"  >
                            <label htmlFor="prevCountry"> Previous Country:</label>

                            <AlphaText type="string" id="prevCountry" className="form-control search-form" field="prevCountry"/>

                          </div>
                        </div>
                        {/*end previous universtiy*/}

                        {/*Previous course and major*/}
                        <div className = "col">
                          <div className = "form-group"  >
                            <label htmlFor="prevComp">Completion Date:</label>

                            <RequiredText type="Date" id="prevComp" className="form-control search-form" field="prevComp"/>

                          </div>
                        </div>
                        {/*end Previous course and major*/}

                      </div>
                      {/*end previous study*/}



                      {/*about*/}
                      {this.props.isAuthenticated &&
                      <div className = "row">
                        <h2>About</h2>
                          <div className = "row">
                            {/*current status*/}
                            <div className = "col">
                              <div className = "form-group"  >
                                <label htmlFor="CurrentStatus"> Current Status:</label>

                                <Select options = {this.props.statusSelectForm} id="CurrentStatus" className="form-control search-form" field="CurrentStatus"/>

                              </div>
                            </div>
                            {/*end current status*/}

                            {/*duedate*/}
                            <div className = "col">
                              <div className = "form-group"  >
                                <label htmlFor="duedate">Due Date:</label>

                                <Text type="Date" id="duedate" className="form-control search-form" field="duedate"/>

                              </div>
                            </div>
                            {/*end duedate*/}

                          </div>
                      </div>
                      }
                      {/*end about*/}
                    </div>
                    {/* end first level second column*/}
                  </div>
                  <div className = "row">
                    {/*in case the button need to show modal it get onclick event*/}
                    <button type="submit" className="btn btn-primary">
                      {this.props.id && "Update"}
                      {!this.props.id && "Create"}

                    </button>
                  </div>
                </form>
            )}

          </Form>
        </div>

      </div>
    )
  }
  shouldComponentUpdate(nextProps, nextState){
    var self = this;
    if(nextState!== this.state || nextProps!== this.props){
      return true

    }
    return false
  }
  componentDidMount(){
    //if the props of client id is given otherwise the data will not be fetched
    var self = this
    if(this.props.id){
      axios.get(BASE_API+"singleclient/"+this.props.id).then(
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

export default connect(mapStateToProps,mapDispatchToProps)(ClientForm)
