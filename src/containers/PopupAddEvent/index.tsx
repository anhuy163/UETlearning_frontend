import PopupAddEvent from "@/src/components/PopupAddEvent";
import moment from "moment";
import { useEffect } from "react";
import useQueryGetEventById from "@/src/app/hooks/useQueryGetEventById";

export type PopupAddEventProps = {
  open: boolean;
  onCancel: () => void;
  onFinish: (e: any) => void;
  eventId: string | undefined;
};

export default function PopupAddEventContainer(props: PopupAddEventProps) {
  const { eventId } = props;
  const {
    data: event,
    loading: gettingEvent,
    error,
  } = useQueryGetEventById(eventId);
  // console.log(event);

  // console.log(eventId);
  const defaultValues = {
    title: "An com",
    description: "123",
    duration: [moment("2023-03-16"), moment("2023-03-18")],
  };

  return (
    <PopupAddEvent
      event={eventId}
      loading={gettingEvent}
      {...props}
      defaultValues={eventId ? event : undefined}
    />
  );
}
