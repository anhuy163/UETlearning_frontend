import React from "react";
import { Popconfirm, Modal } from "antd";
import { TEXT } from "../../app/constants";

export default function CustomEvent({ event }: any) {
  const handleOnDeleteEvent = (event: any) => {
    console.log(event.id);
  };
  return (
    // <Popconfirm
    //   title={event.title}
    //   description={TEXT.DELETE_EVENT_WARNING}
    //   onConfirm={() => handleOnDeleteEvent(event)}
    //   okButtonProps={{ type: "default" }}
    //   cancelButtonProps={{
    //     type: "dashed",
    //   }}
    //   cancelText={TEXT.CANCEL}
    //   okText={TEXT.OK}>
    <div style={{ backgroundColor: event.color }}>
      <p>{event.title}</p>
      <p>
        {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
      </p>
    </div>
    // </Popconfirm>
  );
}
