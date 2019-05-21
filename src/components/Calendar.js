import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { connect } from "react-redux";
import "../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const ticketToEvent = tickets =>
  tickets.map(({ title, from, to }) => ({ title, start: new Date(from), end: new Date(to) }));

const CalendarComponent = props => (
  <div className="big-calendar-container" style={{minHeight: "700px"}}>
    <BigCalendar
      localizer={localizer}
      events={ticketToEvent(props.tickets.items)}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
);

const mapStateToProps = ({ tickets }) => ({ tickets });

const Calendar = connect(mapStateToProps)(CalendarComponent);

export default Calendar;
