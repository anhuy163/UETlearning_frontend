import React from "react";
import { Input, Modal, Button, Form } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styles from "./styles.module.less";
import { PopupStudentNoteProps } from "@/src/containers/PopupStudentNote";
import { useForm } from "antd/lib/form/Form";
import clsx from "clsx";
import FormWrapper from "@/src/containers/FormWrapper/FormWrapper";

export default function PopupAddMsgTemplate({
  onSubmit,
  ...props
}: PopupStudentNoteProps) {
  const [form] = useForm();

  const rules = {
    template: [
      { whitespace: true },
      { max: 50, message: "Không vượt quá 50 ký tự" },
    ],
  };

  return (
    <FormWrapper>
      <Modal {...props} closable={false} destroyOnClose={true} footer={null}>
        <p className='flex items-center justify-center text-slate-800 font-mono font-semibold text-2xl mb-2'>
          <FormOutlined />
          <span className='ml-2'>Thêm mẫu tin nhắn</span>
        </p>
        <Form className={styles.container} onFinish={onSubmit}>
          <Form.Item label='Tin nhắn' name={"template"} rules={rules.template}>
            <Input />
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
