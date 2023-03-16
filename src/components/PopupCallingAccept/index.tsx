import { Button, Modal } from "antd";
import React, { useState } from "react";
import styles from "./styles.module.less";
import clsx from "clsx";
import { PhoneOutlined } from "@ant-design/icons";

type PopupCallingAcceptProps = {
  open: boolean;
  onCancel: () => void;
};

export default function PopupCallingAccept({
  open,
  onCancel,
}: PopupCallingAcceptProps) {
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
          <Button className='bg-green-500  border-none opacity-90 hover:opacity-100'>
            Chap nhan
          </Button>
        </div>
      </Modal>
    </div>
  );
}
