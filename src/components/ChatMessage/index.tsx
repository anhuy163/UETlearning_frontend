import { MESSAGE_FROM_TYPE } from "@/src/app/constants";
import clsx from "clsx";
import React from "react";
import styles from "./styles.module.less";
import { Image } from "antd";

type ChatMessageProps = {
  type: string;
  img?: string;
  content?: string;
  typing?: boolean;
};

export default function ChatMessage({
  type,
  content,
  typing = false,
  img = undefined,
}: ChatMessageProps) {
  return typing ? (
    <div
      className={clsx(
        styles.typingMessage,
        "w-24 p-3 bg-slate-500 flex items-center justify-around rounded-xl relative"
      )}>
      <div
        className={clsx(
          "bg-white rounded-full p-1 relative",
          styles.dot
        )}></div>
      <div
        className={clsx(
          "bg-white rounded-full p-1 relative",
          styles.dot
        )}></div>
      <div
        className={clsx(
          "bg-white rounded-full p-1 relative",
          styles.dot
        )}></div>
    </div>
  ) : type === MESSAGE_FROM_TYPE.FRIEND ? (
    <div className='flex mb-1 w-full  '>
      {!!img ? (
        <div
          className={clsx(
            styles.imgContainer,
            "rounded-xl bg-cyan-500 p-1 flex items-center justify-center"
          )}>
          <Image
            alt='message'
            src={img}
            className='w-[400px] h-[400px] object-contain'
          />
        </div>
      ) : (
        <div className='max-w-[800px] rounded-xl bg-slate-500 text-base text-white p-2 break-words'>
          {content}
        </div>
      )}
    </div>
  ) : (
    <div className='flex flex-row-reverse w-full mb-1'>
      {!!img ? (
        <div
          className={clsx(
            styles.imgContainer,
            "rounded-xl bg-cyan-500 p-1 flex items-center justify-center"
          )}>
          <Image
            alt='message'
            src={img}
            // className='w-[400px] h-[400px] object-contain'
            // style={{
            //   height: "300px",
            //   objectFit: "contain",
            //   borderRadius: "4px",
            // }}
          />
        </div>
      ) : (
        // </div>
        <div className='max-w-[800px] rounded-xl bg-cyan-500 text-base text-white p-2 break-words'>
          {content}
        </div>
      )}
    </div>
  );
}
