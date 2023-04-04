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
import { LOGIN_PATH } from "@/src/app/constants";
import logo_src from "../../app/assets/app_logo.png";
import Image from "next/image";

type ForgotPasswordFormProps = {
  onFinish: (value: any) => void;
};

export default function ForgotPasswordForm({
  onFinish,
}: ForgotPasswordFormProps) {
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
    username: [
      {
        required: true,
        message: "Vui lòng không bỏ trống",
      },
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
          name={"username"}
          label='Tài khoản'
          rules={rules.username}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Email đăng ký'
          colon={false}
          name='email'
          rules={[
            { type: "email", message: "Email không hợp lệ" },
            { required: true, message: "Vui lòng điền tài khoản" },
          ]}>
          <Input allowClear />
        </Form.Item>

        <div className='w-full flex items-center justify-center'>
          <Button className={styles.button} htmlType='submit' type='primary'>
            Xác nhận
          </Button>
        </div>

        <h4 className='text-center font-mono text-base text-cyan-800 font-semibold mt-3 underline'>
          <Link href={LOGIN_PATH}>Quay lại trang đăng nhập</Link>
        </h4>
      </Form>
    </FormWrapper>
  );
}
