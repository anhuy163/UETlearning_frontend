import { Image } from "antd";
import UserAvatar from "../UserAvatar";
import {
  AVATAR_SIZE,
  QANDA_PATH,
  TEXT,
  testAvatarSrc,
} from "@/src/app/constants";
import moment from "moment";
import clsx from "clsx";
import styles from "./styles.module.less";
import Comment from "../Comment";
import { CheckCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

export type QuestionPopProps = {
  id: string;
  name: string;
  content: string;
  studentAva: string | undefined;
  createdTime: any;
  answers: number;
  img?: string;
};

export default function QuestionPost(props: QuestionPopProps) {
  return (
    <>
      <div
        className={clsx(
          styles.container,
          "w-[60%] rounded-md bg-white m-auto flex flex-col mb-3"
        )}>
        <div className='px-3 py-2 rounded-t-md flex items-center border-slate-200 border-b-[1px]'>
          <UserAvatar
            name='Bakugo Katsuki'
            size={AVATAR_SIZE.AVERAGE}
            imgSrc={props.studentAva}
          />
          <div className='ml-3'>
            <p className='font-mono text-2xl font-semibold text-slate-800 '>
              {props.name}
            </p>
            <div className='text-slate-600'>
              {moment(new Date(props.createdTime), "YYYYMMDD").fromNow()}
            </div>
          </div>
        </div>
        <div className='px-3 py-4 flex-1 overflow-auto w-[100%] whitespace-normal break-all border-b-[1px] border-slate-200'>
          <p className='font-medium text-xl text-cyan-900'>{props.content}</p>
          {/* <div className={clsx(styles.imagesContainer, "w-[100]% py-3")}>
            <Image
              src={
                "https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg"
              }
              className={styles.image}
              alt='image'></Image>
          </div> */}
        </div>

        <div className='px-3 pt-2 max-h-[300px] overflow-auto '>
          <div className='w-full flex items-center justify-between mb-2 '>
            <div className='text-base font-semibold text-cyan-700 flex items-center'>
              Có {props.answers} câu trả lời
              {/* <CheckCircleOutlined className='mr-1' /> {TEXT.BEST_ANSWER} */}
            </div>
            <div className='text-base font-semibold text-cyan-600 cursor-pointer'>
              <Link href={`${QANDA_PATH}/${props.id}`}>
                {TEXT.DIRECT_TO_POST}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
