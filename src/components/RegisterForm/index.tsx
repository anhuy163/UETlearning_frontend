import styles from "./styles.module.less";
import {
  Button,
  Form,
  Input,
  Space,
  DatePicker,
  Radio,
  Select,
  Upload,
} from "antd";
import FormWrapper from "@/src/containers/FormWrapper/FormWrapper";
import { useForm } from "antd/lib/form/Form";
import Link from "next/link";
import { LOGIN_PATH, SUBJECTS, GRADE } from "@/src/app/constants";
import moment from "moment";
import clsx from "clsx";
import { useState } from "react";
import logo_src from "../../app/assets/app_logo.png";
import Image from "next/image";

type RegisterFormProps = {
  onFinish: (value: any) => void;
  loading: boolean;
};

export default function RegisterForm({ onFinish, loading }: RegisterFormProps) {
  function disabledDate(current: any) {
    // console.log(current);

    // Disable dates after today
    return current && current > moment().endOf("day");
  }
  const handleOnSubmit = (e: any) => {
    // e.preventDefault();
    console.log(e);
    console.log(typeof moment(e.dateOfBirth.d).format("YYYY-MM-DD"));
  };
  // const onRemove = () => {
  //   console.log(123);

  //   form.setFieldValue("frontIdFile", null);
  //   console.log(form.getFieldValue("frontIdFile"));
  // };
  // const [form] = useForm();
  const rules = {
    username: [{ required: true, message: "Vui lòng điền tài khoản" }],
    password: [
      { required: true, message: "Vui lòng điền mật khẩu" },
      { min: 8, message: "Mật khẩu ít nhất phải có 8 ký tự" },
    ],
    confirmPassword: [{ required: true, message: "Vui lòng không bỏ trống" }],
    realName: [
      {
        required: true,
        message: "Vui lòng nhập tên của bạn",
      },
      { max: 30, message: "Không vượt quá 30 ký tự" },
    ],
    dateOfBirth: [
      {
        required: true,
        message: "Vui lòng chọn ngày sinh",
      },
    ],
    gender: [
      {
        required: true,
        message: "Vui lòng chọn giới tính",
      },
    ],
    subject: [
      {
        required: true,
        message: "Vui lòng chọn môn học đăng ký",
      },
    ],
    grade: [
      {
        required: true,
        message: "Vui lòng chọn khối giảng dạy",
      },
    ],
    phoneNumber: [
      {
        required: true,
        message: "Vui lòng điền số điện thoại",
      },
    ],
    frontIdFile: [
      {
        required: true,
        message: "Vui lòng tải ảnh mặt trước CCCD",
      },
    ],
    backIdFile: [
      {
        required: true,
        message: "Vui lòng tải ảnh mặt sau CCCD",
      },
    ],
  };

  return (
    <FormWrapper className={styles.formWrapper} loading={loading}>
      <div className='m-auto w-[50%] mb-2'>
        <Image alt='image' src={logo_src} />
      </div>

      <Form className={styles.container} onFinish={onFinish}>
        <Form.Item
          label='Tài khoản'
          colon={false}
          name='username'
          rules={rules.username}>
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label='Email'
          colon={false}
          name='emailAccount'
          // rules={rules.username}
          rules={[
            { type: "email", message: "Email không hợp lệ" },
            { required: true, message: "Vui lòng điền email" },
          ]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label='Mật khẩu'
          colon={false}
          name='password'
          rules={rules.password}>
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item
          label='Nhập lại mật khẩu'
          colon={false}
          name='confirmPassword'
          rules={rules.confirmPassword}>
          <Input.Password
            // addonBefore={<LockOutlined />}
            allowClear></Input.Password>
        </Form.Item>
        <Form.Item
          className={styles.lastName}
          rules={rules.realName}
          name='realName'
          colon={false}
          label='Tên đầy đủ'>
          <Input placeholder='Tên' allowClear></Input>
        </Form.Item>
        <Form.Item
          className={styles.lastName}
          rules={rules.phoneNumber}
          name='phoneNumber'
          colon={false}
          label='Số điện thoại'>
          <Input allowClear></Input>
        </Form.Item>
        <div className='flex items-center justify-between'>
          <Form.Item
            className={styles.lastName}
            rules={rules.gender}
            name='gender'
            colon={false}
            label='Giới tính'>
            <Radio.Group>
              <Radio value={1}>Nam</Radio>
              <Radio value={2}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            className={styles.lastName}
            rules={rules.dateOfBirth}
            name='dateOfBirth'
            colon={false}
            label='Ngày sinh'>
            <DatePicker disabledDate={disabledDate} />
          </Form.Item>
        </div>
        <div className='flex justify-between'>
          <Form.Item
            className={clsx(styles.lastName, "w-[50%]")}
            rules={rules.subject}
            name='subjects'
            colon={false}
            label='Môn học'>
            <Select options={SUBJECTS} />
          </Form.Item>
          <Form.Item
            className={clsx(styles.lastName, "w-[50%] ml-[20px]")}
            rules={rules.grade}
            name='grade'
            colon={false}
            label='Khối giảng dạy'>
            <Select options={GRADE} />
          </Form.Item>
        </div>

        <Form.Item
          name='frontIdFile'
          label='Mặt trước CCCD'
          colon={false}
          rules={rules.frontIdFile}>
          <Upload accept='.jpg, .jpeg, .png' maxCount={1}>
            <Button className='sm:w-[480px]'>Tải ảnh lên</Button>
          </Upload>
          {/* <input type='file'></input> */}
        </Form.Item>
        <Form.Item
          name='backIdFile'
          label='Mặt sau CCCD'
          colon={false}
          rules={rules.backIdFile}>
          <Upload accept='.jpg, .jpeg, .png' maxCount={1}>
            <Button className='sm:w-[480px]'>Tải ảnh lên</Button>
          </Upload>
          {/* <input type='file'></input> */}
        </Form.Item>

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
