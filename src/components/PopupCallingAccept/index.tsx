import { Button, Modal } from "antd";
import React, { useState } from "react";
import styles from "./styles.module.less";
import clsx from "clsx";
import { PhoneOutlined } from "@ant-design/icons";
import useHandleCall from "@/src/app/hooks/useHandleCall";
import { useRouter } from "next/router";

type PopupCallingAcceptProps = {
  open: boolean;
  onCancel: () => void;
  studentId: string | undefined;
};

export default function PopupCallingAccept({
  open,
  onCancel,
  studentId,
}: PopupCallingAcceptProps) {
  const router = useRouter();
  const { handleOnCallingAccept } = useHandleCall();
  const onAcceptCall = () => {
    handleOnCallingAccept(
      studentId,
      localStorage.getItem("channelToken")!
    ).then((res) => {
      // localStorage.setItem("callRes", JSON.stringify(res));
      router.push("/call");
      onCancel();
    });
  };

  return (
    <div>
      <Modal
        className={clsx(styles.container, "")}
        open={open}
        destroyOnClose
        footer={null}
        closable={false}>
        <div className='text-xl mb-3 font-semibold flex items-center '>
          <PhoneOutlined className='mr-3' />
          Ai do dang goi cho ban !!!
        </div>
        <div className='w-full flex items-center justify-center'>
          <Button
            onClick={onCancel}
            className='mr-2 bg-red-500 border-none opacity-90 hover:opacity-100'>
            Tu choi
          </Button>
          <Button
            onClick={onAcceptCall}
            className='bg-green-500  border-none opacity-90 hover:opacity-100'>
            Chap nhan
          </Button>
        </div>
      </Modal>
    </div>
  );
}
