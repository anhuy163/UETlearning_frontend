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
import { Button, Popconfirm } from "antd";
import PopupAddEventContainer from "@/src/containers/PopupAddEvent";
import CustomEvent from "../CustomEvent/CustomEvent";

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

type CalendarProps = {
  onAddEvent: (event: any) => void;
  events: EventType[];
};

export type EventType = {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
};
const TeachingSchedule = React.memo(function TeachingSchedule({
  onAddEvent,
  events,
}: CalendarProps) {
  const [togglePopupAddEvent, setTogglePopupAddEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(undefined);

  const onOpenTogglePopupAddEvent = () => {
    setTogglePopupAddEvent(true);
  };
  const onCloseTogglePopupAddEvent = () => {
    setTogglePopupAddEvent(false);
  };
  const handleOnSelectEvent = (event: any) => {
    setSelectedEvent(event.id);
    setTogglePopupAddEvent(true);
  };

  const handleOnAddEvent = () => {
    setSelectedEvent(undefined);
    onOpenTogglePopupAddEvent();
  };
  const handleOnSubmitEvent = (e: any) => {
    onAddEvent(e);
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
          onSelectEvent={handleOnSelectEvent}
          components={{ event: CustomEvent }}
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
          Click vào sự kiện để chỉnh sửa
        </span>
      </div>
      <PopupAddEventContainer
        open={togglePopupAddEvent}
        onCancel={onCloseTogglePopupAddEvent}
        onFinish={handleOnSubmitEvent}
        eventId={selectedEvent}
      />
    </div>
  );
});

export default TeachingSchedule;
