import TeachingSchedule from "@/src/components/TeachingSchedule";
import useMutationAddEvent from "@/src/app/hooks/useMutationAddEvent";
import useQueryGetEvents from "@/src/app/hooks/useQueryGetEvents";
import { EventType } from "@/src/components/TeachingSchedule";
import moment from "moment";
import { useEffect, useState } from "react";
export default function TeachingScheduleContainer() {
  const { doMutation: onAddEvent, loading: addingEvent } =
    useMutationAddEvent();
  const { data, loading: gettingEvents, error } = useQueryGetEvents();
  const [events, setEvents] = useState<EventType[]>([]);
  // console.log(data);

  const convertEventData = (events: any) => {
    if (events) {
      // console.log(123);

      const updatedEvent = events.map((event: any) => {
        // console.log(new Date(event.createTime));

        return {
          ...event,
          start: new Date(event.scheduleTime),
          end: new Date(event.endTime),
        };
      });
      return updatedEvent;
    }
    return;
  };

  useEffect(() => {
    setEvents(convertEventData(data));
  }, [gettingEvents, data]);
  // console.log(events);

  const handleOnAddEvent = (event: any) => {
    // console.log(event);
    console.log({
      title: event.title,
      data: event.description,
      time: [
        moment(event.duration[0].$d).format(),
        moment(event.duration[1].$d).format(),
      ],
    });

    onAddEvent({
      title: event.title,
      data: event.description || "",
      time: [
        moment(event.duration[0].$d).format("hh-mm-DD-MM-YYYY"),
        moment(event.duration[1].$d).format("hh-mm-DD-MM-YYYY"),
      ],
    });
  };
  return <TeachingSchedule onAddEvent={handleOnAddEvent} events={events} />;
}
