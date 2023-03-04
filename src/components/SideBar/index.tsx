import { Layout, Menu, Switch, Tooltip } from "antd";
import { getMenuItem } from "@/src/app/helpers/createElement";
import {
  MessageOutlined,
  UserOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.less";
import UserAvatar from "../UserAvatar";
import {
  AVATAR_SIZE,
  PROFILE_PATH,
  SERVER_BASE_URL,
} from "@/src/app/constants";
import { testAvatarSrc } from "@/src/app/constants";
import ChatCard from "../ChatCard";
import { dummnyData } from "@/src/app/constants";
import useQueryGetContacts from "@/src/app/hooks/useQueryGetContacts";
import socket from "@/src/app/socket";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks/useRedux";
import {
  setContacts,
  updateContactsByMsg,
} from "@/src/app/redux/slice/contactsSlice";
import axios from "axios";

const { Sider } = Layout;

export function MySideBar() {
  const { data, loading, error } = useQueryGetContacts();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contacts);
  // console.log(contacts);

  const getContactsData = async () => {
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/chat/teacher`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      dispatch(setContacts(res.data.object));
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(contacts);

  useEffect(() => {
    getContactsData();
    // if (data.length) {
    //   // setContactsState(data);
    //   dispatch(setContacts(data));
    // }
  }, []);
  useEffect(() => {
    socket.on("typingMessageGet", (data) => {
      console.log(data);

      dispatch(
        updateContactsByMsg({
          studentId: data.senderId,
          msg: data.msg,
          senderName: data.senderName,
          senderAvatar: data.senderAvatar,
        })
      );
    });

    return () => {
      socket.off("typingMessageGet");
    };
  }, []);

  return (
    <Sider className={styles.sider}>
      <div className='flex items-center justify-cener pt-4 pl-6'>
        <UserAvatar
          link={PROFILE_PATH}
          size={AVATAR_SIZE.AVERAGE}
          imgSrc={testAvatarSrc}
          name='ấ'
        />
        <div className='pl-3'>
          <div className='font-mono text-white text-xl '>Bakugo Katsuki </div>
          <div className='font-mono text-slate-300 text-xs'>1234 Points</div>
          <div className={styles.activeContainer}>
            {/* <Tooltip title='Trạng thái của bạn' placement='right'> */}
            <Switch
              loading={false}
              checkedChildren='Online'
              unCheckedChildren='Offline'
            />
            {/* </Tooltip> */}
          </div>
        </div>
      </div>

      {/* <Menu
        theme='dark'
        items={menuItems}
        defaultSelectedKeys={[router.pathname]}
        mode='inline'
      /> */}
      <div className='w-full p-2 mt-4 '>
        <div className='flex items-center text-white mb-3 text-xl pl-2'>
          <UserOutlined />
          <p className='ml-2'>
            <Link href={PROFILE_PATH}>Hồ sơ cá nhân</Link>
          </p>
        </div>
        <div className='flex items-center text-white mb-3 text-xl pl-2'>
          <MessageOutlined />
          <p className='ml-2'> Liên hệ gần đây</p>
        </div>
        <div className='overflow-y-hidden hover:overflow-y-scroll max-h-[calc(100vh_-_350px)] overflow-x-hidden bg-slate-900'>
          {!loading &&
            contacts?.map((item: any) => {
              return (
                <ChatCard
                  key={item.id}
                  name={item.student.realName}
                  chatId={item.student.id}
                  lastMessage={item.lastMessage}
                />
              );
            })}
        </div>
      </div>
    </Sider>
  );
}
