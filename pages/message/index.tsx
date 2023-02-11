import React from "react";
import LayoutContainer from "@/src/containers/Layout";
import { useRouter } from "next/router";
import ChatDetailContainer from "@/src/containers/ChatDetail";
import MyBreadcrumb from "@/src/components/MyBreadcrumb";
import { MESSAGE_PATH } from "@/src/app/constants";
import styles from "../../styles/styles.module.less";
import clsx from "clsx";

export default function ChatPage() {
  return (
    <LayoutContainer title='Tin nhắn'>
      <div>
        <MyBreadcrumb path={MESSAGE_PATH} />
        <div className='w-full min-h-[calc(100vh_-_128px)] bg-white rounded-md flex items-center justify-center text-center'>
          <div>
            <div
              className={clsx(
                styles.text1,
                "text-[40px] font-mono font-bold text-cyan-900 m-auto w-full"
              )}>
              {" Chào mừng đến với mục tin nhắn"}
            </div>
            <div className={clsx(styles.text2)}>
              {
                "Hãy chọn ở menu bên trái (nếu có) để tiếp tục cuộc hội thoại nhé"
              }{" "}
            </div>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
}
