import LayoutContainer from "@/src/containers/Layout";
import PaymentContainer from "@/src/containers/Payment";
import MyBreadcrumb from "@/src/components/MyBreadcrumb";
import { PAYMENT_PATH } from "@/src/app/constants";

export default function PaymentPage() {
  return (
    <LayoutContainer title='Thanh toán'>
      <div>
        <MyBreadcrumb path={PAYMENT_PATH} />
        <div className='w-full min-h-[calc(100vh_-_128px)] bg-white p-2 rounded-md items-center flex'>
          <PaymentContainer />
        </div>
      </div>
    </LayoutContainer>
  );
}
