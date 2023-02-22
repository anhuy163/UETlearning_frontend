import React from "react";
import { Input, Modal, Button, Form } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styles from "./styles.module.less";
import { PopconfirmProps } from "antd";
import { PopupStudentNoteProps } from "@/src/containers/PopupStudentNote";
import { useForm } from "antd/lib/form/Form";
import clsx from "clsx";
import FormWrapper from "@/src/containers/FormWrapper/FormWrapper";

export default function PopupStudentNote({
  onSubmit,
  ...props
}: PopupStudentNoteProps) {
  const [form] = useForm();

  const rules = {
    note: [
      { whitespace: true },
      { max: 100, message: "Không vượt quá 100 ký tự" },
    ],
  };

  const dummyUser = {
    name: "Hồ An Huy",
    note: "Inteligent student",
  };

  return (
    <FormWrapper>
      <Modal {...props} closable={false} destroyOnClose={true} footer={null}>
        <p className='flex items-center justify-center text-slate-800 font-mono font-semibold text-2xl mb-2'>
          <FormOutlined />
          <span className='ml-2'>Ghi chú</span>
        </p>
        <Form
          className={styles.container}
          onFinish={onSubmit}
          initialValues={dummyUser}>
          <Form.Item label='Họ & Tên'>
            <p className='text-xl text-cyan-900 ml-2'>An Huy</p>
          </Form.Item>
          <Form.Item label='Học lực' name={"note"} rules={rules.note}>
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 8 }} />
          </Form.Item>
          <div className='flex items-center justify-center '>
            {/* <Form.Item> */}
            <Button onClick={props.onCancel}>Hủy</Button>
            <Button
              className={clsx(
                styles.submitBtn,
                "ml-2 bg-cyan-900 text-white border-none opacity-80 hover:opacity-100 "
              )}
              htmlType='submit'>
              Xác nhận
            </Button>
            {/* </Form.Item> */}
          </div>
        </Form>
      </Modal>
    </FormWrapper>
  );
}
