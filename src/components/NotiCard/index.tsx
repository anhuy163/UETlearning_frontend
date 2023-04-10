import {} from "antd";
import UserAvatar from "../UserAvatar";
import { AVATAR_SIZE, QANDA_PATH } from "@/src/app/constants";
import clsx from "clsx";
import styles from "./styles.module.less";
import moment from "moment";
import Link from "next/link";
import { VI_LOCALE } from "@/src/app/constants";

moment.locale("vi", VI_LOCALE);

type NotiCardProps = {
  avatar: string;
  name: string;
  title: string;
  createdAt: string;
  link?: string;
};

export default function NotiCard({
  avatar,
  name,
  title,
  createdAt,
  link,
}: NotiCardProps) {
  return (
    <div
      className={clsx(
        styles.container,
        "flex items-center  px-2 py-1 rounded-lg bg-slate-600  mt-2 "
      )}>
      <div className="min-w-[64px]">
        <UserAvatar size={AVATAR_SIZE.AVERAGE} name={name} imgSrc={avatar} />
      </div>
      <div className="ml-2 w-[calc(100%_-_70px)]">
        {link ? (
          <Link href={`${QANDA_PATH}/${link}`}>
            <h2
              className={clsx(
                styles.title,
                " text-base font-semibold text-white"
              )}>
              {title}
            </h2>
          </Link>
        ) : (
          <h2
            className={clsx(
              styles.title,
              " text-base font-semibold text-white"
            )}>
            {title}
          </h2>
        )}
        <p className={clsx(styles.content, "text-base  text-slate-300")}>
          {moment(createdAt, "YYYYMMDD").fromNow()}
        </p>
      </div>
    </div>
  );
}
