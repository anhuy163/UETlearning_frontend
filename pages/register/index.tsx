import AuthLayout from "@/src/containers/AuthLayout";
import RegisterFormContainer from "@/src/containers/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout title='Đăng ký'>
      <RegisterFormContainer />
    </AuthLayout>
  );
}
