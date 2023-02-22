import PopupStudentNote from "@/src/components/PopupStudentNote";

export type PopupStudentNoteProps = {
  open: boolean;
  onCancel: () => void;
  onOpen: () => void;
  content?: string;
  onSubmit?: (e: any) => void;
};

export default function PopupStudentNoteContainer({
  open,
  onCancel,
  onOpen,
}: PopupStudentNoteProps) {
  const handleOnSubmit = (e: any) => {
    console.log(e);
  };
  return (
    <PopupStudentNote
      open={open}
      onCancel={onCancel}
      onOpen={onOpen}
      onSubmit={handleOnSubmit}
    />
  );
}
