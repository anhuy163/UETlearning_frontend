import LayoutContainer from "@/src/containers/Layout";
import { useEffect, useState } from "react";
import styles from "../styles/styles.module.less";
import clsx from "clsx";

export default function Home() {
  return (
    <LayoutContainer title='Trang chủ'>
      <div className='inline-block relative'>
        <div
          className={clsx(
            styles.text,
            "text-[40px] font-mono font-bold text-cyan-900 m-auto"
          )}>
          Welcome to UET Learning, Bakugo!
        </div>
      </div>
    </LayoutContainer>
  );
}
