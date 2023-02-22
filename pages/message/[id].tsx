import React from "react";
import LayoutContainer from "@/src/containers/Layout";
import { useRouter } from "next/router";
import ChatDetailContainer from "@/src/containers/ChatDetail";
import MyBreadcrumb from "@/src/components/MyBreadcrumb";
import { MESSAGE_PATH } from "@/src/app/constants";

export default function ChatDetailPage() {
  return (
    <LayoutContainer title='Tin nhắn'>
      <div>
        <MyBreadcrumb path={MESSAGE_PATH} />
        {/* <div className='w-full flex justify-between'>
          <div className='min-h-[calc(100vh_-_128px)] bg-white rounded-md w-[75%]'>
            <ChatDetailContainer />
          </div>
          <div className='min-h-[calc(100vh_-_128px)] bg-white rounded-md w-[24%] p-3'>
            123
          </div>
        </div> */}
        <div className='w-full min-h-[calc(100vh_-_128px)] bg-white rounded-md'>
          <ChatDetailContainer />
        </div>
      </div>
    </LayoutContainer>
  );
}
