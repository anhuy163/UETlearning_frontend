import PopupAddEvent from "@/src/components/PopupAddEvent";
import moment from "moment";
import { useEffect } from "react";
import useQueryGetEventById from "@/src/app/hooks/useQueryGetEventById";
import useMutationDeleteEventById from "@/src/app/hooks/useMutationDeleteEventById";
import useMutationAddEvent from "@/src/app/hooks/useMutationAddEvent";
export type PopupAddEventProps = {
  open: boolean;
  onCancel: () => void;
  eventId: string | undefined;
};

export default function PopupAddEventContainer(props: PopupAddEventProps) {
  const { doMutation: onAddEvent, loading: addingEvent } =
    useMutationAddEvent();
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

  const handleOnSubmitEvent = (event: any) => {
    if (event.scheduleId) {
      console.log(event);

      // console.log({
      //   scheduleId: event.scheduleId,
      //   title: event.title,
      //   data: event.description || "",

      //   time: [
      //     moment(event?.duration[0]?._d).format("YYYY-MM-DD HH:mm:ss"),
      //     moment(event?.duration[1]?._d).format("YYYY-MM-DD HH:mm:ss"),
      //   ],
      // });

      onAddEvent({
        scheduleId: event.scheduleId,
        title: event.title,
        data: event.description || "",

        time: [
          moment(
            event?.duration[0]?._d
              ? event?.duration[0]?._d
              : event?.duration[0]?.$d
          ).format("YYYY-MM-DD HH:mm:ss"),
          moment(
            event?.duration[1]?._d
              ? event?.duration[1]?._d
              : event?.duration[1]?.$d
          ).format("YYYY-MM-DD HH:mm:ss"),
        ],
      });
      props.onCancel();
      return;
    }
    // console.log({
    //   title: event.title,
    //   data: event.description || "",
    //   time: [
    //     moment(event?.duration[0]?._d).format("YYYY-MM-DD HH:mm:ss"),
    //     moment(event?.duration[1]?._d).format("YYYY-MM-DD HH:mm:ss"),
    //   ],
    // });
    onAddEvent({
      title: event.title,
      data: event.description || "",
      time: [
        moment(
          event?.duration[0]?._d
            ? event?.duration[0]?._d
            : event?.duration[0]?.$d
        ).format("YYYY-MM-DD HH:mm:ss"),
        moment(
          event?.duration[1]?._d
            ? event?.duration[1]?._d
            : event?.duration[1]?.$d
        ).format("YYYY-MM-DD HH:mm:ss"),
      ],
    });
    props.onCancel();
  };

  // console.log(eventId);

  return (
    <PopupAddEvent
      event={eventId}
      loading={gettingEvent || deletingEvent}
      {...props}
      defaultValues={eventId ? event : undefined}
      onDeleteEvent={handleOnDeleteEvent}
      onFinish={handleOnSubmitEvent}
    />
  );
}
