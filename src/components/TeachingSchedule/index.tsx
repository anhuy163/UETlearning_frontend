import {
  Calendar,
  momentLocalizer,
  dateFnsLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import moment from "moment";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Button } from "antd";
import PopupAddEventContainer from "@/src/containers/PopupAddEvent";

// const localizer = momentLocalizer(moment);
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const messages = {
  today: "Hôm nay", // update the "today" title here
  previous: "Hôm qua",
  next: "Ngày mai",
  month: "Tháng",
  week: "Tuần",
  day: "Ngày",
  agenda: "Lịch trình",
  date: "Date",
  time: "Time",
  event: "Event",
};
export default function TeachingSchedule() {
  const [togglePopupAddEvent, setTogglePopupAddEvent] = useState(false);
  const onOpenTogglePopupAddEvent = () => {
    setTogglePopupAddEvent(true);
  };
  const onCloseTogglePopupAddEvent = () => {
    setTogglePopupAddEvent(false);
  };
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Big Meeting",
      allDay: true,
      start: new Date(2023, 2, 5),
      end: new Date(2023, 2, 7),
    },
    {
      id: 2,
      title: "Vacation",
      start: new Date(2023, 2, 7),
      end: new Date(2023, 2, 8),
    },
    {
      id: 3,
      title: "Conference",
      start: new Date(2023, 2, 8),
      end: new Date(2023, 2, 10),
    },
  ]);

  const handleDeleteEvent = (event: any) => {
    console.log(event);

    // Filter out the event with the matching ID
    const updatedEvents = events.filter((e) => e.id !== event.id);

    // Update the state with the new array of events
    setEvents(updatedEvents);
  };

  const handleOnAddEvent = () => {
    onOpenTogglePopupAddEvent();
  };
  const handleOnSubmitEvent = (e: any) => {
    const addedEvent = {
      id: 4,
      title: e.title,
      start: new Date(e.duration[0]),
      end: new Date(e.duration[1]),
    };
    setEvents((prevEvents) => {
      return [...prevEvents, addedEvent];
    });
    onCloseTogglePopupAddEvent();
  };

  const eventTooltip = (event: any) => {
    return `${event.title}`;
  };

  return (
    <div className='h-[100%] w-full px-12 relative'>
      <div className='h-[90%] mb-3 w-full '>
        <Calendar
          messages={messages}
          localizer={localizer}
          events={events}
          startAccessor='start'
          endAccessor='end'
          style={{ width: "100%" }}
          onEventResize={(event: any) => console.log(event)}
          resizable
          tooltipAccessor={(event: any) => eventTooltip(event)}
          onSelectEvent={handleDeleteEvent}
        />
      </div>
      <Button
        className='ml-2 bg-cyan-900 text-white border-none opacity-80 hover:opacity-100'
        onClick={handleOnAddEvent}>
        Thêm sự kiện
      </Button>
      <div className='absolute bottom-0 right-4 w-[full]'>
        <span className='text-xl text-red-500'>* </span>{" "}
        <span className='text-base font-semibold'>
          Click vào sự kiện để xóa
        </span>
      </div>
      <PopupAddEventContainer
        open={togglePopupAddEvent}
        onCancel={onCloseTogglePopupAddEvent}
        onFinish={handleOnSubmitEvent}
      />
    </div>
  );
}
