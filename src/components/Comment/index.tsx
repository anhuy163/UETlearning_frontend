import { AVATAR_SIZE } from "@/src/app/constants";
import UserAvatar from "../UserAvatar";
import clsx from "clsx";
import styles from "./styles.module.less";
import { Image } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
type CommetProps = {
  content: string;
  avatarSize: number;
  commentAuthor: string;
  commentAuthorAva: string;
  imgs: any[];
  best: boolean;
};

export default function Comment({
  content,
  avatarSize,
  commentAuthor,
  commentAuthorAva,
  imgs,
  best,
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
      <div
        className={
          best
            ? "ml-3 rounded-xl bg-slate-300 px-2 py-1"
            : "ml-3 rounded-xl bg-slate-100 px-2 py-1 "
        }>
        {best && (
          <div className='flex items-center text-lg text-purple-700 font-semibold'>
            <CheckCircleFilled className='mr-1' />
            Câu trả lời hay nhất
          </div>
        )}
        <p className='text-base font-semibold text-slate-800'>
          {commentAuthor}
        </p>
        <div
          className={clsx(styles.commentContent, "max-w-full mb-1 text-base")}>
          {content}
        </div>
        {imgs?.length && imgs[0] && (
          <Image className={styles.commentImage} alt='image' src={imgs[0]} />
        )}
      </div>
    </div>
  );
}
