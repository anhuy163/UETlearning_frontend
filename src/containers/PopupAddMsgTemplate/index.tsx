import PopupAddMsgTemplate from "@/src/components/PopupAddMsgTemplate";
export type PopupAddMsgTemplateProps = {
  open: boolean;
  onCancel: () => void;
  onOpen: () => void;
  onAddTemplate: (msg: string) => void;
  content?: string;
  onSubmit?: () => void;
};

export default function PopupAddMsgTemplateContainer({
  open,
  onCancel,
  onOpen,
  onAddTemplate,
}: PopupAddMsgTemplateProps) {
  const handleOnSubmit = (e: any) => {
    console.log(e);
    onAddTemplate(e.template);
    onCancel();
  };
  return (
    <PopupAddMsgTemplate
      open={open}
      onCancel={onCancel}
      onOpen={onOpen}
      onSubmit={handleOnSubmit}
    />
  );
}
