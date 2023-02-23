import { AVATAR_SIZE } from "@/src/app/constants";
import UserAvatar from "../UserAvatar";
import clsx from "clsx";
import styles from "./styles.module.less";

type CommetProps = {
  content: string;
  avatarSize: number;
};

export default function Comment({ content, avatarSize }: CommetProps) {
  return (
    <div className='flex items-center mb-2'>
      <div
        className={
          avatarSize === AVATAR_SIZE.SMALL ? "min-w-[50px]" : "min-w-[30px]"
        }>
        <UserAvatar name='An Huy' size={avatarSize} />
      </div>
      <div className='ml-3 rounded-xl bg-slate-200 px-2 py-1'>
        <p className='text-base font-semibold text-slate-800'>An Huy</p>
        <div className={clsx(styles.commentContent, "max-w-full")}>
          {content}
        </div>
      </div>
    </div>
  );
}
