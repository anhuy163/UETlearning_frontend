import React from "react";
import Head from "next/head";
import {} from "antd";

type AuthLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex items-center justify-center w-full min-h-screen bg-[url('https://staging.d2ar7agitimnk0.amplifyapp.com/images/Login-bg.png')]">
        {children}
      </div>
    </>
  );
}
