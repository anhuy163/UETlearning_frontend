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
  UploadOutlined,
  ArrowUpOutlined,
  DollarCircleOutlined,
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
  NOTIFICATION_PATH,
  PAYMENT_PATH,
} from "@/src/app/constants";
import NotificationPopupContainer from "../NotificationPopupContainer";
import useAuth from "@/src/app/hooks/useAuth";
import clsx from "clsx";
import logo_src from "../../app/assets/app_logo.png";
import Image from "next/image";

type LayoutProps = {
  title: string;
  children: ReactNode;
};

const { Header, Content, Footer, Sider } = Layout;

export default function LayoutContainer({ children, title }: LayoutProps) {
  const { logout } = useAuth();
  const [togglePopupNoti, setTogglePopupNoti] = useState(false);
  const [visibleButton, setVisibleButton] = useState(false);

  const ref = useRef(null);

  const onToggleNotiPopup = () => {
    if (router.pathname === NOTIFICATION_PATH) return;
    setTogglePopupNoti((prevState) => {
      return !prevState;
    });
  };
  const router = useRouter();

  const handleOnDirect = (link = "") => {
    router.push(link);
  };

  const handleClickOutsideNoti = () => {
    setTogglePopupNoti(false);
  };

  useEffect(() => {
    const content = document.querySelector(".content") as HTMLElement;
    const onScroll = () => {
      setVisibleButton(content.scrollTop > 100);
    };

    document.addEventListener("click", handleClickOutsideNoti, true);

    // document.addEventListener("scroll", onScroll);
    content.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("click", handleClickOutsideNoti, true);
      document
        .querySelector("content")
        ?.removeEventListener("scroll", onScroll);
      // window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const content = document.querySelector(".content") as HTMLElement;

    content.scrollTo({ top: 0, behavior: "smooth" });
  };

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
                <div className='flex items-center justify-center text-2xl font-bold text-slate-900 w-48 '>
                  <Image
                    onClick={() => {
                      router.pathname !== HOME_PATH && router.push(HOME_PATH);
                    }}
                    className='h-[50px] object-contain hover:cursor-pointer'
                    src={logo_src}
                    alt='logo'
                  />
                </div>
                <div className=' flex items-center justify-between pr-8 w-[40%]'>
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
                      <Menu.Item
                        icon={<DollarCircleOutlined />}
                        key={PAYMENT_PATH}
                        onClick={() => handleOnDirect(PAYMENT_PATH)}>
                        Thanh toán
                      </Menu.Item>
                    </Menu>
                  </div>
                  <div className='text-2xl w-24 flex justify-between items-center'>
                    {/* <div>
                      <Badge count={99} overflowCount={9}>
                        <button onClick={onToggleNotiPopup}>
                          {<BellOutlined />}
                        </button>
                      </Badge>
                    </div> */}
                    <Tooltip title='Đăng xuất' placement='bottom'>
                      <button onClick={logout}>
                        <LogoutOutlined />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Header>
            <Layout>
              <MySideBar />
              {/* <Content> */}

              <div
                className={clsx(
                  "content",
                  "h-[calc(100vh_-_64px)] overflow-auto overflow-x-hidden px-3 bg-slate-200 w-full"
                )}>
                {children}
              </div>

              {visibleButton && (
                <div className='fixed bottom-5 right-3'>
                  <Tooltip placement='left' title='Đầu trang'>
                    <Button
                      onClick={scrollToTop}
                      className=' h-[40px]  bg-slate-800 text-white border-none opacity-80 hover:opacity-100 flex items-center'>
                      <ArrowUpOutlined />
                    </Button>
                  </Tooltip>
                </div>
              )}

              {/* </Content> */}
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
