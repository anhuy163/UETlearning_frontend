import { Button, DatePicker, Form, Input, Modal, Popconfirm } from "antd";
import styles from "./styles.module.less";
import FormWrapper from "@/src/containers/FormWrapper/FormWrapper";
import { FormOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { PopupAddEventProps } from "@/src/containers/PopupAddEvent";
import dayjs from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";
import { TEXT } from "@/src/app/constants";
import moment from "moment";

type PopupEventComponentProps = {
  open: boolean;
  onCancel: () => void;
  onFinish: (e: any) => void;
  defaultValues: any;
  event: string | undefined;
  loading: boolean;
};

export default function PopupAddEvent({
  defaultValues = undefined,
  loading,
  ...props
}: PopupEventComponentProps) {
  const locale = {
    lang: {
      locale: "en",
      ok: TEXT.OK,
      // clear: TEXT.CANCEL,
    },
  };

  const rules = {
    title: [
      { required: true, message: "Vui lòng điền sự kiện" },
      { max: 20, message: "Vui lòng không vượt quá 20 ký tự" },
    ],
    description: [{ max: 50, message: "Vui lòng không vượt quá 20 ký tự" }],
    duration: [{ required: true, message: "Vui lòng điền thời gian " }],
    end: [{ required: true, message: "Vui lòng điền thời gian kết thúc" }],
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs();
  };
  return (
    <Modal {...props} closable={false} footer={null} destroyOnClose={true}>
      <FormWrapper loading={loading}>
        <p className='flex items-center justify-center text-slate-800 font-mono font-semibold text-2xl mb-2'>
          <FormOutlined />
          <span className='ml-2'>
            {defaultValues ? TEXT.EDIT_EVENT_TITLE : TEXT.ADD_EVENT_TITLE}
          </span>
        </p>
        <Form
          className={styles.container}
          onFinish={props.onFinish}
          initialValues={{
            title: defaultValues?.title,
            desciprtion: defaultValues?.data,
            duration: [
              moment(defaultValues?.scheduleTime),
              moment(defaultValues?.endTime),
            ],
          }}>
          <Form.Item label='Tên' name={"title"} rules={rules.title}>
            <Input />
          </Form.Item>
          <Form.Item
            label='Ghi chú'
            name={"description"}
            rules={rules.description}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label='Thời gian' name={"duration"} rules={rules.duration}>
            <DatePicker.RangePicker
              // defaultPickerValue={defaultValues?.duration}
              locale={locale as any}
              //   disabledTime={disabledTime}
              disabledDate={disabledDate}
              showTime
              placeholder={["Bắt đầu", "Kết thúc"]}
            />
          </Form.Item>

          <div className='flex items-center justify-center '>
            {defaultValues && (
              <Popconfirm
                title={"Xóa sự kiện"}
                description={`${TEXT.DELETE_EVENT_WARNING}`}
                // onConfirm={() => handleOnDeleteEvent(event)}
                okButtonProps={{ type: "default" }}
                cancelButtonProps={{
                  type: "dashed",
                }}
                cancelText={TEXT.CANCEL}
                okText={TEXT.OK}>
                <Button
                  className={clsx(
                    styles.submitBtn,
                    "mr-2 bg-red-600 text-white border-none opacity-80 hover:opacity-100 "
                  )}>
                  Xóa sự kiện
                </Button>
              </Popconfirm>
            )}
            <Button
              className={clsx(
                styles.submitBtn,
                "mr-2 bg-cyan-900 text-white border-none opacity-80 hover:opacity-100 "
              )}
              htmlType='submit'>
              Xác nhận
            </Button>
            <Button onClick={props.onCancel}>Hủy</Button>
          </div>
        </Form>
      </FormWrapper>
    </Modal>
  );
}
