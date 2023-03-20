import { Modal, Form, Input, Button } from "antd";
import FormWrapper from "@/src/containers/FormWrapper/FormWrapper";
import clsx from "clsx";
import { FormOutlined } from "@ant-design/icons";
import styles from "./styles.module.less";

type PopupChangePasswordProps = {
  open: boolean;
  onCancel: () => void;
  onFinish: (value: any) => void;
};

export default function PopupChangePassword({
  onFinish,
  ...props
}: PopupChangePasswordProps) {
  const rules = {
    password: [{ required: true, message: "VUi lòng không bỏ trống" }],
  };
  return (
    <Modal {...props} destroyOnClose footer={null} closable={false}>
      <FormWrapper className={styles.container}>
        <p className='flex items-center justify-center text-slate-800 font-mono font-semibold text-2xl mb-2'>
          <FormOutlined />
          <span className='ml-2'>ĐỔI MẬT KHẨU</span>
        </p>
        <Form onFinish={onFinish}>
          <Form.Item
            name='currentPassword'
            label='Mật khẩu hiện tại'
            rules={rules.password}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='newPassword'
            label='Mật khẩu mới'
            rules={rules.password}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='reNewPassword'
            label='Nhập lại mật khẩu mới'
            rules={rules.password}>
            <Input.Password />
          </Form.Item>
          <div
            className={clsx(
              styles.buttonArea,
              "w-full flex items-center justify-center"
            )}>
            <Button
              onClick={props.onCancel}
              className='bg-slate-800 opacity-80 hover:opacity-100 mr-2'>
              Hủy
            </Button>
            <Button
              className='bg-cyan-800 opacity-80 hover:opacity-100 mr-2'
              htmlType='submit'>
              Xác nhận
            </Button>
          </div>
        </Form>
      </FormWrapper>
    </Modal>
  );
}
