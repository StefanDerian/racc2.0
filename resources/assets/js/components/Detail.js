import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import UpdateClient from './UpdateClient'
import Pte from './Pte'
import AccountantDetail from './AccountantDetail'
import Education from './Education'
import { BrowserRouter as Router, Route, Switch,Link, Redirect } from 'react-router-dom';
import {Col} from 'reactstrap'
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
class ClientDetail extends Component{
  render () {
    const match = this.props.match
    return (

      <div className ="container">
        <p>Edit Data for {match.params.id}</p>
        {/*to props refers to object with pathname attribute to prevent accumulating url path*/}
        <Nav tabs>
          {(localStorage.getItem("type") == "MANAGER" || localStorage.getItem("type") == "AGENT") &&
          <NavItem>
            <Link to ={{pathname:"/Detail/"+match.params.id+"/updateclient"}} className="btn btn-primary">Update Client Data</Link>
          </NavItem>
          }
          {(localStorage.getItem("type") == "MANAGER" || localStorage.getItem("type") == "AGENT") &&
          <NavItem>
            <Link to ={{pathname:"/Detail/"+match.params.id+"/pte"}} className="btn btn-primary">Update Migration data</Link>
          </NavItem>
          }
          { !match.params.eduId &&
          <NavItem>
            <Link to ={{pathname:"/Detail/"+match.params.id+"/education"}} className="btn btn-primary">Update Education Data</Link>
          </NavItem>
          }
          {/* <NavItem>
            <Link to ={{pathname:"/Detail/"+match.params.id+"/accountantDetail"}} className="btn btn-primary">Update Education Payment</Link>
          </NavItem>*/}
        </Nav>
        {match.params.type == "updateclient" && <UpdateClient id ={match.params.id}/>}
        {match.params.type == "pte" && <Pte id ={match.params.id}/>}
        {match.params.type == "education" && <Education id ={match.params.id}/>}
        {match.params.type == "accountantDetail" && match.params.eduId && <AccountantDetail id ={match.params.id} eduId={match.params.eduId}/>}





      </div>
    )
  }
}

export default ClientDetail
