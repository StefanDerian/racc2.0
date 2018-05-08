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




class PrivateRouteComponent extends React.Component {
    render() {
        return (
            <Route render={props => (
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
