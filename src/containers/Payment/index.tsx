import React from "react";
import Payment from "@/src/components/Payment";

export default function PaymentContainer() {
  const handleOnSubmit = (e: any) => {
    console.log(e);
  };
  return <Payment onFinish={handleOnSubmit} />;
}
