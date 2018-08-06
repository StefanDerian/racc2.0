import React, { Component } from 'react';
var PropTypes = require('prop-types');
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Alert } from 'reactstrap';

class Modal2 extends Component{

  render () {
    return (

        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className} >
          <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
            <ModalBody>
              <Alert color ={this.props.status ==="bad"?"danger":"success"}>
                {this.props.status ==="bad"?"Please Correct The Error":"Congratulations Please Wait, Our friendly staff will come to serve you"}
              </Alert>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.props.toggle}>Okay</Button>

            </ModalFooter>
        </Modal>

    )
  }
  shouldComponentUpdate(nextProps, nextState){

    if(nextProps!== this.props){
      console.log(this.props)
      return true

    }
    return false
  }
}

export default Modal2
