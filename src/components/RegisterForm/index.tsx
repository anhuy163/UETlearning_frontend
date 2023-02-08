import styles from "./styles.module.less";
import { Button, Form, Input, message, Space, Typography } from "antd";
import FormWrapper from "@/src/containers/FormWrapper/FormWrapper";
import {
  UserOutlined,
  LockOutlined,
  GooglePlusOutlined,
} from "@ant-design/icons";
import { useForm } from "rc-field-form";
import Link from "next/link";
import { LOGIN_PATH } from "@/src/app/constants";

export default function RegisterForm() {
  const form = useForm();
  const rules = {
    username: [{ required: true, message: "Vui lòng điền tài khoản" }],
    password: [
      { required: true, message: "Vui lòng điền mật khẩu" },
      { min: 8, message: "Mật khẩu ít nhất phải có 8 ký tự" },
    ],
    confirmPassword: [{ required: true, message: "Vui lòng không bỏ trống" }],
    firstName: [
      {
        required: true,
        message: "Vui lòng nhập họ của bạn",
      },
      { max: 20, message: "Vượt quá số lượng ký tự" },
    ],
    lastName: [
      {
        required: true,
        message: "Vui lòng nhập tên của bạn",
      },
      { max: 20, message: "Vượt quá số lượng ký tự" },
    ],
  };
  return (
    <FormWrapper className={styles.formWrapper}>
      <h2 className='text-center font-mono text-2xl text-cyan-800 font-bold mb-3'>
        UET LEARNING
      </h2>
      <Form className={styles.container}>
        <Form.Item
          label='Tài khoản'
          colon={false}
          name='username'
          // rules={rules.username}
          rules={[
            { type: "email", message: "Email không hợp lệ" },
            { required: true, message: "Vui lòng điền tài khoản" },
          ]}>
          <Input addonBefore={<UserOutlined />} allowClear />
        </Form.Item>
        <Form.Item
          label='Mật khẩu'
          colon={false}
          name='password'
          rules={rules.password}>
          <Input.Password addonBefore={<LockOutlined />} allowClear />
        </Form.Item>
        <Form.Item
          label='Nhập lại mật khẩu'
          colon={false}
          name='confirmPassword'
          rules={rules.confirmPassword}>
          <Input.Password
            addonBefore={<LockOutlined />}
            allowClear></Input.Password>
        </Form.Item>
        <div className={styles.nameInputArea}>
          <Form.Item
            className={styles.firstName}
            rules={rules.firstName}
            colon={false}
            label='Họ'
            name='firstName'>
            <Input placeholder='Họ'></Input>
          </Form.Item>
          <Form.Item
            className={styles.lastName}
            rules={rules.lastName}
            name='lastName'
            colon={false}
            label='Tên'>
            <Input placeholder='Tên'></Input>
          </Form.Item>
        </div>
        <Space className={styles.registerBtn}>
          <Form.Item>
            <Button className={styles.button} htmlType='submit' type='primary'>
              Đăng ký
            </Button>
          </Form.Item>
        </Space>
        <h4 className='text-center font-mono text-sg text-cyan-800 font-semibold mt-3'>
          Bạn đã có tài khoản?{" "}
          <Link href={LOGIN_PATH}>
            <span className='text-cyan-600 underline'>Đăng nhập</span>
          </Link>
        </h4>
      </Form>
    </FormWrapper>
  );
}
