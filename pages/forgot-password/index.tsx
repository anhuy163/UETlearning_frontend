import AuthLayout from "@/src/containers/AuthLayout";
import ForgotPasswordFormContainer from "@/src/containers/ForgotPassword";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title='Quên mật khẩu'>
      <ForgotPasswordFormContainer />
    </AuthLayout>
  );
}
