import PopupStudentNote from "@/src/components/PopupStudentNote";
import { useRouter } from "next/router";
import useMutationReport from "@/src/app/hooks/useMutationReport";
import { showErrorMessage, showSuccessfulMessage } from "@/src/app/helpers/messageHelper";
import { ERROR_MESSAGE, SUCCESSFUL_MESSAGE } from "@/src/app/constants";

export type PopupStudentNoteProps = {
  open: boolean;
  onCancel: () => void;
  onOpen: () => void;
  loading: boolean;
  content?: string;
  onSubmit?: (e: any) => void;
};

export default function PopupStudentNoteContainer({
  open,
  onCancel,
  onOpen,
}: PopupStudentNoteProps) {
  const {loading, doMutation} = useMutationReport()
  const router = useRouter();
  const handleOnSubmit = (e: any) => {
    console.log({
      id: router.query.id,
      note: e.note,
    });
    doMutation({
      toId: router.query.id,
      title: e.title,
      value: e.note
    }).then((res: any) => {
      console.log(res)
      if (res.code === 0) {
        showSuccessfulMessage(SUCCESSFUL_MESSAGE.REPORT)
      setTimeout(() => onCancel(), 200)
      }
      else showErrorMessage(ERROR_MESSAGE.REPORT)
    })
  };
  return (
    <PopupStudentNote
      open={open}
      onCancel={onCancel}
      onOpen={onOpen}
      onSubmit={handleOnSubmit}
      loading={loading}
    />
  );
}
