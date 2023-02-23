import { MESSAGE_FROM_TYPE } from "@/src/app/constants";
import ChatDetail from "@/src/components/ChatDetail";
import { RcFile } from "antd/es/upload";
import { useRouter } from "next/router";
import { useState } from "react";

export type ChatMessageType = {
  type: string;
  content: string;
  img?: string;
};

export default function ChatDetailContainer() {
  const [dummyChat, setDummyChat] = useState<ChatMessageType[]>([
    {
      type: MESSAGE_FROM_TYPE.FRIEND,
      content: "Em chào thầy ạ",
      img: "",
    },
    {
      type: MESSAGE_FROM_TYPE.ME,
      content: "Chào em, có việc gì không nhỉ?",
      img: "",
    },
    {
      type: MESSAGE_FROM_TYPE.FRIEND,
      content: "Cho em hỏi là ngày mai lớp mình học bình thường chứ ạ?",
      img: "",
    },
    { type: MESSAGE_FROM_TYPE.ME, content: "Bình thường em nhé", img: "" },
    {
      type: MESSAGE_FROM_TYPE.FRIEND,
      content: "Em cảm ơn thầy ạ",
    },
  ]);
  const [dummyTemplate, setDummyTemplate] = useState<ChatMessageType[]>([
    {
      type: MESSAGE_FROM_TYPE.ME,
      content: "Thầy chào em nhé",
    },
    { type: MESSAGE_FROM_TYPE.ME, content: "Chào em, có việc gì không nhỉ?" },
    {
      type: MESSAGE_FROM_TYPE.ME,
      content: "Thông báo lớp mai nghỉ học em nhé",
    },
    { type: MESSAGE_FROM_TYPE.ME, content: "Bình thường em nhé" },
    {
      type: MESSAGE_FROM_TYPE.ME,
      content: "Chúc em học tốt",
    },
  ]);
  const router = useRouter();

  const [fileSelected, setFileSelected] = useState(false);

  const handleOnSendMessage = (message: ChatMessageType) => {
    const msgs = [
      ...dummyChat,
      { content: message.content, type: message.type },
    ];
    setDummyChat(msgs);
  };

  const getBase64Url = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleOnSendImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(upload.file.originFileObj);
    const file: File = event.target.files?.[0] as File;
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e: ProgressEvent<FileReader>) {
        const base64Url = e.target?.result as string;
        const msgs = [
          ...dummyChat,
          { content: "", type: MESSAGE_FROM_TYPE.ME, img: base64Url },
        ];
        setDummyChat(msgs);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOnAddMsgTemplate = (msg: string) => {
    const templates = [
      ...dummyTemplate,
      { content: msg, type: MESSAGE_FROM_TYPE.ME },
    ];
    setDummyTemplate(templates);
  };

  return (
    <ChatDetail
      messages={dummyChat}
      handleOnSendMsg={handleOnSendMessage}
      templateMsgs={dummyTemplate}
      handleOnAddMsgTemplate={handleOnAddMsgTemplate}
      handleOnSendImg={handleOnSendImg}
    />
  );
}
