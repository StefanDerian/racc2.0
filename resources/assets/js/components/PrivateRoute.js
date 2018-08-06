import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch,Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {types, actions} from '../redux/auth'

const mapStateToProps = ({authReducer}) => {


	return {
		isAuthenticated:authReducer.isLoggedIn
	}
}


//mostly were copied from a tutorial but need to modified to be adapted
//I add the path as props for the Route component to make it identifyable when params are needed

class PrivateRouteComponent extends React.Component {
    render() {
        return (
            <Route path = {this.props.path} render={props => (
                this.props.isAuthenticated ? (
                    <this.props.component {...props}/>
                    ) : (
                    <Redirect to={{
                        pathname: '/Login',
                        state: { from: props.location }
                    }}/>
                )
            )}/>
        )
    }
}

// PrivateRouteComponent.propTypes = {
//     isAuthenticated: PropTypes.bool
// };

export default connect(mapStateToProps)(PrivateRouteComponent)
