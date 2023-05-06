import React from "react";
import useAuth from "@/src/app/hooks/useAuth";
import { Button } from "antd";
import clsx from "clsx";
import styles from "./styles.module.less";
import AuthLayout from "@/src/containers/AuthLayout";
import { LOGIN_PATH, TEXT } from "../../app/constants";
import { useRouter } from "next/router";

export default function DeactivePage() {
    const router=useRouter()
  const { logout } = useAuth();
  return (
    <AuthLayout title='Tài khoản bị vô hiệu hóa'>
      <div className='p-20 border-4 border-cyan-800 text-center'>
        <p className=' font-semibold text-xl'>{TEXT.DEACTIVE_ACCOUNT}</p>
        <div
          onClick={logout}
          className='mt-4 cursor-pointer hover:font-semibold text-cyan-700 text-base'>
          Trở về trang đăng nhập
        </div>
      </div>
    </AuthLayout>
  );
}
