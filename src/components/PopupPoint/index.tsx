import { Button, Modal } from "antd";
import React from "react";
import { POINT_EXPLAIN } from "@/src/app/constants";

type PopupPointProps = {
  open: boolean;
  onCancel: () => void;
};
export default function PopupPoint(props: PopupPointProps) {
  return (
    <Modal
      {...props}
      width={700}
      destroyOnClose
      footer={null}
      title={"VAI TRÒ CỦA POINTS (ĐIỂM TÍCH LŨY)"}
      closable={false}>
      <div className='p-4 border-2 border-cyan-800'>
        <div className='text-lg font-semibold text-cyan-700'>
          {POINT_EXPLAIN.TITLE}
        </div>
        <div className='px-4 text-red-600 font-semibold text-lg'>
          <p>- Học sinh nhắn tin cho bạn</p>
          <p>- Tham gia cuộc gọi cùng học sinh</p>
          <p>- Tham gia giải đáp thắc mắc của học sinh ở mục Q&A</p>
        </div>
        <div className='text-lg font-semibold text-slate-700'>
          {POINT_EXPLAIN.FUNCTION}
        </div>
      </div>
      <div className='w-[100px] m-auto mt-4'>
        <Button
          onClick={props.onCancel}
          className=' ml-auto w-[100px] bg-cyan-600 text-white border-none hover:bg-white'>
          Đã hiểu
        </Button>
      </div>
    </Modal>
  );
}
