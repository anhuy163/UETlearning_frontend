import { Button, Input, Tooltip, Upload } from "antd";
import {
  SendOutlined,
  InfoCircleOutlined,
  SmileOutlined,
  PlusCircleOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.less";
import UserAvatar from "../UserAvatar";
import {
  AVATAR_SIZE,
  COLORS,
  MESSAGE_FROM_TYPE,
  testAvatarSrc,
} from "@/src/app/constants";
import ChatMessage from "../ChatMessage";
import PopupStudentNoteContainer from "@/src/containers/PopupStudentNote";
import { ChatMessageType } from "@/src/containers/ChatDetail";
import EmojiPicker from "emoji-picker-react";
import PopupAddMsgTemplateContainer from "@/src/containers/PopupAddMsgTemplate";
import { useRouter } from "next/router";

type ChatDetailProps = {
  messages: [];
  templateMsgs: ChatMessageType[];
  handleOnSendMsg: (msg: ChatMessageType) => void;
  handleOnAddMsgTemplate: (msg: string) => void;
  handleOnSendImg: (upload: any) => void;
  handleOnScrollChat: () => void;
};

export default function ChatDetail({
  messages,
  handleOnSendMsg,
  templateMsgs,
  handleOnAddMsgTemplate,
  handleOnSendImg,
  handleOnScrollChat,
}: ChatDetailProps) {
  // console.log(messages);

  const router = useRouter();

  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showPopupTemplate, setShowPopupTemplate] = useState(false);
  const [toggleScrollToBottom, setToggleScrollToBottom] = useState(true);

  // useEffect(() => {
  //   messages.map((item: any) => {
  //     setMsgs((prevMsgs) => {
  //       return [
  //         ...prevMsgs,
  //         {
  //           content: item.message,
  //           type:
  //             item.fromId === router.query.id
  //               ? MESSAGE_FROM_TYPE.FRIEND
  //               : MESSAGE_FROM_TYPE.ME,
  //         },
  //       ];
  //     });
  //   });
  // }, [messages]);

  const onOpenPopupAddTemplate = () => {
    setShowPopupTemplate(true);
  };

  const onCancelPopupAddTemplate = () => {
    setShowPopupTemplate(false);
  };

  const handleShowEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const onSendMessage = () => {
    setToggleScrollToBottom(true);
    handleOnSendMsg({ content: msg, type: MESSAGE_FROM_TYPE.ME });

    setShowEmojiPicker(false);
    setMsg("");
  };
  const onSendTemplateMessage = (item: ChatMessageType) => {
    setToggleScrollToBottom(true);
    handleOnSendMsg({ content: item.content, type: item.type });
  };
  const handleEmojiClick = (emojiObject: any, event: any) => {
    // console.log(emojiObject);
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const onInputChange = (e: any) => {
    setMsg(e.target.value);
  };

  const [togglePopupNote, setTogglePopupNote] = useState(false);

  const onOpenPopupNote = () => {
    setTogglePopupNote(true);
  };
  const onClosePopupNote = () => {
    setTogglePopupNote(false);
  };
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const prevHeightRef = useRef<number | null | undefined>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSendImageBtn = () => {
    imageInputRef.current?.click();
  };
  useEffect(() => {
    const container = chatBoxRef.current;
    const newHeight = container?.scrollHeight;
    if (prevHeightRef.current && newHeight) {
      const heightDiff = newHeight - prevHeightRef.current;
      container.scrollTop += heightDiff;
    }
    prevHeightRef.current = newHeight;
  }, [messages]);

  useEffect(() => {
    if (toggleScrollToBottom && messages.length) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      setToggleScrollToBottom(false);
    }
  }, [messages, toggleScrollToBottom]);

  useEffect(() => {
    const handleOnScrollChatToTop = () => {
      if (chatBoxRef.current?.scrollTop === 0) {
        handleOnScrollChat();
      }
    };

    chatBoxRef.current &&
      chatBoxRef.current?.addEventListener("scroll", handleOnScrollChatToTop);

    return () => {
      chatBoxRef.current &&
        chatBoxRef.current?.removeEventListener(
          "scroll",
          handleOnScrollChatToTop
        );
    };
  }, [handleOnScrollChat]);

  return (
    <div
      className={clsx(
        styles.container,
        "relative w-full h-[calc(100vh_-_128px)] flex flex-col"
      )}>
      <div
        className={clsx(
          styles.chatDetailHeader,
          "px-3 py-2 bg-slate-900 rounded-t-md flex items-center justify-between"
        )}>
        <div className='flex items-center'>
          <UserAvatar
            name='An Huy'
            size={AVATAR_SIZE.AVERAGE}
            imgSrc={testAvatarSrc}
          />
          <p className='font-mono text-2xl font-bold ml-3 text-cyan-600'>
            An Huy
          </p>
        </div>
        <p className='text-white text-2xl flex items-center'>
          <Tooltip
            title='Thông tin & Ghi chú'
            placement='left'
            color={COLORS.CYAN600}
            key={COLORS.CYAN600}>
            <InfoCircleOutlined onClick={onOpenPopupNote} />
          </Tooltip>
        </p>
      </div>
      <div
        ref={chatBoxRef}
        className={clsx(
          styles.chatDetailContent,
          "p-2 min-w-full min-h-[calc(100vh_-_500px)] flex-1 overflow-x-hidden"
        )}>
        {messages?.map((item: any, index: any) => {
          return (
            <div key={index} ref={scrollRef}>
              <ChatMessage
                type={
                  item.fromId === router.query.id
                    ? MESSAGE_FROM_TYPE.FRIEND
                    : MESSAGE_FROM_TYPE.ME
                }
                content={item.message}
                img={item?.img}
              />
            </div>
          );
        })}
      </div>
      <div className='absolute left-1 bottom-16 z-10'>
        {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
      </div>
      <div
        className={clsx(
          styles.chatDetailFooter,
          "min-h-[80px] min-w-full  py-2 px-4  rounded-b-md border-t-[1px] border-blue-100 "
        )}>
        <div className='flex items-center w-full pb-2  min-h-fit '>
          <div className='flex items-center overflow-scroll w-[calc(100%_-_52px)] pb-2'>
            {templateMsgs?.map((item: ChatMessageType, index: any) => {
              return (
                <Button
                  onClick={() => onSendTemplateMessage(item)}
                  className='mr-2 bg-cyan-600 text-white border-none opacity-80 hover:opacity-100 flex items-center rounded-[25px]'
                  key={index}>
                  {item.content}
                </Button>
              );
            })}
          </div>
          <div className='pb-3'>
            <Tooltip placement='top' title='Thêm mẫu tin nhắn'>
              <Button
                onClick={onOpenPopupAddTemplate}
                className='ml-2 bg-slate-900 text-white border-none opacity-80 hover:opacity-100 flex items-center'>
                <PlusCircleOutlined />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div
          className={clsx(
            styles.chatDetailFooter,
            " min-w-full   rounded-b-md  flex items-center"
          )}>
          <div className={clsx(styles.emoji)}>
            <Button
              onClick={handleShowEmojiPicker}
              className='mr-2 bg-slate-900 text-white border-none opacity-80 hover:opacity-100 flex items-center'>
              <SmileOutlined />
            </Button>
          </div>
          <Button
            onClick={handleSendImageBtn}
            className='mr-2 bg-slate-900 text-white border-none opacity-80 hover:opacity-100 flex items-center'>
            <FileImageOutlined />
          </Button>

          <input
            ref={imageInputRef}
            style={{ display: "none" }}
            title=''
            type='file'
            onChange={handleOnSendImg}
            accept='image/jpg, image/png, image/jpeg'
          />

          {/* <Upload
            onChange={handleOnSendImg}
            showUploadList={false}
            accept='image/jpg, image/png, image/jpeg'>
            <Button
              // onClick={handleShowEmojiPicker}
              className='mr-2 bg-cyan-600 text-white border-none opacity-80 hover:opacity-100 flex items-center'>
              <FileImageOutlined />
            </Button>
          </Upload> */}
          <Input.TextArea
            value={msg}
            onChange={onInputChange}
            placeholder='Nhập tin nhắn ...'
            autoSize={{ minRows: 1, maxRows: 4 }}
          />

          <Button
            onClick={onSendMessage}
            className='ml-2 bg-slate-900 text-white border-none opacity-80 hover:opacity-100 flex items-center'>
            <SendOutlined />
          </Button>
        </div>
      </div>
      <PopupStudentNoteContainer
        onCancel={onClosePopupNote}
        onOpen={onOpenPopupNote}
        open={togglePopupNote}
      />
      <div>
        <PopupAddMsgTemplateContainer
          open={showPopupTemplate}
          onCancel={onCancelPopupAddTemplate}
          onOpen={onOpenPopupAddTemplate}
          onAddTemplate={handleOnAddMsgTemplate}
        />
      </div>
    </div>
  );
}
