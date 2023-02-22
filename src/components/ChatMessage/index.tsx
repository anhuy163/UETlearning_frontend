import { MESSAGE_FROM_TYPE } from "@/src/app/constants";
import clsx from "clsx";
import React from "react";
import styles from "./styles.module.less";

type ChatMessageProps = {
  type: string;
  content?: string;
  typing?: boolean;
};

export default function ChatMessage({
  type,
  content,
  typing = false,
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
      <div className='max-w-[800px] rounded-xl bg-slate-500 text-base text-white p-2 break-words'>
        {content}
      </div>
    </div>
  ) : (
    <div className='flex flex-row-reverse w-full mb-1'>
      <div className='max-w-[800px] rounded-xl bg-cyan-500 text-base text-white p-2 break-words'>
        {" "}
        {content}
      </div>
    </div>
  );
}
