import TeachingSchedule from "@/src/components/TeachingSchedule";
import useMutationAddEvent from "@/src/app/hooks/useMutationAddEvent";
import useQueryGetEvents from "@/src/app/hooks/useQueryGetEvents";
import { EventType } from "@/src/components/TeachingSchedule";
import moment from "moment";
import { useEffect, useState } from "react";
export default function TeachingScheduleContainer() {
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

  return <TeachingSchedule events={events} />;
}
