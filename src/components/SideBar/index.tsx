import { Layout, Menu, Switch, Tooltip } from "antd";
import { getMenuItem } from "@/src/app/helpers/createElement";
import { UserOutlined, WechatOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.less";
import UserAvatar from "../UserAvatar";
import { AVATAR_SIZE, PROFILE_PATH } from "@/src/app/constants";
import { testAvatarSrc } from "@/src/app/constants";
import ChatCard from "../ChatCard";
import { dummnyData } from "@/src/app/constants";

const { Sider } = Layout;

export function MySideBar() {
  const router = useRouter();
  const menuItems = [
    getMenuItem("Gần đây", "sub1", <UserOutlined />, [
      getMenuItem("Tom", "3"),
      getMenuItem("Bill", "4"),
      getMenuItem("Alex", "5"),
    ]),
  ];
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
      <div className='w-full p-2 mt-4'>
        <div className='flex items-center text-white mb-3 text-xl pl-2'>
          <UserOutlined />
          <p className='ml-2'> Liên hệ gần đây</p>
        </div>
        {dummnyData?.map((item) => (
          <ChatCard
            key={item.id}
            name={item?.name}
            lastMessage={item?.lastMessage}
            chatId={item?.id}
          />
        ))}
      </div>
    </Sider>
  );
}
