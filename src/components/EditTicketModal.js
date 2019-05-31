import React from 'react';
import { Button, Modal, Icon, Form } from 'semantic-ui-react'
import { DateTimeInput } from 'semantic-ui-calendar-react';


export default function EditTicketModal(props) {
  return (
    <Modal open={props.open} closeIcon onClose={props.closeModal}>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Title</label>
            <input type="text" name="title" value={props.editingTicket.title || ""} onChange={props.handleChange} />
          </Form.Field>
          <Form.Field>
            <DateTimeInput
              name="start"
              value={props.editingTicket.start}
              iconPosition="left"
              onChange={props.handleDateChange}
            />
          </Form.Field>
          <Form.Field>
            <DateTimeInput
              name="end"
              value={props.editingTicket.end}
              iconPosition="left"
              onChange={props.handleDateChange}
            />
          </Form.Field>
          <Button type='submit' onClick={props.sendChanges}>Save changes</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={props.removeTicket}>
          <Icon name='remove' /> Cancel booking
           </Button>
        <Button onClick={props.closeModal}>Close
            </Button>
      </Modal.Actions>
    </Modal>
  );
}