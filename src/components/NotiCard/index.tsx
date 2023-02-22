import {} from "antd";
import UserAvatar from "../UserAvatar";
import { AVATAR_SIZE } from "@/src/app/constants";
import clsx from "clsx";
import styles from "./styles.module.less";
import moment from "moment";

type NotiCardProps = {
  avatar: string;
  name: string;
  title: string;
  page: boolean;
  createdAt: string;
};

export default function NotiCard({
  avatar,
  name,
  title,
  createdAt,
  page,
}: NotiCardProps) {
  return !!page ? (
    <div
      className={clsx(
        styles.container,
        "flex items-center px-2 py-2 rounded-lg bg-slate-400 hover:bg-slate-500 cursor-pointer mt-2 transition ease-in-out  w-[80%] m-auto min-h-[96px]"
      )}>
      <div className='min-w-[64px]'>
        <UserAvatar size={AVATAR_SIZE.AVERAGE} name={name} imgSrc={avatar} />
      </div>
      <div className='ml-2 w-[calc(100%_-_70px)]'>
        <h2 className={clsx(styles.title, " font-mono text-lg font-semibold")}>
          {title}
        </h2>
        <p className={clsx(styles.content, "text-base  text-white")}>
          {moment(createdAt, "YYYYMMDD").fromNow()}
        </p>
      </div>
    </div>
  ) : (
    <div
      className={clsx(
        styles.container,
        "flex items-center  px-2 py-1 rounded-lg bg-slate-600 hover:bg-slate-700 cursor-pointer mt-2 transition ease-in-out delay-100"
      )}>
      <UserAvatar size={AVATAR_SIZE.SMALL} name={name} imgSrc={avatar} />
      <div className='w-[250px] ml-2'>
        <h2
          className={clsx(styles.title, "font-mono text-white font-semibold")}>
          {title}
        </h2>
        <p>{moment(createdAt, "YYYYMMDD").fromNow()}</p>
      </div>
    </div>
  );
}
