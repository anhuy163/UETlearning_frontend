import { MESSAGE_FROM_TYPE, SERVER_BASE_URL } from "@/src/app/constants";
import ChatDetail from "@/src/components/ChatDetail";
import { RcFile } from "antd/es/upload";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import socket from "@/src/app/socket";
import useQueryGetConversation from "@/src/app/hooks/useQueryGetConversation";
import useMutationSendMessage from "@/src/app/hooks/useMutationSendMessage";
import axios from "axios";
import { updateContactsByMsg } from "@/src/app/redux/slice/contactsSlice";
import { useAppDispatch } from "@/src/app/hooks/useRedux";
import useUploadImage from "@/src/app/hooks/useUploadImage";

export type ChatMessageType = {
  type: string;
  content: string;
  img?: string;
};

export default function ChatDetailContainer() {
  const { uploadImage } = useUploadImage();
  const router = useRouter();
  const [params, setParams] = useState(0);
  // const { data, loading, error } = useQueryGetConversation(
  //   router.query.id as string,
  //   params
  // );
  const dispatch = useAppDispatch();

  const handleOnScrollChat = () => {
    setParams((prev) => {
      return prev + 1;
    });
  };

  const {
    doMutation,
    loading: loadingSendMsg,
    error: errorSendMsg,
  } = useMutationSendMessage();
  const [messages, setMessages] = useState<any>([]);
  const [arrivalMsgs, setArrivalMsgs] = useState<any>(null);

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

  useEffect(() => {
    socket.emit(
      "add-user",
      JSON.parse(localStorage.getItem("currentUser")!)?.id
    );

    socket.on("msg-receive", (data) => {
      console.log(data);

      dispatch(
        updateContactsByMsg({
          studentId: data.senderId,
          msg: data.imgUrl ? "Hình ảnh" : data.msg,
          senderName: data.senderName,
          senderAvatar: data.senderAvatar,
          filePath: data.imgSrc,
        })
      );

      setArrivalMsgs({
        filePath: data.imgUrl,
        fromId: data.senderId,
        message: data.msg,
      });
    });

    return () => {
      socket.off("msg-receive");
    };
  }, []);

  useEffect(() => {
    arrivalMsgs &&
      setMessages((msgs: any) => {
        return [...msgs, arrivalMsgs];
      });
  }, [arrivalMsgs]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${SERVER_BASE_URL}/chat/getMessage?studentId=${
            router.query.id
          }&teacherId=${
            JSON.parse(localStorage.getItem("currentUser")!).id
          }&page=${params}&size=20`,
          { headers: { Authorization: localStorage.getItem("token") } }
        );

        setMessages((prevMsgs: any) => {
          return [...res.data.object, ...prevMsgs];
        });
        return res.data.object;
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [params]);
  // console.log(messages);

  const handleOnSendMessage = (message: ChatMessageType) => {
    if (message.content) {
      console.log(message);

      socket.emit("send-msg", {
        senderId: JSON.parse(localStorage.getItem("currentUser")!)?.id,
        senderName: JSON.parse(localStorage.getItem("currentUser")!)?.realName,
        to: router.query.id,
        msg: message.content,
        imgUrl: "",
        senderAvatar: "",
      });

      const msgs = [
        ...messages,
        {
          filePath: "",
          fromId: JSON.parse(localStorage.getItem("currentUser")!)?.id,
          message: message.content,
        },
      ];
      setMessages(msgs);
      dispatch(
        updateContactsByMsg({
          studentId: router.query.id,
          msg: message.content,
        })
      );
      doMutation({
        toId: router.query.id,
        message: message.content,
        filePath: "",
      });
    }
    return;
  };

  // const getBase64Url = (img: RcFile, callback: (url: string) => void) => {
  //   const reader = new FileReader();

  //   reader.addEventListener("load", () => callback(reader.result as string));
  //   reader.readAsDataURL(img);
  // };

  const handleOnSendImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = event.target.files?.[0] as File;
    if (file && file.type.startsWith("image/")) {
      dispatch(
        updateContactsByMsg({
          studentId: router.query.id,
          msg: "Hình ảnh",
        })
      );
      uploadImage(file).then((res) => {
        doMutation({
          toId: router.query.id,
          message: "",
          filePath: (res as any).location,
        });
        socket.emit("send-msg", {
          senderId: JSON.parse(localStorage.getItem("currentUser")!)?.id,
          senderName: JSON.parse(localStorage.getItem("currentUser")!)
            ?.realName,
          to: router.query.id,
          msg: "",
          imgUrl: (res as any).location,
          senderAvatar: "",
        });
      });

      const reader = new FileReader();
      reader.onload = function (e: ProgressEvent<FileReader>) {
        const base64Url = e.target?.result as string;
        const msgs = [
          ...messages,
          { message: "", type: MESSAGE_FROM_TYPE.ME, filePath: base64Url },
        ];
        setMessages(msgs);
      };
      reader.readAsDataURL(file);
    }
  };
  // console.log(messages);

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
      handleOnScrollChat={handleOnScrollChat}
    />
  );
}
