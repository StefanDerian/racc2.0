import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import UpdateClient from './UpdateClient'
import Pte from './Pte'
import Education from './Education'
import { BrowserRouter as Router, Route, Switch,Link, Redirect } from 'react-router-dom';
import {Col} from 'reactstrap'
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
class ClientDetail extends Component{
  render () {
    const match = this.props.match
    return (

      <div className ="container">
        {/*to props refers to object with pathname attribute to prevent accumulating url path*/}
        <Nav tabs>
          <NavItem>
            <Link to ={{pathname:"/Detail/"+match.params.id+"/updateclient"}} className="btn btn-primary">Update Client Data</Link>
          </NavItem>
          <NavItem>
            <Link to ={{pathname:"/Detail/"+match.params.id+"/pte"}} className="btn btn-primary">Update Migration data</Link>
          </NavItem>
          <NavItem>
            <Link to ={{pathname:"/Detail/"+match.params.id+"/education"}} className="btn btn-primary">Update Education Data</Link>
          </NavItem>
        </Nav>
        {match.params.type == "updateclient" && <UpdateClient id ={match.params.id}/>}
        {match.params.type == "pte" && <Pte id ={match.params.id}/>}
        {match.params.type == "education" && <Education id ={match.params.id}/>}




      </div>
    )
  }
}

export default ClientDetail
