import { Button, DatePicker, Form, Input, Modal } from "antd";
import styles from "./styles.module.less";
import FormWrapper from "@/src/containers/FormWrapper/FormWrapper";
import { FormOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { PopupAddEventProps } from "@/src/containers/PopupAddEvent";
import dayjs from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";

export default function PopupAddEvent(props: PopupAddEventProps) {
  const rules = {
    title: [
      { required: true, message: "Vui lòng điền sự kiện" },
      { max: 20, message: "Vui lòng không vượt quá 20 ký tự" },
    ],
    duration: [{ required: true, message: "Vui lòng điền thời gian " }],
    end: [{ required: true, message: "Vui lòng điền thời gian kết thúc" }],
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };
  return (
    <FormWrapper>
      <Modal {...props} closable={false} footer={null} destroyOnClose={true}>
        <p className='flex items-center justify-center text-slate-800 font-mono font-semibold text-2xl mb-2'>
          <FormOutlined />
          <span className='ml-2'>Thêm sự kiện</span>
        </p>
        <Form className={styles.container} onFinish={props.onFinish}>
          <Form.Item label='Tên' name={"title"} rules={rules.title}>
            <Input />
          </Form.Item>
          <Form.Item label='Thời gian' name={"duration"} rules={rules.duration}>
            <DatePicker.RangePicker
              //   disabledTime={disabledTime}
              disabledDate={disabledDate}
              showTime
              placeholder={["Bắt đầu", "Kết thúc"]}
            />
          </Form.Item>
          {/* <Form.Item label='Kết thúc' name={"end"} rules={rules.end}>
            <DatePicker />
          </Form.Item> */}
          <div className='flex items-center justify-center '>
            <Button onClick={props.onCancel}>Hủy</Button>
            <Button
              className={clsx(
                styles.submitBtn,
                "ml-2 bg-cyan-900 text-white border-none opacity-80 hover:opacity-100 "
              )}
              htmlType='submit'>
              Xác nhận
            </Button>
          </div>
        </Form>
      </Modal>
    </FormWrapper>
  );
}
