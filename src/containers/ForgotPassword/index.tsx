import ForgotPasswordForm from "@/src/components/ForgotPassword";
import useMutationForgotPassword from "@/src/app/hooks/useMutationForgotPassword";
import {
  showErrorMessage,
  showSuccessfulMessage,
} from "@/src/app/helpers/messageHelper";
import {
  ERROR_MESSAGE,
  LOGIN_PATH,
  SUCCESSFUL_MESSAGE,
} from "@/src/app/constants";
import { useRouter } from "next/router";

export default function ForgotPasswordFormContainer() {
  const { doMutation, loading } = useMutationForgotPassword();
  const router = useRouter();
  const handleOnFinish = (value: any) => {
    const { email } = value;
    // console.log(value);
    doMutation({ email }).then((res: any) => {
      console.log(res);
      if (res?.code === 0) {
        showSuccessfulMessage(SUCCESSFUL_MESSAGE.FORGOT_PASSWORD);
        setTimeout(() => {
          router.push(LOGIN_PATH);
        }, 600);
        return;
      }
      showErrorMessage(ERROR_MESSAGE.FORGOT_PASSWORD);
    });
  };
  return <ForgotPasswordForm onFinish={handleOnFinish} loading={loading} />;
}
