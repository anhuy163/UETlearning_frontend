import { AVATAR_SIZE } from "@/src/app/constants";
import UserAvatar from "../UserAvatar";
import clsx from "clsx";
import styles from "./styles.module.less";
import { Image } from "antd";

type CommetProps = {
  content: string;
  avatarSize: number;
  commentAuthor: string;
  commentAuthorAva: string;
  imgs: any[];
};

export default function Comment({
  content,
  avatarSize,
  commentAuthor,
  commentAuthorAva,
  imgs,
}: CommetProps) {
  return (
    <div className='flex items-center mb-2'>
      <div
        className={
          avatarSize === AVATAR_SIZE.SMALL ? "min-w-[50px]" : "min-w-[30px]"
        }>
        <UserAvatar
          name={commentAuthor}
          size={avatarSize}
          imgSrc={commentAuthorAva}
        />
      </div>
      <div className='ml-3 rounded-xl bg-slate-200 px-2 py-1 '>
        <p className='text-base font-semibold text-slate-800'>
          {commentAuthor}
        </p>
        <div className={clsx(styles.commentContent, "max-w-full mb-1")}>
          {content}
        </div>
        {imgs?.length && imgs[0] && (
          <Image className={styles.commentImage} alt='image' src={imgs[0]} />
        )}
      </div>
    </div>
  );
}
