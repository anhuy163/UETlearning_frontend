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
      <h2 className='text-center font-mono text-2xl text-cyan-800 font-bold mb-3'>
        UET LEARNING
      </h2>
      <Form onFinish={onFinish}>
        <Form.Item
          colon={false}
          name='email'
          rules={[
            { type: "email", message: "Email không hợp lệ" },
            { required: true, message: "Vui lòng điền tài khoản" },
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

        <h4 className='text-center font-mono text-sg text-cyan-800 font-semibold mt-3'>
          Chưa có tài khoản?{" "}
          <Link href={"/register"}>
            <span className='text-cyan-600 underline'>Đăng ký ngay</span>
          </Link>
        </h4>
      </Form>
    </FormWrapper>
  );
}
