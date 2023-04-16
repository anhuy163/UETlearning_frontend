import React from "react";
import Payment from "@/src/components/Payment";
import useMutationPayment from "@/src/app/hooks/useMutationPayment";
import { HOME_PATH, SUCCESSFUL_MESSAGE, TEXT } from "@/src/app/constants";
import { useRouter } from "next/router";
import { showSuccessfulMessage } from "@/src/app/helpers/messageHelper";

export default function PaymentContainer() {
  const router = useRouter();
  const { doMutation: handlePayment, loading: sendingPayment } =
    useMutationPayment();
  const handleOnSubmit = (e: any) => {
    console.log(e);
    // handlePayment({}).then((res: any) => {
    //   console.log(res?.data?.data);
    //   showSuccessfulMessage(SUCCESSFUL_MESSAGE.PAYMENT);
    //   router.push(HOME_PATH);
    // });
  };
  return <Payment onFinish={handleOnSubmit} loading={sendingPayment} />;
}
