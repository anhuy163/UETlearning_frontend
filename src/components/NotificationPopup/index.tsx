import { NOTIFICATION_PATH, testAvatarSrc } from "@/src/app/constants";
import {} from "antd";
import Link from "next/link";
import NotiCard from "../NotiCard";

export default function NotificationPopup() {
  return (
    <div className='fixed w-[360px] h-fit px-2 py-2 top-[62px] z-100 right-[20px] bg-slate-800 rounded-md max-h-[calc(100vh_-_75px)] overflow-y-auto'>
      <div className='flex items-center justify-between text-lg font-mono text-cyan-300'>
        <h2 className='font-bold text-2xl text-white'>Thông báo</h2>
        <Link href={NOTIFICATION_PATH}>Xem tất cả</Link>
      </div>
      <div className='mt-2'>
        <NotiCard
          avatar={testAvatarSrc}
          name='Bakugo Katsuki'
          title='Đã tạo 1 bài viết mới'
        />
      </div>
    </div>
  );
}
