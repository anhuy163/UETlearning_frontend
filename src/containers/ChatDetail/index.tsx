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
import { useAppDispatch, useAppSelector } from "@/src/app/hooks/useRedux";
import useUploadImage from "@/src/app/hooks/useUploadImage";
import useMutationReadChat from "@/src/app/hooks/useMutationReadChat";
import { updateUserPoints } from "@/src/app/redux/slice/userSlice";

export type ChatMessageType = {
  type: string;
  content: string;
  img?: string;
};

export default function ChatDetailContainer() {
  const { uploadImage } = useUploadImage();
  const router = useRouter();
  const [params, setParams] = useState(0);

  const contacts = useAppSelector((state) => state.contacts);
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
  const { doMutation: readChatHandler, error: readingChatError } =
    useMutationReadChat();
  const [messages, setMessages] = useState<any>([]);
  const [arrivalMsgs, setArrivalMsgs] = useState<any>(null);
  const [studentName, setStudentName] = useState("");
  const [studentAva, setStudentAva] = useState("");

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

  // console.log(contacts);

  useEffect(() => {
    const selectedContact = contacts.find(
      (item: any) => item.student.id === router.query.id
    );
    // console.log(selectedContact);

    readChatHandler(selectedContact?.id as string);
  }, [router.query.id, contacts]);

  useEffect(() => {
    socket.emit(
      "add-user",
      JSON.parse(localStorage.getItem("currentUser")!)?.id
    );

    socket.on("msg-receive", (data) => {
      // console.log(data);

      if (data.senderId === router.query.id)
        setArrivalMsgs({
          filePath: data.imgUrl,
          fromId: data.senderId,
          message: data.msg,
        });

      if (data?.senderId === router.query.id) readChatHandler(data?.senderId);
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
          // "http://learning-application.online/chat/teacher/getMessages?studentId=63f98bf0cd73033310d460c8&page=0&size=20",
          `${SERVER_BASE_URL}/chat/teacher/getMessages?studentId=${router.query.id}&page=${params}&size=20`,
          { headers: { Authorization: localStorage.getItem("token") } }
        );

        setMessages((prevMsgs: any) => {
          return [...res.data.object.messageResponses, ...prevMsgs];
        });
        // console.log(res.data.object);
        setStudentName((res as any)?.data?.object?.studentDTO?.realName);
        setStudentAva((res as any).data.object.studentDTO.avaPath);

        return res.data.object;
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [params]);

  const handleOnSendMessage = (message: ChatMessageType) => {
    if (message.content) {
      // console.log(message);
      // dispatch(updateUserPoints(5));

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
      studentName={studentName}
      studentAva={studentAva}
    />
  );
}
