import PopupAddEvent from "@/src/components/PopupAddEvent";
import moment from "moment";
import { useEffect } from "react";
import useQueryGetEventById from "@/src/app/hooks/useQueryGetEventById";
import useMutationDeleteEventById from "@/src/app/hooks/useMutationDeleteEventById";

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
  const { doMutation: deleteEvent, loading: deletingEvent } =
    useMutationDeleteEventById();
  // console.log(event);

  const handleOnDeleteEvent = () => {
    if (eventId) return deleteEvent(eventId).then(() => props.onCancel());
  };

  // console.log(eventId);
  const defaultValues = {
    title: "An com",
    description: "123",
    duration: [moment("2023-03-16"), moment("2023-03-18")],
  };

  return (
    <PopupAddEvent
      event={eventId}
      loading={gettingEvent || deletingEvent}
      {...props}
      defaultValues={eventId ? event : undefined}
      onDeleteEvent={handleOnDeleteEvent}
    />
  );
}
