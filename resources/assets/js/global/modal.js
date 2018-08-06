import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Alert } from 'reactstrap';
import React from 'react'

//isOpen={this.state.modal} toggle={this.toggle}

// the name must be different
export const Modal2 = (props) => (
  <Modal {...props} >
      <ModalHeader toggle={props.toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Alert className ="fixed" color="success">
            {props.message}
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>Do Something</Button>
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
  </Modal>
)
