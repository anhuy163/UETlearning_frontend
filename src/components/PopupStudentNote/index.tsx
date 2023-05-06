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
  loading,
  ...props
}: PopupStudentNoteProps) {
  const [form] = useForm();

  const rules = {
    title:[{required:true, message:'Vui lòng không bỏ trống'},
      { whitespace: true },
      { max: 30, message: "Không vượt quá 30 ký tự" },],
    note: [
    {required:true, message:'Vui lòng không bỏ trống'},
      { whitespace: true },
      { max: 100, message: "Không vượt quá 100 ký tự" },
    ],
  };

  

  return (
    
      <Modal {...props} closable={false} destroyOnClose={true} footer={null} onCancel={props.onCancel}><FormWrapper loading={loading}>
        <p className="flex items-center justify-center text-slate-800 font-mono font-semibold text-2xl mb-2">
          <FormOutlined />
          <span className="ml-2">Báo cáo học sinh</span>
        </p>
        <Form
          className={styles.container}
          onFinish={onSubmit}
          >
          <Form.Item label='Chủ đề' name={"title"} rules={rules.title}>
            <Input/>
          </Form.Item>
          <Form.Item label="Nội dung" name={"note"} rules={rules.note}>
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 8 }} />
          </Form.Item>
          <div className="flex items-center justify-center ">
            {/* <Form.Item> */}
            <Button onClick={props.onCancel}>Hủy</Button>
            <Button
              className={clsx(
                styles.submitBtn,
                "ml-2 bg-cyan-900 text-white border-none opacity-80 hover:opacity-100 "
              )}
              htmlType="submit">
              Xác nhận
            </Button>
            {/* </Form.Item> */}
          </div>
        </Form></FormWrapper>
      </Modal>
    
  );
}
