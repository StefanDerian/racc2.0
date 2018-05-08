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


import Header from './Header' //separate header
import Message from './Message' //separate header

import Employee from './Employee'



const mapStateToProps = (authReducer) => {


	return {
		isAuthenticated:authReducer.isLoggedIn
	}
}
const reducer = combineReducers({
	authReducer,
	messageReducer

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
                        <Route path="/Login" component={Login}/>
                  </Switch>




                </div>
            </div>
          </Router>
        );
    }
    componentDidMount(){
      console.log(localStorage.getItem('user_auth'))
    }

}

if (document.getElementById('example')) {
    ReactDOM.render(
      <Provider store={store}>
        <Example />
      </Provider>,document.getElementById('example')
      );
}
