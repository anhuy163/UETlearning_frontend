import PopupAddEvent from "@/src/components/PopupAddEvent";
import moment from "moment";
import { useEffect } from "react";

export type PopupAddEventProps = {
  open: boolean;
  onCancel: () => void;
  onFinish: (e: any) => void;
  eventId: string | undefined;
};

export default function PopupAddEventContainer(props: PopupAddEventProps) {
  const { eventId } = props;
  // console.log(eventId);
  const defaultValues = {
    title: "An com",
    description: "123",
    duration: [moment("2023-03-16"), moment("2023-03-18")],
  };

  return (
    <PopupAddEvent
      event={eventId}
      {...props}
      defaultValues={eventId ? defaultValues : undefined}
    />
  );
}
