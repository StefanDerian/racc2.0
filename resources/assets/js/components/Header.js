	import React from 'react'
	import PropTypes from 'prop-types'
	import { connect } from 'react-redux';
	import { BrowserRouter as Router, Route, Switch,Link, Redirect } from 'react-router-dom';
	import {types, actions} from '../redux/auth'

	//react and boostrap
	import { Nav, NavItem, NavLink } from 'reactstrap';

	const mapStateToProps = ({authReducer}) => {

		return {
			isAuthenticated:authReducer.isLoggedIn
		}
	}

	const mapDispatchToProps = (dispatch, ownProps) => ({
	  logout: () => dispatch(actions.logout()),
	})

	class Header extends React.Component{
	  constructor(props){
	    super(props);

	    this.logout = this.logout.bind(this);
	     }
	     logout(event){
				 event.preventDefault()
	       console.log("logout clicked")
				 localStorage.clear()
	       this.props.logout()
	       window.location = "/Login"
	     }

	       render(){
	         return (
						 <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style = {{"marginBottom":"5px"}}>
							 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
								 <span className="navbar-toggler-icon"></span>
							 </button>
							 <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
								 <a className="navbar-brand" href="#">Hidden brand</a>
								 <ul className="navbar-nav navbar-right mr-auto mt-2 mt-lg-0">
									 <li className="nav-item active">
										 { (localStorage.getItem("type") == "MANAGER" || localStorage.getItem("type") == "AGENT") && this.props.isAuthenticated && <Link to ={`/`} className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>}
									 </li>
									 <li className="nav-item">
										 { !this.props.isAuthenticated && <Link to ={`/Login`} className="nav-link" href="#">Login</Link>}
									 </li>
									 <li className="nav-item">
										 { !this.props.isAuthenticated && <Link to ={`/Register`} className="nav-link" href="#">Register</Link>}
									 </li>
									 <li className="nav-item">
										 { this.props.isAuthenticated && localStorage.getItem("type") == "MANAGER" && <Link to ={`/Employee`} className="nav-link" href="#">Employee</Link>}
									 </li>
									 <li className="nav-item">
										 { this.props.isAuthenticated && <button className="btn btn-danger" onClick = {this.logout} href="#">logout</button> }
									</li>
								</ul>


							</div>
						</nav>

	             )

						 }







	}

	export default connect(mapStateToProps,mapDispatchToProps)(Header)
