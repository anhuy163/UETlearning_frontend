import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  YoutubeOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  WechatOutlined,
  NotificationOutlined,
  BellOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Badge, Drawer, Tooltip } from "antd";
import Head from "next/head";
import Link from "next/link";
import { getMenuItem } from "@/src/app/helpers/createElement";
import { useRouter } from "next/router";
import styles from "./styles.module.less";
import { MySideBar } from "@/src/components/SideBar";
import {
  HOME_PATH,
  QANDA_PATH,
  MESSAGE_PATH,
  PROFILE_PATH,
  STATISTICS_PATH,
  LOGIN_PATH,
} from "@/src/app/constants";
import NotificationPopupContainer from "../NotificationPopupContainer";

type LayoutProps = {
  title: string;
  children: ReactNode;
};

const { Header, Content, Footer, Sider } = Layout;

export default function LayoutContainer({ children, title }: LayoutProps) {
  const [togglePopupNoti, setTogglePopupNoti] = useState(false);

  const ref = useRef(null);

  const onToggleNotiPopup = () => {
    setTogglePopupNoti((prevState) => {
      return !prevState;
    });
  };
  const router = useRouter();

  const handleOnDirect = (link = "") => {
    router.push(link);
  };
  const menuItems = [
    // getMenuItem(
    //   <Link href={PROFILE_PATH}>Account</Link>,
    //   "/me",
    //   <UserOutlined />
    // ),
    getMenuItem(
      <Link href={"/message"}>Trò chuyện</Link>,
      "/message",
      <WechatOutlined />
    ),
    getMenuItem(
      // <Button icon={<BarChartOutlined />}>Thống kê</Button>,
      <Link href={STATISTICS_PATH}>Thống kê</Link>,
      "/statistics",
      <BarChartOutlined />
    ),
    getMenuItem(
      <Link href={QANDA_PATH}>Hỏi đáp</Link>,
      "/q-and-a",
      <QuestionCircleOutlined />
    ),
    // getMenuItem(
    //   <button onClick={onToggleNotiPopup}>Thông báo</button>,
    //   null,
    //   <Badge count={40} size='small' overflowCount={9}>
    //     <BellOutlined />
    //   </Badge>
    // ),
    // getMenuItem(
    //   <button onClick={() => router.push(LOGIN_PATH)}>Log out</button>,
    //   null,
    //   <LogoutOutlined />
    // ),
  ];

  const handleClickOutsideNoti = () => {
    setTogglePopupNoti(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideNoti, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideNoti, true);
    };
  }, []);

  // console.log(router.pathname);
  return (
    <>
      <div className={styles.layoutContainer}>
        <Head>
          <title>{title}</title>
        </Head>
        <Layout>
          <Layout>
            <Header>
              <div className='flex items-center justify-between min-w-full'>
                <div className='flex items-center justify-center text-2xl font-bold text-slate-900 w-48'>
                  <Link href={"/"}>UET learning</Link>
                </div>
                <div className=' flex items-center justify-between pr-8 w-[30%]'>
                  <div className='w-[80%]'>
                    <Menu
                      defaultSelectedKeys={[
                        `/${router.pathname.split("/")[1]}`,
                      ]}
                      mode='horizontal'
                      // items={menuItems}
                    >
                      <Menu.Item
                        icon={<WechatOutlined />}
                        key={MESSAGE_PATH}
                        onClick={() => handleOnDirect(MESSAGE_PATH)}>
                        Tin nhắn
                      </Menu.Item>
                      <Menu.Item
                        icon={<PieChartOutlined />}
                        key={STATISTICS_PATH}
                        onClick={() => handleOnDirect(STATISTICS_PATH)}>
                        Thống kê
                      </Menu.Item>
                      <Menu.Item
                        icon={<QuestionCircleOutlined />}
                        key={QANDA_PATH}
                        onClick={() => handleOnDirect(QANDA_PATH)}>
                        Hỏi & đáp
                      </Menu.Item>
                    </Menu>
                  </div>
                  <div className='text-2xl w-24 flex justify-between items-center'>
                    <div>
                      <Badge count={99} overflowCount={9}>
                        <button onClick={onToggleNotiPopup}>
                          {<BellOutlined />}
                        </button>
                      </Badge>
                    </div>
                    <Tooltip title='Đăng xuất' placement='bottom'>
                      <button onClick={() => router.push(LOGIN_PATH)}>
                        <LogoutOutlined />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Header>
            <Layout>
              <MySideBar />
              <div className='h-[calc(100vh_-_64px)] overflow-auto overflow-x-hidden px-3 bg-slate-200 w-full'>
                {children}
              </div>
            </Layout>
          </Layout>
        </Layout>
      </div>

      {togglePopupNoti && (
        <div ref={ref}>
          <NotificationPopupContainer />
        </div>
      )}
    </>
  );
}
