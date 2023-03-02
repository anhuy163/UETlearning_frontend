import { MESSAGE_FROM_TYPE } from "@/src/app/constants";
import ChatDetail from "@/src/components/ChatDetail";
import { RcFile } from "antd/es/upload";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import socket from "@/src/app/socket";
import useQueryGetConversation from "@/src/app/hooks/useQueryGetConversation";
import useMutationSendMessage from "@/src/app/hooks/useMutationSendMessage";

export type ChatMessageType = {
  type: string;
  content: string;
  img?: string;
};

export default function ChatDetailContainer() {
  const router = useRouter();
  const { data, loading, error } = useQueryGetConversation(
    router.query.id as string
  );
  const {
    doMutation,
    loading: loadingSendMsg,
    error: errorSendMsg,
  } = useMutationSendMessage();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [arrivalMsgs, setArrivalMsgs] = useState<ChatMessageType | null>(null);

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

  // console.log(data);
  // console.log(messages);
  useEffect(() => {
    socket.emit("add-user", "63fb30a5674a2e63cc6939ff");

    socket.on("msg-receive", (data) => {
      console.log(data);

      setArrivalMsgs({ content: data.msg, type: MESSAGE_FROM_TYPE.FRIEND });
    });

    return () => {
      socket.off("msg-receive");
    };
  }, []);
  console.log(arrivalMsgs);

  useEffect(() => {
    arrivalMsgs &&
      setMessages((msgs) => {
        return [
          ...msgs,
          { content: arrivalMsgs.content, type: MESSAGE_FROM_TYPE.FRIEND },
        ];
      });
  }, [arrivalMsgs]);

  useEffect(() => {
    data?.map((item: any) => {
      setMessages((prevMsgs) => {
        return [
          ...prevMsgs,
          {
            content: item.message,
            type:
              item.fromId === router.query.id
                ? MESSAGE_FROM_TYPE.FRIEND
                : MESSAGE_FROM_TYPE.ME,
          },
        ];
      });
    });
  }, [data]);

  const handleOnSendMessage = (message: ChatMessageType) => {
    socket.emit("send-msg", {
      senderId: "63fb30a5674a2e63cc6939ff",
      senderName: JSON.parse(localStorage.getItem("currentUser")!)?.realName,
      to: router.query.id,
      msg: message.content,
      imgUrl: "",
      senderAvatar: "",
    });
    const msgs = [
      ...messages,
      { content: message.content, type: message.type },
    ];
    setMessages(msgs);
    doMutation({
      toId: router.query.id,
      message: message.content,
      filePath: "",
    });
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
      // socket.emit("send-msg", {
      //   from: "63fb30a5674a2e63cc6939ff",
      //   to: "63f9ac55fa37d37801026d66",
      //   msg: "123",
      // });
      const reader = new FileReader();
      reader.onload = function (e: ProgressEvent<FileReader>) {
        const base64Url = e.target?.result as string;
        const msgs = [
          ...messages,
          { content: "", type: MESSAGE_FROM_TYPE.ME, img: base64Url },
        ];
        setMessages(msgs);
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
      messages={messages}
      handleOnSendMsg={handleOnSendMessage}
      templateMsgs={dummyTemplate}
      handleOnAddMsgTemplate={handleOnAddMsgTemplate}
      handleOnSendImg={handleOnSendImg}
    />
  );
}
