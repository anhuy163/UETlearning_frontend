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
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";

type PopupEventComponentProps = {
  open: boolean;
  onCancel: () => void;
  defaultValues: any;
  event: string | undefined;
  loading: boolean;
  onDeleteEvent: (id: any) => void;
  onFinish: (e: any) => void;
  disableButton: boolean;
  onDisableButton: (tmp: boolean) => void;
};

export default function PopupAddEvent({
  defaultValues = undefined,
  loading,
  onDeleteEvent,
  ...props
}: PopupEventComponentProps) {
  const locale = {
    lang: {
      locale: "en",
      ok: TEXT.OK,
      // clear: TEXT.CANCEL,
    },
  };

  const handleFieldsChange = (changedFields: any, allFields: any) => {
    // console.log("Changed fields:", changedFields);
    // console.log("All fields:", allFields);
    props.onDisableButton(false);
  };
  const handleOnCancelPopup = () => {
    form.resetFields();
    props.onDisableButton(true);
    props.onCancel();
  };
  const [form] = useForm();
  useEffect(() => {
    // console.log(defaultValues);

    form.setFieldsValue({
      scheduleId: props.event,
      title: defaultValues?.title,
      description: defaultValues?.data,
      email: defaultValues?.email,
      duration: [
        defaultValues ? moment(defaultValues?.scheduleTime) : null,
        defaultValues ? moment(defaultValues?.endTime) : null,
      ],
    });
  }, [defaultValues]);

  const handleOnCloseModal = () => {
    form.resetFields();
    props.onDisableButton(true);
    props.onCancel();
  };

  // const handleOnSubmit = (e: any) => {
  //   props.onFinish(e);
  //   form.resetFields();
  // };

  // console.log(form.getFieldValue("duration"));
  const handleOnFinish = (e: any) => {
    form.resetFields();
    props.onFinish(e);
  };

  const rules = {
    title: [
      { required: true, message: "Vui lòng điền sự kiện" },
      { max: 20, message: "Vui lòng không vượt quá 20 ký tự" },
    ],
    description: [{ max: 50, message: "Vui lòng không vượt quá 50 ký tự" }],
    email: [
      { max: 50, message: "Vui lòng không vượt quá 50 ký tự" },
      { type: "email", message: "Email không hợp lệ" },
    ],
    duration: [{ required: true, message: "Vui lòng điền thời gian " }],
    end: [{ required: true, message: "Vui lòng điền thời gian kết thúc" }],
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs();
  };

  return (
    <Modal
      {...props}
      closable={false}
      footer={null}
      // destroyOnClose={true}
      onCancel={handleOnCloseModal}
      width={720}>
      <FormWrapper loading={loading}>
        <p className="flex items-center justify-center text-slate-800 font-mono font-semibold text-2xl mb-2">
          <FormOutlined />
          <span className="ml-2">
            {defaultValues ? TEXT.EDIT_EVENT_TITLE : TEXT.ADD_EVENT_TITLE}
          </span>
        </p>
        <Form
          onFieldsChange={handleFieldsChange}
          form={form}
          className={styles.container}
          onFinish={handleOnFinish}>
          <Form.Item name={"scheduleId"} hidden>
            <Input />
          </Form.Item>
          <Form.Item label="Tên" name={"title"} rules={rules.title}>
            <Input />
          </Form.Item>
          <Form.Item
            colon={false}
            label="Ghi chú"
            name={"description"}
            rules={rules.description}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            colon={false}
            label="Email học sinh"
            name={"email"}
            rules={[
              { max: 50, message: "Vui lòng không vượt quá 50 ký tự" },
              { type: "email", message: "Email không hợp lệ" },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item label="Thời gian" name={"duration"} rules={rules.duration}>
            <DatePicker.RangePicker
              locale={locale as any}
              //   disabledTime={disabledTime}
              disabledDate={disabledDate}
              showTime
              placeholder={["Bắt đầu", "Kết thúc"]}
            />
          </Form.Item>

          <div className="flex items-center justify-center ">
            {defaultValues && (
              <Popconfirm
                title={"Xóa sự kiện"}
                description={`${TEXT.DELETE_EVENT_WARNING}`}
                onConfirm={onDeleteEvent}
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
              htmlType="submit"
              disabled={props.disableButton}>
              Xác nhận
            </Button>
            <Button onClick={handleOnCancelPopup}>Hủy</Button>
          </div>
        </Form>
      </FormWrapper>
    </Modal>
  );
}
