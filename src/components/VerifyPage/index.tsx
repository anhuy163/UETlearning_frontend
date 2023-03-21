import React from "react";
import useAuth from "@/src/app/hooks/useAuth";
import { Button } from "antd";
import clsx from "clsx";
import styles from "./styles.module.less";
import AuthLayout from "@/src/containers/AuthLayout";
import { TEXT } from "../../app/constants";

export default function VerifyPage() {
  const { logout } = useAuth();
  return (
    <AuthLayout title='Tài khoản chờ xác thực'>
      <div className='p-20 border-4 border-cyan-800 text-center'>
        <p className=' font-semibold text-xl'>{TEXT.VERIFY_MESSAGE}</p>
        <div
          onClick={logout}
          className='mt-4 cursor-pointer hover:font-semibold text-cyan-700 text-base'>
          Đăng xuất khỏi toàn khoản này
        </div>
      </div>
    </AuthLayout>
  );
}
