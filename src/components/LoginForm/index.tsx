import { Button, Form, Input, Space, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GooglePlusOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useForm } from "antd/lib/form/Form";
import FormWrapper from "@/src/containers/FormWrapper/FormWrapper";
import styles from "./styles.module.less";
import { useRouter } from "next/router";
import { LoginBody } from "@/src/app/hooks/useAuth";
import { useEffect } from "react";
import { FORGOT_PASSWORD_PATH, REGISTER_PATH } from "@/src/app/constants";
import logo_src from "../../app/assets/app_logo.png";
import Image from "next/image";

type LoginFormProps = {
  onFinish: (value: LoginBody) => void;
};

export default function LoginForm({ onFinish }: LoginFormProps) {
  const router = useRouter();
  const form = useForm();
  const rules = {
    email: [
      { required: true, message: "Vui lòng không bỏ trống" },
      { whitespace: true },
    ],
    password: [
      { required: true, message: "Vui lòng không bỏ trống" },
      { min: 8, message: "Độ dài mật khẩu ít nhất 8 ký tự" },
    ],
  };

  return (
    <FormWrapper className={styles.formWrapper}>
      <div className='m-auto w-[50%] mb-2'>
        <Image alt='image' src={logo_src} />
      </div>
      <Form onFinish={onFinish}>
        <Form.Item
          colon={false}
          name='email'
          rules={[
            // { type: "email", message: "Email không hợp lệ" },
            {
              required: true,
              message: "Vui lòng điền tài khoản hoặc email đăng ký",
            },
          ]}>
          <Input addonBefore={<UserOutlined />} allowClear />
        </Form.Item>
        <Form.Item colon={false} name='password' rules={rules.password}>
          <Input.Password addonBefore={<LockOutlined />} allowClear />
        </Form.Item>
        <div className='w-full flex items-center justify-center'>
          <Button
            className={styles.button}
            htmlType='submit'
            type='primary'
            // onClick={() => router.push("/")}
          >
            Đăng nhập
          </Button>
        </div>
        <h3 className='text-center font-mono text-sm text-cyan-600 font-semibold mt-3 underline'>
          <Link href={FORGOT_PASSWORD_PATH}>Quên mật khẩu</Link>
        </h3>
        <h4 className='text-center font-mono text-sg text-cyan-800 font-semibold mt-3'>
          Chưa có tài khoản?{" "}
          <Link href={REGISTER_PATH}>
            <span className='text-cyan-600 underline'>Đăng ký ngay</span>
          </Link>
        </h4>
      </Form>
    </FormWrapper>
  );
}
