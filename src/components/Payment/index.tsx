import { Button, Form, Input, Select, InputNumber } from "antd";
import {} from "@ant-design/icons";
import clsx from "clsx";
import styles from "./styles.module.less";
import FormWrapper from "@/src/containers/FormWrapper/FormWrapper";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useAppSelector } from "@/src/app/hooks/useRedux";
import { BANK_OPTIONS, MIN_SUM_OF_POINTS } from "@/src/app/constants";
import withdraw_img from "../../app/assets/withdraw.png";
import Image from "next/image";

type PaymentProps = {
  onFinish: (e: any) => void;
  loading: boolean;
};

export default function Payment(props: PaymentProps) {
  const [form] = useForm();
  const [moneySum, setMoneySum] = useState<number>(0);
  const user = useAppSelector((state) => state.user);

  //   const validatePointInput = (rule: any, value: any, callback: any) => {
  //     if (value < MIN_SUM_OF_POINTS || value > user?.point) {
  //       callback(`Số điểm rút phải nằm trong khoảng 10000 - ${user?.point}`);
  //     }
  //   };
  const rules = {
    email: [
      { required: true, message: "Vui lòng nhập email" },
      { type: "email", message: "Email không hợp lệ" },
    ],
    bank: [{ required: true, message: "Vui lòng chọn ngân hàng" }],
    realName: [{ required: true, message: "Vui lòng nhập tên chủ tài khoản" }],
    bankAccount: [{ required: true, message: "Vui lòng nhập STK ngân hàng" }],
    points: [
      { required: true, message: "Vui lòng nhập số điểm muốn rút" },
      //   { validator: validatePointInput },
      //   { max: user?.point.toString().length },
    ],
  };

  const onPointChange = (e: any) => {
    setMoneySum(e.target.value / 10);
  };
  return (
    <div className={clsx(styles.infoWrapper)}>
      <Image alt="123" src={withdraw_img} className={styles.img} />
      <FormWrapper className={styles.formWrapper} loading={props.loading}>
        <Form form={form} onFinish={props.onFinish}>
          <Form.Item
            label="Email nhận thư"
            colon={false}
            rules={rules.email as any}
            name="email">
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngân hàng"
            colon={false}
            name="bank"
            rules={rules.bank}>
            <Select options={BANK_OPTIONS} />
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            colon={false}
            rules={rules.realName}
            name="realname">
            <Input />
          </Form.Item>
          <Form.Item
            label="STK ngân hàng"
            colon={false}
            rules={rules.bankAccount}
            name="bankAccount">
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điểm muốn rút"
            colon={false}
            name="points"
            rules={rules.points}>
            <Input
              type="number"
              min={MIN_SUM_OF_POINTS}
              max={user?.point >= MIN_SUM_OF_POINTS ? user?.point : 11000}
              disabled={user?.point < MIN_SUM_OF_POINTS}
              onChange={onPointChange}
            />
          </Form.Item>
          <div className="text-sm font-semibold text-cyan-600 flex flex-row-reverse items-center">
            Số điểm tối thiểu của bạn phải là {MIN_SUM_OF_POINTS}{" "}
            <span className="text-red-600 text-xl">*</span>
          </div>
          <div className="text-2xl font-semibold text-center mt-4">
            Số tiền được quy đổi:{" "}
            <span className="text-red-500">{moneySum}</span> VND
          </div>
          <Form.Item>
            <div
              className={clsx(
                styles.buttonArea,
                "w-full flex items-center justify-center mt-3"
              )}>
              <Button
                //   onClick={handleOnCancelUpdate}
                className="bg-slate-800 opacity-80 hover:opacity-100 mr-2">
                Hủy
              </Button>
              <Button
                disabled={user?.point < MIN_SUM_OF_POINTS}
                className="bg-cyan-800 opacity-80 hover:opacity-100 mr-2"
                htmlType="submit">
                Xác nhận
              </Button>
            </div>
          </Form.Item>
        </Form>
      </FormWrapper>
    </div>
  );
}
