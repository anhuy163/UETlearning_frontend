import React, { useState } from "react";
import { Button, Input, Skeleton } from "antd";
import { SendOutlined } from "@ant-design/icons";
import UserAvatar from "../UserAvatar";
import { AVATAR_SIZE, testAvatarSrc } from "@/src/app/constants";
import moment from "moment";
import Image from "next/image";
import clsx from "clsx";
import styles from "./styles.module.less";
import { useDebounce } from "@/src/app/hooks/useDebounce";
import SubComment from "../SubComment";
import Comment from "../Comment";

type PostProps = {
  id: string;
  name: string;
  content: string;
  img?: string;
};

export default function Post(props: PostProps) {
  //   const { debounceFunction } = useDebounce();
  const [input, setInput] = useState("");
  const handleOnInputChange = (e: any) => {
    setInput(e.target.value);
  };
  //   console.log(input);
  const handleOnComment = () => {
    console.log("postId", props.id);
    console.log("input", input);
  };
  return (
    <>
      {/* <div className='w-[60%] m-auto '>
        <Skeleton active />
      </div> */}
      <div
        className={clsx(
          styles.container,
          "w-[60%] rounded-md bg-white m-auto flex flex-col mb-3"
        )}>
        <div className='px-3 py-2 rounded-t-md flex items-center border-slate-200 border-b-2'>
          <UserAvatar
            name='Bakugo Katsuki'
            size={AVATAR_SIZE.AVERAGE}
            imgSrc={testAvatarSrc}
          />
          <div className='ml-3'>
            <p className='font-mono text-2xl font-semibold text-slate-800 '>
              {props.name}
            </p>
            <div className='text-slate-600'>
              {moment("20230211", "YYYYMMDD").fromNow()}
            </div>
          </div>
        </div>
        <div className='px-3 py-2 flex-1 overflow-auto w-[100%] whitespace-normal break-all '>
          <p className='font-medium text-base text-cyan-900'>{props.content}</p>
          <div className='w-[100]% py-3'>
            <img
              className='w-[80%] m-auto'
              src={
                "https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg"
              }
              alt='content'
            />
          </div>
        </div>
        <div
          className={clsx(
            styles.comment,
            "rounded-b-md border-t-2 border-slate-200 px-3 py-2 flex items-center justify-center"
          )}>
          <Input.TextArea
            value={input}
            onChange={handleOnInputChange}
            placeholder='Nhập bình luận ...'
            autoSize={{ minRows: 1, maxRows: 6 }}
          />
          <Button
            onClick={handleOnComment}
            className='ml-2 bg-cyan-600 text-white border-none opacity-80 hover:opacity-100 flex items-center'>
            <SendOutlined />
          </Button>
        </div>
        <div className='px-3 pt-2 max-h-[300px] overflow-auto '>
          <Comment
            content='So beautiful, buddy So beautiful, buddySo beautiful, buddySo
                beautiful, buddySo beautiful, buddySo beautiful, buddySo
                beautiful, buddySo beautiful, buddySo beautiful, buddySo
                beautiful, buddySo beautiful, buddySo beautiful, buddyv'
            avatarSize={AVATAR_SIZE.SMALL}
          />
          <Comment
            content='So beautiful, buddy'
            avatarSize={AVATAR_SIZE.SMALL}
          />
          <Comment
            content='So beautiful, buddy'
            avatarSize={AVATAR_SIZE.SMALL}
          />
          <SubComment />
          {/* <div className='flex items-center mb-2'>
            <div className='min-w-[50px]'>
              <UserAvatar name='An Huy' size={AVATAR_SIZE.SMALL} />
            </div>
            <div className='ml-3'>
              <p className='text-base font-semibold text-slate-800'>An Huy</p>
              <div className={clsx(styles.commentContent, "max-w-full")}>
                So beautiful, buddy So beautiful, buddySo beautiful, buddySo
                beautiful, buddySo beautiful, buddySo beautiful, buddySo
                beautiful, buddySo beautiful, buddySo beautiful, buddySo
                beautiful, buddySo beautiful, buddySo beautiful, buddyv
              </div>
            </div>
          </div>
          <div className='flex items-center mb-2'>
            <UserAvatar name='An Huy' size={AVATAR_SIZE.SMALL} />
            <div className='ml-3'>
              <p className='text-base font-semibold text-slate-800'>An Huy</p>
              <p>So beautiful, buddy</p>
            </div>
          </div>
          <div className='flex items-center mb-2'>
            <UserAvatar name='An Huy' size={AVATAR_SIZE.SMALL} />
            <div className='ml-3'>
              <p className='text-base font-semibold text-slate-800'>An Huy</p>
              <p>So beautiful, buddy</p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
