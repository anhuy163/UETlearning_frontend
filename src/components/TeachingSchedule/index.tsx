import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import moment from "moment";

const localizer = momentLocalizer(moment);
export default function TeachingSchedule() {
  const formats = {
    eventTimeRangeFormat: ({ start, end }) => {
      const formattedStart = moment(start).format("h:mm a");
      const formattedEnd = moment(end).format("h:mm a");
      return `${formattedStart} - ${formattedEnd}`;
    },
    dayHeaderFormat: (date) => {
      return moment(date).format("ddd, MMM D");
    },
    eventDateFormat: (date) => {
      return moment(date).format("ddd, MMM D");
    },
    agendaDateFormat: (date) => {
      return moment(date).format("ddd, MMM D");
    },
  };
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Event 1",
      start: new Date(),
      end: new Date(),
    },
    {
      id: 2,
      title: "Event 2",
      start: new Date(),
      end: new Date(),
    },
  ]);

  const handleDeleteEvent = (event: any) => {
    // Filter out the event with the matching ID
    const updatedEvents = events.filter((e) => e.id !== event.id);

    // Update the state with the new array of events
    setEvents(updatedEvents);
  };

  return (
    <div>
      <Calendar
        formats={formats}
        localizer={localizer}
        events={events}
        onSelectEvent={(event: any) => handleDeleteEvent(event)}
      />
    </div>
  );
}
