import React from "react";
import PopupChangePassword from "@/src/components/PopupChangePassword";
import useMutationChangePassword from "@/src/app/hooks/useMutationUpdatePassword";
import {
  showErrorMessage,
  showSuccessfulMessage,
} from "@/src/app/helpers/messageHelper";
import { ERROR_MESSAGE, SUCCESSFUL_MESSAGE } from "@/src/app/constants";
import useAuth from "@/src/app/hooks/useAuth";

type PopupChangePasswordProps = {
  open: boolean;
  onCancel: () => void;
};

export default function PopupChangePasswordContainer(
  props: PopupChangePasswordProps
) {
  const { doMutation, loading } = useMutationChangePassword();
  const { logout } = useAuth();
  const handleOnChangePassword = (value: any) => {
    console.log(value);
    if (value?.newPassword !== value?.reNewPassword) {
      return showErrorMessage(ERROR_MESSAGE.CHANGE_PASSWORD_CF);
    }
    doMutation({ passWord: value?.newPassword }).then((res) => {
      console.log(res);
      showSuccessfulMessage(SUCCESSFUL_MESSAGE.CHANGE_PASSWORD);
      props.onCancel();
      logout();
    });
  };
  return <PopupChangePassword {...props} onFinish={handleOnChangePassword} />;
}
