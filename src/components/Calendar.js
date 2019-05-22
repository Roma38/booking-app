import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import "../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const ticketToEvent = tickets =>
  tickets.map(({ title, from, to }) => ({ title, start: new Date(from), end: new Date(to) }));

const filterTickets = (tickets, hall_id) => tickets.filter(ticket => ticket.hall_id === hall_id)
class Calendar extends Component {
  createEvent = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) console.log(title);
  };

  render() {
    const { auth, tickets, match } = this.props;

    return (
      <div className="big-calendar-container" style={{ minHeight: "700px" }}>
        <BigCalendar
          selectable={auth.authState === "logedIn"}
          onSelectEvent={event => alert(`${event.title}
          from ${moment(event.start).format("MMMM Do h:mm a")} to ${moment(event.end).format("MMMM Do h:mm a")}`)}
          onSelectSlot={this.createEvent}
          localizer={localizer}
          events={ticketToEvent(filterTickets(tickets.items, match.params.id))}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    );
  }
};

const mapStateToProps = ({ tickets, auth }) => ({ tickets, auth });

Calendar = connect(mapStateToProps)(Calendar);
Calendar = withRouter(Calendar)

export default Calendar;
