import { MESSAGE_FROM_TYPE } from "@/src/app/constants";
import ChatDetail from "@/src/components/ChatDetail";
import { useRouter } from "next/router";
import { useState } from "react";

export type ChatMessageType = {
  type: string;
  content: string;
};

export default function ChatDetailContainer() {
  const [dummyChat, setDummyChat] = useState<ChatMessageType[]>([
    {
      type: MESSAGE_FROM_TYPE.FRIEND,
      content: "Em chào thầy ạ",
    },
    { type: MESSAGE_FROM_TYPE.ME, content: "Chào em, có việc gì không nhỉ?" },
    {
      type: MESSAGE_FROM_TYPE.FRIEND,
      content: "Cho em hỏi là ngày mai lớp mình học bình thường chứ ạ?",
    },
    { type: MESSAGE_FROM_TYPE.ME, content: "Bình thường em nhé" },
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

  const handleOnSendMessage = (message: ChatMessageType) => {
    const msgs = [
      ...dummyChat,
      { content: message.content, type: message.type },
    ];
    setDummyChat(msgs);
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
    />
  );
}
