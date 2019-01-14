import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch,Link, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';

import PrivateRoute from './PrivateRoute';//to include route guard
import { createLogger } from 'redux-logger'//DEBUGGER FIR REDUX TO SHOW IN THE BROWSER
import thunk from 'redux-thunk';//Redux Thunk middleware allows you to write action creators that return a function instead of an action.
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { Provider } from 'react-redux'; //to include the store

import {types, actions, authReducer} from '../redux/auth'
import {messageReducer} from '../redux/message'
import {actions as employeeActions, employeeReducer} from '../redux/employee'
import {actions as selectActions, selectReducer} from '../redux/select'
import {actions as accountantActions, accountantReducer} from '../redux/accountant'

import Header from './Header' //separate header
import Message from './Message' //separate header

import Employee from './Employee'
import Detail from './Detail'
import CreateClient from './CreateClient'
import CreateEmployee from './CreateEmployee'
import UpdateEmployee from './UpdateEmployee'
import Accountant from './Accountant'
import Home2 from './Home2'

import axios from 'axios'

import {BASE_API} from '../global/url'


const mapStateToProps = (authReducer) => {


	return {
		isAuthenticated:authReducer.isLoggedIn
	}
}
const reducer = combineReducers({
	authReducer,
	messageReducer,
	employeeReducer,
	selectReducer,
	accountantReducer

})
const loggerMiddleware = createLogger()
const store = createStore(reducer,applyMiddleware(thunk,loggerMiddleware));


//meant to keep the user logged in when the page is refreshed
var email = localStorage.getItem('email')

if(email){
	store.dispatch(actions.login())
}




export default class Example extends Component {

  constructor(props){
    super(props);

     }
    render() {




      const Loading = () => <div>Loading...</div>;


      //code splitting with asyncronous like, and I use import caused by bable issue
      const Login = Loadable({
        loader: () => System.import('./Login'),
        loading: Loading
      });
      const Home = Loadable({
        loader: () => System.import('./Home'),
        loading: Loading
      });




      // const About = Loadable({
      //   loader: () => System.import('./routes/About'),
      //   loading: Loading
      // });
        return (
          <Router>
            <div className="container-fluid">
              <Header/>
							<Message />
                <div className="row justify-content-center">
                  <Switch>
                        <PrivateRoute exact path="/" component={Home} />
												<PrivateRoute path="/Employee" component={Employee} />
												<PrivateRoute path="/Detail/:id/:type/:eduId?" component={Detail} />
												<PrivateRoute path="/CreateClient" component={CreateClient} />
												<PrivateRoute path="/CreateEmployee" component={CreateEmployee} />
												<PrivateRoute path="/UpdateEmployee/:id" component={UpdateEmployee} />
												<PrivateRoute path="/Accountant" component={Accountant} />
												<PrivateRoute path="/Home2" component={Home2} />
                        <Route path="/Login" component={Login}/>
                        <Route path="/Register" component={CreateClient}/>
                  </Switch>




                </div>
            </div>
          </Router>
        );
    }
    componentDidMount(){
			var self = this;
      console.log(localStorage.getItem('user_auth'))

			//employees data
			axios.get("/api/employeedata/0")
			.then(res => res)
			.then(function(response){
				var employees = response.data.data
				console.log("employees",employees)
				store.dispatch(employeeActions.all(employees))

			}).catch(function(error){
				console.log(error)
			})
    }

}

if (document.getElementById('example')) {
    ReactDOM.render(
      <Provider store={store}>
        <Example />
      </Provider>,document.getElementById('example')
      );
}
