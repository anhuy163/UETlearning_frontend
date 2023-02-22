import { Button, Form, Input, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import styles from "./styles.module.less";
import clsx from "clsx";
import UserAvatar from "../UserAvatar";
import FormWrapper from "@/src/containers/FormWrapper/FormWrapper";
import { AVATAR_SIZE } from "@/src/app/constants";
export default function UserInfo() {
  const rules = {
    firstname: [{ required: true, message: "Vui lòng không để trống" }],
    name: [{ required: true, message: "Vui lòng không để trống" }],
    phone: [{ required: true, message: "Vui lòng không để trống" }],
    // address: [{ required: true, message: "Vui lòng không để trống" }],
  };
  return (
    <div className={clsx(styles.infoWrapper)}>
      <FormWrapper className={styles.formWrapper}>
        <div className='flex items-center justify-center mb-3 mt-5'>
          <UserAvatar size={AVATAR_SIZE.LARGE} name='An Huy' />
        </div>
        <Form>
          <Form.Item label='Tài khoản' colon={false} name='username'>
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
          <Form.Item
            label='Họ'
            colon={false}
            rules={rules.name}
            name='firstname'>
            <Input />
          </Form.Item>
          <Form.Item label='Tên' colon={false} rules={rules.name} name='name'>
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
