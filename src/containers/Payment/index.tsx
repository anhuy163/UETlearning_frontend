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
    const { bank, bankAccount, realname, email, points } = e;
    // console.log(e);
    handlePayment({
      bank,
      bankId: bankAccount,
      point: points,
      email,
      fullName: realname,
    }).then((res: any) => {
      // console.log(res);
      showSuccessfulMessage(SUCCESSFUL_MESSAGE.PAYMENT);

      setTimeout(() => {
        router.push(HOME_PATH);
      }, 500);
    });
  };
  return <Payment onFinish={handleOnSubmit} loading={sendingPayment} />;
}
