import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { Button, Modal, Icon, Form } from 'semantic-ui-react'
import { DateTimeInput } from 'semantic-ui-calendar-react';
import "../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import { API_HOST } from "../config"
import { getTickets } from "../redux/actions/tickets"

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const ticketToEvent = tickets =>
  tickets.map(({ title, from, to, user_id, _id }) => ({ title, start: new Date(from), end: new Date(to), user_id, _id }));

const filterTickets = (tickets, hall_id) => tickets.filter(ticket => ticket.hall_id === hall_id);
class Calendar extends Component {
  state = {
    isModalOpened: false,
    editingTicket: {}
  }

  createEvent = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title)
      axios({
        method: 'post',
        url: `${API_HOST}:4000/tickets`,
        headers: { Authorization: this.props.auth.token },
        data: { from: Date.parse(start), to: Date.parse(end), title, hall_id: this.props.match.params.id, user_id: this.props.auth._id }
      }).then(({ data }) => {
        this.props.getTickets()
      })
        .catch(error => {
          console.log(error.response)
        });
  };

  showTicketDetails = ticket => {
    alert(`${ticket.title}
      from ${moment(ticket.start).format("MMMM Do h:mm a")} to ${moment(ticket.end).format("MMMM Do h:mm a")}`)
  }

  editTicket = editingTicket => {
    editingTicket.start = moment(editingTicket.start).format("DD-MM-YYYY H:mm");
    editingTicket.end = moment(editingTicket.end).format("DD-MM-YYYY H:mm")
    this.setState({ isModalOpened: true, editingTicket })
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ editingTicket: { ...this.state.editingTicket, [name]: value } })
  }

  handleDateChange = (event, { name, value }) => {
    this.setState({ editingTicket: { ...this.state.editingTicket, [name]: value } })
  }

  sendChanges = () => {
    const { _id, start, end, title } = this.state.editingTicket
    axios({
      method: 'put',
      url: `${API_HOST}:4000/ticket/${_id}`,
      headers: { Authorization: this.props.auth.token },
      data: { from: moment(start, "DD-MM-YYYY H:mm").unix() * 1000, to: moment(end, "DD-MM-YYYY H:mm").unix() * 1000, title }
    }).then(({ data }) => {
      this.props.getTickets();
    })
      .catch(error => {
        console.log(error.response);
      });
  }

  removeTicket = () => {
    if (window.confirm("Are you sure want to cancel booking??"))
      axios({
        method: 'delete',
        url: `${API_HOST}:4000/tickets/${this.state.editingTicket._id}`,
        headers: { Authorization: this.props.auth.token },
      }).then(({ data }) => {
        console.log(data);
        this.props.getTickets();
        this.setState({ isModalOpened: false });
      })
        .catch(error => {
          console.log(error.response);
        });
  }

  render() {
    const { auth, tickets, match } = this.props;

    return (
      <div className="big-calendar-container" style={{ minHeight: "700px" }}>
        <BigCalendar
          selectable={auth.authState === "loggedIn"}
          defaultView="week"
          onSelectEvent={event => {
            event.user_id === auth._id ? this.editTicket(event) : this.showTicketDetails(event)
          }}
          onSelectSlot={this.createEvent}
          localizer={localizer}
          events={ticketToEvent(filterTickets(tickets.items, match.params.id))}
          startAccessor="start"
          endAccessor="end" />
        <Modal open={this.state.isModalOpened} closeIcon onClose={() => this.setState({ isModalOpened: false })}>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Title</label>
                <input type="text" name="title" value={this.state.editingTicket.title} onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <DateTimeInput
                  name="start"
                  value={this.state.editingTicket.start}
                  iconPosition="left"
                  onChange={this.handleDateChange}
                />
              </Form.Field>
              <Form.Field>
                <DateTimeInput
                  name="end"
                  value={this.state.editingTicket.end}
                  iconPosition="left"
                  onChange={this.handleDateChange}
                />
              </Form.Field>
              <Button type='submit' onClick={this.sendChanges}>Save changes</Button>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={this.removeTicket}>
              <Icon name='remove' /> Cancel booking
           </Button>
            <Button onClick={() => this.setState({ isModalOpened: false })}>Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = ({ tickets, auth }) => ({ tickets, auth });
const mapDispatchToProps = dispatch => ({ getTickets: () => dispatch(getTickets()) });

Calendar = connect(mapStateToProps, mapDispatchToProps)(Calendar);
Calendar = withRouter(Calendar);

export default Calendar;
