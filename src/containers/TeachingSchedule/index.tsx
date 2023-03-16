import TeachingSchedule from "@/src/components/TeachingSchedule";
import useMutationAddEvent from "@/src/app/hooks/useMutationAddEvent";
import useQueryGetEvents from "@/src/app/hooks/useQueryGetEvents";
import { EventType } from "@/src/components/TeachingSchedule";
import moment from "moment";
export default function TeachingScheduleContainer() {
  const { doMutation: onAddEvent, loading: addingEvent } =
    useMutationAddEvent();
  const { data, loading: gettingEvents, error } = useQueryGetEvents();
  console.log(data);

  const dummyEvents: EventType[] = [
    {
      id: "1",
      title: "Big Meeting",
      description: "1",
      start: new Date(2023, 2, 5),
      end: new Date(2023, 2, 7),
    },
    {
      id: "2",
      title: "Vacation",
      description: "2",
      start: new Date(2023, 2, 7),
      end: new Date(2023, 2, 8),
    },
    {
      id: "3",
      title: "Conference",
      description: "3",
      start: new Date(2023, 2, 8),
      end: new Date(2023, 2, 10),
    },
  ];
  const handleOnAddEvent = (event: any) => {
    // console.log(event);
    console.log({
      title: event.title,
      data: event.desription,
      time: [
        moment(event.duration[0].$d).format(),
        moment(event.duration[1].$d).format(),
      ],
    });

    onAddEvent({
      title: event.title,
      data: event.desription || "",
      time: [
        moment(event.duration[0].$d).format("hh-mm-DD-MM-YYYY"),
        moment(event.duration[1].$d).format("hh-mm-DD-MM-YYYY"),
      ],
    });
  };
  return <TeachingSchedule onAddEvent={handleOnAddEvent} events={data} />;
}
