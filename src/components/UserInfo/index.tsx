import { Button, Form, Input, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import styles from "./styles.module.less";
import clsx from "clsx";
import UserAvatar from "../UserAvatar";
import FormWrapper from "@/src/containers/FormWrapper/FormWrapper";
import { AVATAR_SIZE, HIDDEN_PASSWORD } from "@/src/app/constants";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { RcFile } from "antd/es/upload";
import UploadAvatar from "../UploadAvatar";
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
  };
  useEffect(() => {
    form.setFieldsValue({
      password: HIDDEN_PASSWORD,
      email: defaultValues?.email,
      birthday: defaultValues?.dateOfBirth,
      realname: defaultValues?.realName,
      subject: defaultValues?.subjects[0],
      phone: defaultValues?.phoneNumber,
    });
  }, [defaultValues]);

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
          <div className={styles.password}>
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
          </div>
          <Form.Item label='Ngày sinh' colon={false} name='birthday'>
            <Input bordered={false} readOnly />
          </Form.Item>
          <Form.Item label='Môn học' colon={false} name='subject'>
            <Input bordered={false} readOnly />
          </Form.Item>

          <Form.Item
            label='Họ và tên'
            colon={false}
            rules={rules.realname}
            name='realname'>
            <Input />
          </Form.Item>
          <Form.Item
            label='Điện thoại'
            colon={false}
            rules={rules.phone}
            name='phone'>
            <Input />
          </Form.Item>

          <div className={styles.buttonArea}>
            <Button htmlType='submit'>Xác nhận</Button>
          </div>
        </Form>
      </FormWrapper>
    </div>
  );
}
