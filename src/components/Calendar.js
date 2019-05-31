import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Modal, Icon, Input } from 'semantic-ui-react';
import "./Calendar.css"
import EditTicketModal from "./EditTicketModal";
import "../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import { API_HOST } from "../config";
import { getTickets } from "../redux/actions/tickets";
import { openPopup } from "../redux/actions/popup";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const ticketToEvent = tickets =>
  tickets.map(({ title, from, to, user_id, _id }) => ({ title, start: new Date(from), end: new Date(to), user_id, _id }));

const filterTickets = (tickets, hall_id) => tickets.filter(ticket => ticket.hall_id === hall_id);

let Event = function (props) {
  const { event, auth } = props;
  return (
    <div>
      {event.user_id === auth._id && <Icon name='paw' color='yellow' />}
      <strong>{event.title}</strong>
    </div>
  )
}
class Calendar extends Component {
  state = {
    isEditModalOpened: false,
    isInfoModalOpened: false,
    isCreateModalOpened: false,
    chosenEvent: {},
    newTicket: {}
  }

  createEvent = () => {
    const { start, end, title } = this.state.newTicket
    axios({
      method: 'post',
      url: `${API_HOST}/tickets`,
      headers: { Authorization: this.props.auth.token },
      data: { from: Date.parse(start), to: Date.parse(end), title, hall_id: this.props.match.params.id, user_id: this.props.auth._id }
    }).then(({ data }) => {
      this.props.getTickets();
      this.setState({ isCreateModalOpened: false });
    })
      .catch(error => {
        try {
          this.props.openPopup({
            content: error.response.data.message,
            attributes: { negative: true }
          })
        } catch {
          this.props.openPopup({
            content: `Ooops, something went wrong :(`,
            attributes: { negative: true }
          })
        }
        this.setState({ isCreateModalOpened: false });
        console.log(error.response)
      });
  };

  showTicketDetails = chosenEvent => {
    chosenEvent.start = moment(chosenEvent.start).format("DD-MM-YYYY H:mm");
    chosenEvent.end = moment(chosenEvent.end).format("DD-MM-YYYY H:mm");
    this.setState({ isInfoModalOpened: true, chosenEvent })
  }

  editTicket = chosenEvent => {
    chosenEvent.start = moment(chosenEvent.start).format("DD-MM-YYYY H:mm");
    chosenEvent.end = moment(chosenEvent.end).format("DD-MM-YYYY H:mm")
    this.setState({ isEditModalOpened: true, chosenEvent })
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ chosenEvent: { ...this.state.chosenEvent, [name]: value } })
  }

  handleDateChange = (event, { name, value }) => {
    this.setState({ chosenEvent: { ...this.state.chosenEvent, [name]: value } })
  }

  sendChanges = () => {
    const { _id, start, end, title } = this.state.chosenEvent
    axios({
      method: 'put',
      url: `${API_HOST}/ticket/${_id}`,
      headers: { Authorization: this.props.auth.token },
      data: { from: moment(start, "DD-MM-YYYY H:mm").unix() * 1000, to: moment(end, "DD-MM-YYYY H:mm").unix() * 1000, title }
    }).then(({ data }) => {
      this.props.getTickets();
    })
      .catch(error => {
        try {
          this.props.openPopup({
            content: error.response.data.message,
            attributes: { negative: true }
          })
        } catch {
          this.props.openPopup({
            content: `Ooops, something went wrong :(`,
            attributes: { negative: true }
          })
        }
        console.log(error.response);
      });
  }

  removeTicket = () => {
    if (window.confirm("Are you sure want to cancel booking??"))
      axios({
        method: 'delete',
        url: `${API_HOST}/tickets/${this.state.chosenEvent._id}`,
        headers: { Authorization: this.props.auth.token },
      }).then(({ data }) => {
        this.props.getTickets();
        this.setState({ isEditModalOpened: false });
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
          onSelectSlot={({ start, end }) => this.setState({ isCreateModalOpened: true, newTicket: { start, end } })}
          localizer={localizer}
          events={ticketToEvent(filterTickets(tickets.items, match.params.id))}
          startAccessor="start"
          endAccessor="end"
          components={{ event: Event }} />

        <EditTicketModal
          open={this.state.isEditModalOpened}
          closeModal={() => this.setState({ isEditModalOpened: false })}
          editingTicket={this.state.chosenEvent}
          handleChange={this.handleChange}
          handleDateChange={this.handleDateChange}
          sendChanges={this.sendChanges}
          removeTicket={this.removeTicket} />

        <Modal open={this.state.isInfoModalOpened} closeIcon onClose={() => this.setState({ isInfoModalOpened: false, chosenEvent: {} })} >
          <Modal.Header>{this.state.chosenEvent.title}</Modal.Header>
          <Modal.Content>
            <p>From {this.state.chosenEvent.start} to {this.state.chosenEvent.end}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={() => this.setState({ isInfoModalOpened: false, chosenEvent: {} })}>Close</Button>
          </Modal.Actions>
        </Modal>

        <Modal open={this.state.isCreateModalOpened}  closeIcon onClose={() => this.setState({ isCreateModalOpened: false })} >
          <Modal.Content>
            <Input placeholder='Title' fluid onChange={(e, data) => this.setState({ newTicket: { ...this.state.newTicket, title: data.value } })} />
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.createEvent}>Save</Button>
            <Button color='red' onClick={() => this.setState({ isCreateModalOpened: false })}>Close</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = ({ tickets, auth }) => ({ tickets, auth });
const mapDispatchToProps = dispatch => ({ getTickets: () => dispatch(getTickets()), openPopup: payload => dispatch(openPopup(payload)) });

Calendar = connect(mapStateToProps, mapDispatchToProps)(Calendar);
Event = connect(mapStateToProps)(Event);
Calendar = withRouter(Calendar);

export default Calendar;
