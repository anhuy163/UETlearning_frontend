import React, { useState } from "react";
import { Button, Image, Input, Skeleton, Upload } from "antd";
import { FileImageOutlined, SendOutlined } from "@ant-design/icons";
import UserAvatar from "../UserAvatar";
import { AVATAR_SIZE, testAvatarSrc, VI_LOCALE } from "@/src/app/constants";
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
  postImgs: any[];
  createdTime: any;
  comments: any[];
  authorAva: string;
  solved: boolean;
  attachment: any;
  img?: string;
};

moment.locale("vi", VI_LOCALE);
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
            name={props.name}
            size={AVATAR_SIZE.AVERAGE}
            imgSrc={props.authorAva}
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
        <div className='px-3 py-2 flex-1 overflow-auto w-[100%] whitespace-normal break-all '>
          <p className='font-medium text-base text-cyan-900'>{props.content}</p>
          {props.attachment && (
            <a href={props.attachment[0]} target='blank'>
              Tệp đính kèm
            </a>
          )}
          <div className={clsx(styles.imagesContainer, "w-[100]% py-3")}>
            {props.postImgs?.map((img: string) => {
              return (
                <Image
                  key={img}
                  className={styles.image}
                  src={img}
                  alt='content'
                />
              );
            })}
          </div>
        </div>
        {!props.solved && (
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
        )}
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
        <div className='px-3 pt-2 max-h-[500px] overflow-auto '>
          {props.comments?.map((comment) => {
            return (
              <Comment
                key={comment?.id}
                best={comment?.bestAnswer}
                content={comment?.content}
                avatarSize={AVATAR_SIZE.SMALL}
                commentAuthor={comment?.teacherDTO?.realName}
                commentAuthorAva={comment?.teacherDTO?.avaPath}
                imgs={comment?.imgUrls}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
