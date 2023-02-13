import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./styles.module.less";
import UserAvatar from "../UserAvatar";
import {
  AVATAR_SIZE,
  MESSAGE_FROM_TYPE,
  testAvatarSrc,
} from "@/src/app/constants";
import ChatMessage from "../ChatMessage";

export default function ChatDetail() {
  const chatBoxRef = useRef<HTMLElement>(null);
  useEffect(() => {
    console.log(chatBoxRef.current?.scrollHeight);

    chatBoxRef.current?.scrollTo(0, chatBoxRef.current?.scrollHeight);
  }, [chatBoxRef]);
  return (
    <div
      className={clsx(
        styles.container,
        "relative w-full h-[calc(100vh_-_128px)] flex flex-col"
      )}>
      <div
        className={clsx(
          styles.chatDetailHeader,
          "px-3 py-2 bg-slate-900 rounded-t-md flex items-center"
        )}>
        {/* <div className={clsx("flex items-center ")}> */}
        <UserAvatar
          name='An Huy'
          size={AVATAR_SIZE.AVERAGE}
          imgSrc={testAvatarSrc}
        />
        <p className='font-mono text-2xl font-bold ml-3 text-cyan-600'>
          An Huy
        </p>
        {/* </div> */}
      </div>
      <div
        ref={chatBoxRef as React.RefObject<HTMLDivElement>}
        className={clsx(
          styles.chatDetailContent,
          "p-2 min-w-full min-h-[calc(100vh_-_500px)] flex-1 overflow-auto"
        )}>
        <ChatMessage type={MESSAGE_FROM_TYPE.FRIEND} content='123' />

        <ChatMessage
          type={MESSAGE_FROM_TYPE.ME}
          content='blog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉblog của giáo viên có đăng ảnh đc k nhỉ'
        />
        <ChatMessage typing={true} type={MESSAGE_FROM_TYPE.ME} />
      </div>
      <div
        className={clsx(
          styles.chatDetailFooter,
          "min-h-[60px] min-w-full  py-2 px-4  rounded-b-md border-t-[1px] border-blue-100 flex items-center"
        )}>
        <Input.TextArea
          placeholder='Nhập tin nhắn ...'
          autoSize={{ minRows: 1, maxRows: 4 }}
        />
        <Button className='ml-2 bg-cyan-600 text-white border-none opacity-80 hover:opacity-100 flex items-center'>
          <SendOutlined />
        </Button>
      </div>
    </div>
  );
}

{
  /* <div className='container'>
  <div className='header'></div>
  <div className='content'></div>
  <div className='footer'></div>
</div>; */
}
