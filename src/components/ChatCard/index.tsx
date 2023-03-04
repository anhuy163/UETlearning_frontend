import {} from "antd";
import React from "react";
import UserAvatar from "../UserAvatar";
import {} from "@ant-design/icons";
import { AVATAR_SIZE, MESSAGE_PATH } from "@/src/app/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import styles from "./styles.module.less";

type ChatCardProps = {
  name: string;
  lastMessage: string;
  chatId: string;
  read: boolean;
};
export default function ChatCard({
  name,
  lastMessage,
  chatId,
  read,
}: ChatCardProps) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Link href={`${MESSAGE_PATH}/${chatId}`}>
      <div
        className={clsx(
          id === chatId
            ? "bg-gray-500"
            : read
            ? "hover:bg-slate-800 transition-all ease-in duration-100"
            : "bg-slate-800",
          "flex items-center rounded-md w-[100%] p-2 mb-2 ",
          styles.container
        )}>
        <div className='min-w-[50px]'>
          <UserAvatar size={AVATAR_SIZE.SMALL} name={name} />
        </div>
        <div className='ml-3 min-w-[calc(100%_-_50px)]'>
          <p
            className={clsx(
              id === chatId
                ? "text-xl text-white font-mono font-bold max-w-[206px]"
                : "text-xl text-gray-400 font-mono max-w-[206px]",
              styles.chatName
            )}>
            {name}
          </p>
          <p
            className={clsx(
              id === chatId
                ? "font-light text-gray-50 max-w-[100%]"
                : read
                ? " text-gray-500 max-w-[206px]"
                : "text-white font-semibold",
              styles.chatContent
            )}>
            {!read && id !== chatId ? "Tin nhắn mới" : lastMessage}
          </p>
        </div>
      </div>
    </Link>
  );
}
