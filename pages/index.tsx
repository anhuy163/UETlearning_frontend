import LayoutContainer from "@/src/containers/Layout";
import { useEffect, useState } from "react";
import styles from "../styles/styles.module.less";
import clsx from "clsx";

export default function Home() {
  return (
    <LayoutContainer title='Trang chủ'>
      <div className='w-full min-h-[calc(100vh_-_88px)] mt-3 bg-white rounded-md flex items-center justify-center text-center'></div>
    </LayoutContainer>
  );
}
