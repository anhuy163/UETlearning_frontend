import PopupStudentNote from "@/src/components/PopupStudentNote";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const handleOnSubmit = (e: any) => {
    console.log({
      id: router.query.id,
      note: e.note,
    });
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
