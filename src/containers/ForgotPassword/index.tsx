import ForgotPasswordForm from "@/src/components/ForgotPassword";

export default function ForgotPasswordFormContainer() {
  const handleOnFinish = (value: any) => {
    console.log(value);
  };
  return <ForgotPasswordForm onFinish={handleOnFinish} />;
}
