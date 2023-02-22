import { Button, Input, Tooltip } from "antd";
import {
  SendOutlined,
  InfoCircleOutlined,
  SmileOutlined,
  PlusCircleOutlined,
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

type ChatDetailProps = {
  messages: ChatMessageType[];
  templateMsgs: ChatMessageType[];
  handleOnSendMsg: (msg: ChatMessageType) => void;
  handleOnAddMsgTemplate: (msg: string) => void;
};

export default function ChatDetail({
  messages,
  handleOnSendMsg,
  templateMsgs,
  handleOnAddMsgTemplate,
}: ChatDetailProps) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showPopupTemplate, setShowPopupTemplate] = useState(false);

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
    handleOnSendMsg({ content: msg, type: MESSAGE_FROM_TYPE.ME });
    setShowEmojiPicker(false);
    setMsg("");
  };
  const onSendTemplateMessage = (item: ChatMessageType) => {
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
  const chatBoxRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   // console.log(chatBoxRef.current?.scrollHeight);

  //   chatBoxRef.current?.scrollTo(0, chatBoxRef.current?.scrollHeight);
  // }, [chatBoxRef]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
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
        ref={chatBoxRef as React.RefObject<HTMLDivElement>}
        className={clsx(
          styles.chatDetailContent,
          "p-2 min-w-full min-h-[calc(100vh_-_500px)] flex-1 overflow-x-hidden"
        )}>
        {messages?.map((item, index: any) => {
          return (
            <div key={index} ref={scrollRef}>
              <ChatMessage type={item.type} content={item.content} />
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
          <div className='pb-2'>
            <Tooltip placement='top' title='Thêm mẫu tin nhắn'>
              <Button
                onClick={onOpenPopupAddTemplate}
                className='ml-2 bg-cyan-600 text-white border-none opacity-80 hover:opacity-100 flex items-center'>
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
              className='mr-2 bg-cyan-600 text-white border-none opacity-80 hover:opacity-100 flex items-center'>
              <SmileOutlined />
            </Button>
          </div>
          <Input.TextArea
            value={msg}
            onChange={onInputChange}
            placeholder='Nhập tin nhắn ...'
            autoSize={{ minRows: 1, maxRows: 4 }}
          />

          <Button
            onClick={onSendMessage}
            className='ml-2 bg-cyan-600 text-white border-none opacity-80 hover:opacity-100 flex items-center'>
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
