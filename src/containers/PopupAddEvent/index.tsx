import PopupAddEvent from "@/src/components/PopupAddEvent";
import moment from "moment";
import { useEffect, useState } from "react";
import useQueryGetEventById from "@/src/app/hooks/useQueryGetEventById";
import useMutationDeleteEventById from "@/src/app/hooks/useMutationDeleteEventById";
import useMutationAddEvent from "@/src/app/hooks/useMutationAddEvent";
import { showErrorMessage } from "@/src/app/helpers/messageHelper";
import { ERROR_MESSAGE } from "@/src/app/constants";
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
  const [disableButton, setDisableButton] = useState(true);

  const handleOnDisableButton = (tmp: boolean) => {
    setDisableButton(tmp);
  };
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
        email: event.studentEmail || "",
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
      }).then((res: any) => {
        console.log(res);

        if (res?.code === 8) {
          showErrorMessage(ERROR_MESSAGE.UPDATE_EVENT);
          return;
        }
        setDisableButton(true);
        props.onCancel();
      });

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
      email: event.studentEmail || "",
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
    }).then((res: any) => {
      if (res?.code === 8) {
        showErrorMessage(ERROR_MESSAGE.UPDATE_EVENT);
        return;
      }
      setDisableButton(true);
      props.onCancel();
    });
    // props.onCancel();
  };

  return (
    <PopupAddEvent
      event={eventId}
      loading={gettingEvent || deletingEvent}
      {...props}
      defaultValues={eventId ? event : undefined}
      onDeleteEvent={handleOnDeleteEvent}
      onFinish={handleOnSubmitEvent}
      disableButton={disableButton}
      onDisableButton={handleOnDisableButton}
    />
  );
}
