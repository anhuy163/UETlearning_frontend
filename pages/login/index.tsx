import AuthLayout from "@/src/containers/AuthLayout";
import LoginFormContainer from "@/src/containers/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout title='Đăng nhập'>
      <LoginFormContainer />
    </AuthLayout>
  );
}
