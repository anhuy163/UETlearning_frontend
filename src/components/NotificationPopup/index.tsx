import { NOTIFICATION_PATH, TEXT, testAvatarSrc } from "@/src/app/constants";
import {} from "antd";
import Link from "next/link";
import NotiCard from "../NotiCard";

type NotificationPopupProps = {
  notis: any;
};

export default function NotificationPopup({ notis }: NotificationPopupProps) {
  return (
    <div className="fixed w-[360px] h-fit px-2 py-2 top-[62px] z-100 right-[20px] bg-slate-800 rounded-md max-h-[calc(100vh_-_75px)] overflow-y-auto z-10">
      <div className="flex items-center justify-between text-lg font-mono text-cyan-300">
        <h2 className="font-bold text-2xl text-white">Thông báo</h2>
        {/* <Link href={NOTIFICATION_PATH}>Xem tất cả</Link> */}
      </div>
      <div className="mt-2">
        {notis?.length === 0 && (
          <div className="text-white text-base text-center">
            Không có thông báo nào
          </div>
        )}
        {notis?.map((noti: any, index: number) => (
          <NotiCard
            key={index}
            avatar={noti.avatar}
            name={noti.student}
            title={
              noti.type === "answer"
                ? `${noti.student} ${TEXT.ANSWER_NOTI}`
                : `${TEXT.CALL_NOTI} ${noti.student}`
            }
            createdAt={noti.createdAt}
            link={noti?.link}
          />
        ))}
      </div>
    </div>
  );
}
