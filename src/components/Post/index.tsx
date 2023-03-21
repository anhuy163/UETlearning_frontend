import React, { useState } from "react";
import { Button, Image, Input, Skeleton, Upload } from "antd";
import { FileImageOutlined, SendOutlined } from "@ant-design/icons";
import UserAvatar from "../UserAvatar";
import { AVATAR_SIZE, testAvatarSrc } from "@/src/app/constants";
import moment from "moment";
import clsx from "clsx";
import styles from "./styles.module.less";
import Comment from "../Comment";
// import Upload from "antd/es/upload/Upload";

type PostProps = {
  id: string;
  name: string;
  content: string;
  base64Url: string;
  onChange: (e: any) => void;
  onDelete: () => void;
  onInputChange: (e: any) => void;
  onSubmit: () => void;
  disableButton: boolean;
  commentInput: string | undefined;
  img?: string;
};

export default function Post(props: PostProps) {
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
          <div className={clsx(styles.imagesContainer, "w-[100]% py-3")}>
            <Image
              className={styles.image}
              src={
                "https://ss-ava.saostar.vn/w1200/pc/1597225374504/vegeta-dragon-ball-super_3840x2160_xtrafondos_com(1).jpg"
              }
              alt='content'
            />
            <Image
              className={styles.image}
              src={
                "https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg"
              }
              alt='content'
            />
            <Image
              className={styles.image}
              src={
                "https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg"
              }
              alt='content'
            />
            <Image
              className={styles.image}
              src={
                "https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg"
              }
              alt='content'
            />
            <Image
              className={styles.image}
              src={
                "https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg"
              }
              alt='content'
            />
            <Image
              className={styles.image}
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
            value={props.commentInput}
            onChange={props.onInputChange}
            placeholder='Nhập bình luận ...'
            autoSize={{ minRows: 1, maxRows: 6 }}
          />
          <Upload
            showUploadList={false}
            onChange={props.onChange}
            accept='image/jpg, image/png, image/jpeg'>
            <Button className='ml-2 bg-cyan-600 text-white border-none opacity-80 hover:opacity-100 flex items-center'>
              <FileImageOutlined />
            </Button>
          </Upload>
          <Button
            onClick={props.onSubmit}
            disabled={props.disableButton}
            className='ml-2 bg-cyan-600 text-white border-none opacity-80 hover:opacity-100 flex items-center'>
            <SendOutlined />
          </Button>
        </div>
        {props.base64Url && (
          <div className='px-3'>
            <div className='mb-1'>
              <button
                onClick={props.onDelete}
                className='text-cyan-800 text-sm hover:font-semibold cursor-pointer'>
                Xóa đính kèm
              </button>
            </div>
            <Image
              // style={{ width: "25%", height: "auto" }}
              className={styles.commentImage}
              src={props.base64Url}
              alt='image'
            />
          </div>
        )}
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
        </div>
      </div>
    </>
  );
}
