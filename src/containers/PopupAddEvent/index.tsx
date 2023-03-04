import PopupAddEvent from "@/src/components/PopupAddEvent";

export type PopupAddEventProps = {
  open: boolean;
  onCancel: () => void;
  onFinish: (e: any) => void;
};

export default function PopupAddEventContainer(props: PopupAddEventProps) {
  return <PopupAddEvent {...props} />;
}
