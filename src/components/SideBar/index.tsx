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
import { AVATAR_SIZE, PROFILE_PATH } from "@/src/app/constants";
import { testAvatarSrc } from "@/src/app/constants";
import ChatCard from "../ChatCard";
import { dummnyData } from "@/src/app/constants";
import useQueryGetContacts from "@/src/app/hooks/useQueryGetContacts";
import socket from "@/src/app/socket";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/src/app/hooks/useRedux";
import { setContacts } from "@/src/app/redux/slice/contactsSlice";

const { Sider } = Layout;

export function MySideBar() {
  const { data, loading, error } = useQueryGetContacts();
  const dispatch = useAppDispatch();
  const [contacts, setContacts] = useState(data);
  useEffect(() => {
    if (data) setContacts(data);
  }, [data]);
  useEffect(() => {
    socket.on("typingMessageGet", (data) => {
      // console.log(data.senderId);
      // console.log(typeof data.senderId);
      // console.log(contacts);

      const updatedContacts: any = [...contacts];
      // console.log(updatedContacts);

      const updatedContactIndex = updatedContacts.findIndex(
        (item: any) => item.student.id === data.senderId
      );
      console.log(updatedContactIndex);
      if (updatedContactIndex !== -1) {
        updatedContacts[updatedContactIndex] = {
          ...(updatedContacts[updatedContactIndex] as any),
          lastMessage: data.msg,
        };

        setContacts(updatedContacts);
      }
    });

    return () => {
      socket.off("typingMessageGet");
    };
  }, [contacts]);

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
