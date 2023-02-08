import { Spin } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  return (
    <div className='flex items-center justify-center w-full h-screen '>
      <Spin tip='Đang tải...' size='large' />
    </div>
  );
}
