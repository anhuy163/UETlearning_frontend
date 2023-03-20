import { Button, Form, Input, Tooltip, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import styles from "./styles.module.less";
import clsx from "clsx";
import UserAvatar from "../UserAvatar";
import FormWrapper from "@/src/containers/FormWrapper/FormWrapper";
import {
  AVATAR_SIZE,
  HIDDEN_PASSWORD,
  GRADE,
  GENDER,
} from "@/src/app/constants";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { RcFile } from "antd/es/upload";
import UploadAvatar from "../UploadAvatar";
import PopupChangePasswordContainer from "@/src/containers/PopupChangePassword";
type UserInfoProps = {
  loading: boolean;
  defaultValues: any;
  onChange: (img: any) => void;
  onFinish: (value: any) => void;
};
export default function UserInfo(props: UserInfoProps) {
  const { defaultValues, onChange, onFinish } = props;
  const [form] = useForm();
  const rules = {
    firstname: [{ required: true, message: "Vui lòng không để trống" }],
    realname: [{ required: true, message: "Vui lòng không để trống" }],
    phone: [{ required: true, message: "Vui lòng không để trống" }],
    intro: [{ max: 100, message: "Không vượt quá 100 ký tự" }],
    grade: [{ required: true, message: "Vui lòng không để trống" }],
    gender: [{ required: true, message: "Vui lòng không để trống" }],
  };
  useEffect(() => {
    form.setFieldsValue({
      password: HIDDEN_PASSWORD,
      email: defaultValues?.email,
      birthday: defaultValues?.dateOfBirth,
      realname: defaultValues?.realName,
      subject: defaultValues?.subjects[0],
      phone: defaultValues?.phoneNumber,
      points: defaultValues?.point,
      priceChat: defaultValues?.priceChat,
      priceCall: defaultValues?.priceCall,
      grade: defaultValues?.course,
      gender: defaultValues?.gender,
      intro: defaultValues?.introduceMyself,
    });
  }, [defaultValues]);

  const handleOnCancelUpdate = () => {
    form.setFieldsValue({
      password: HIDDEN_PASSWORD,
      email: defaultValues?.email,
      birthday: defaultValues?.dateOfBirth,
      realname: defaultValues?.realName,
      subject: defaultValues?.subjects[0],
      phone: defaultValues?.phoneNumber,
      points: defaultValues?.point,
      priceChat: defaultValues?.priceChat,
      priceCall: defaultValues?.priceCall,
      grade: defaultValues?.course,
      gender: defaultValues?.gender,
      intro: defaultValues?.introduceMyself,
    });
  };
  const [togglePopupChangePassword, setTogglePopupChangePassword] =
    useState(false);
  const onOpenPopupChangePassword = () => {
    setTogglePopupChangePassword(true);
  };
  const onCancelPopupChangePassword = () => {
    setTogglePopupChangePassword(false);
  };
  const [base64url, setBase64Url] = useState("");
  const getBase64Img = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const onImgChangeHandler = (img: any) => {
    getBase64Img(img as RcFile, (url) => setBase64Url(url));
    onChange(img);
  };
  return (
    <div className={clsx(styles.infoWrapper)}>
      <FormWrapper className={styles.formWrapper} loading={props.loading}>
        <div className={styles.avatar}>
          <UserAvatar
            size={AVATAR_SIZE.LARGE}
            name={defaultValues?.realName}
            imgSrc={defaultValues?.avaPath}
            base64url={base64url}
          />
          <div className={styles.uploadAvatarBtn}>
            <UploadAvatar onChange={onImgChangeHandler} />
          </div>
        </div>
        <Form form={form} onFinish={onFinish}>
          <Form.Item label='Email' colon={false} name='email'>
            <Input bordered={false} readOnly />
          </Form.Item>
          {/* <div className={styles.password}>
            <Form.Item label='Mật khẩu' colon={false} name='password'>
              <Input.Password
                visibilityToggle={false}
                bordered={false}
                readOnly
              />
            </Form.Item>
            <Tooltip placement='right' title='Đổi mật khẩu'>
              <Button className={styles.changePwBtn} icon={<EditOutlined />} />
            </Tooltip>
          </div> */}
          <Form.Item label='Ngày sinh' colon={false} name='birthday'>
            <Input bordered={false} readOnly />
          </Form.Item>
          <Form.Item label='Điểm' colon={false} name='points'>
            <Input bordered={false} readOnly />
          </Form.Item>
          <Form.Item
            label='Họ và tên'
            colon={false}
            rules={rules.realname}
            name='realname'>
            <Input />
          </Form.Item>
          <div className='w-full flex items-center justify-between'>
            <Form.Item
              className='w-[45%]'
              label='Môn học'
              colon={false}
              name='subject'>
              <Input bordered={false} readOnly />
            </Form.Item>
            <Form.Item
              className='w-[45%]'
              label='Khối giảng dạy'
              rules={rules.grade}
              colon={false}
              name='grade'>
              <Select options={GRADE} />
            </Form.Item>
          </div>

          <div className='w-full flex items-center justify-between'>
            <Form.Item
              className='w-[45%]'
              label='Giới tính'
              colon={false}
              rules={rules.gender}
              name='gender'>
              <Select options={GENDER} />
            </Form.Item>
            <Form.Item
              className='w-[45%]'
              label='Điện thoại'
              colon={false}
              rules={rules.phone}
              name='phone'>
              <Input />
            </Form.Item>
          </div>
          <div className='w-full flex items-center justify-between'>
            <Form.Item
              className='w-[45%]'
              label='Phí cuộc gọi'
              colon={false}
              rules={rules.phone}
              name='priceCall'>
              <Input type='number' max={100} min={5} />
            </Form.Item>
            <Form.Item
              className='w-[45%]'
              label='Phí tin nhắn'
              colon={false}
              rules={rules.phone}
              name='priceChat'>
              <Input type='number' max={100} min={5} />
            </Form.Item>
          </div>
          <Form.Item
            label='Giới thiệu'
            colon={false}
            rules={rules.intro}
            name='intro'>
            <Input.TextArea />
          </Form.Item>

          <div
            className={clsx(
              styles.buttonArea,
              "w-full flex items-center justify-center"
            )}>
            <Button
              onClick={handleOnCancelUpdate}
              className='bg-slate-800 opacity-80 hover:opacity-100 mr-2'>
              Hủy
            </Button>
            <Button
              className='bg-cyan-800 opacity-80 hover:opacity-100 mr-2'
              htmlType='submit'>
              Xác nhận
            </Button>
            <Button
              onClick={onOpenPopupChangePassword}
              className='bg-cyan-900 opacity-80 hover:opacity-100'>
              Đổi mật khẩu
            </Button>
          </div>
        </Form>
      </FormWrapper>
      <PopupChangePasswordContainer
        open={togglePopupChangePassword}
        onCancel={onCancelPopupChangePassword}
      />
    </div>
  );
}
