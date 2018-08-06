import React, {Component} from 'react';
var PropTypes = require('prop-types');
import { Route, Redirect } from 'react-router'
import {types, actions, authReducer} from '../redux/auth'
import {types as messagetypes,actions as messageactions, messageReducer} from '../redux/message'
import { connect } from 'react-redux';
import axios from 'axios';

import {BASE_API} from '../global/url'

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: () => dispatch(actions.login()),
  failed: (msg) => dispatch(messageactions.failed(msg)),
  loading: (msg) => dispatch(messageactions.loading(msg)),
  success: (msg) => dispatch(messageactions.success(msg)),
  reset: () => dispatch(messageactions.reset())

})
const mapStateToProps = ({authReducer,messageReducer}) => {
	return {
		isAuthenticated:authReducer.isLoggedIn
	}
}


class Login extends Component {



  constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password:'',
      redirect: false
    };

	}

  handleSubmit(event){
    //prevent the default event to be happened
    event.preventDefault()
    //console.log(this.state)

    const data = {
      email:this.state.email,
      password:this.state.password

    }

    var self = this;
    self.props.loading("Checking credential please await")

    axios.post(BASE_API+"user/login",data).then(
      function(response){
        return response
      }).then(
        function(result){

          if(result.data.success){
            var data = result.data.data
            console.log(result.data.msg)
            localStorage.setItem('email', data.email);
            localStorage.setItem('displayName', data.DisplayName);
            localStorage.setItem('id', data.userid);
            localStorage.setItem('user_auth', data.user_auth);
            localStorage.setItem('type', data.usertype);
            self.props.login();
            self.props.success(result.data.msg)
            self.setState({ redirect: true })
          }else{
            self.props.failed(result.data.msg)
          }

        }
      ).catch(function(error){

        self.props.failed("Sorry but error occurred")

      })

  }
  handleChange(event){
    //prevent the default event to be happened
    //automatically set state by the form id and the state name and form id must be the same
		this.setState({

				[event.target.id]: event.target.value

			})
  }


  render () {
    const isRedirect = this.state.redirect;
return(
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Login</div>

                    <div className="card-body">
                        <form method="POST" onSubmit = {this.handleSubmit}>


                            <div className="form-group row">
                                <label htmlFor="email" className="col-sm-4 col-form-label text-md-right">E-Mail Address</label>

                                <div className="col-md-6">
                                    <input id="email" type="email" onChange = {this.handleChange} className="form-control" name="email" value={this.state.email}/>


                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                <div className="col-md-6">
                                    <input id="password" onChange = {this.handleChange} type="password" className="form-control" name="password" value={this.state.password} />


                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-md-6 offset-md-4">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" name="remember"/> Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row mb-0">
                                <div className="col-md-8 offset-md-4">
                                    <button type="submit" className="btn btn-primary" id = "login-form button">
                                        Login
                                    </button>

                                    <a className="btn btn-link" href="#">
                                        Forgot Your Password?
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {isRedirect && <Redirect to='/'/>}

    </div>



);
  }
}
//have to be both as both are compulsory
export default connect(mapStateToProps,mapDispatchToProps)(Login)
