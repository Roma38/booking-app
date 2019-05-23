import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react'
import { connect } from "react-redux";
//import "./EditTicketForm.css"
import { Link } from "react-router-dom";



class EditTicketForm extends Component {
  render() {
    const { isModalOpened } = this.props
    return (
      <Modal open={isModalOpened} closeIcon>
        <Modal.Content>
          <p>
            Your inbox is getting full, would you like us to enable automatic archiving of old messages?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red'>
            <Icon name='remove' /> No
           </Button>
          <Button color='green'>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ halls }) => ({ halls });

EditTicketForm = connect(
  mapStateToProps
)(EditTicketForm);

export default EditTicketForm;