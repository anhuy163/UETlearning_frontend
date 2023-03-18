import React from "react";
import LoginForm from "@/src/components/LoginForm";
import useAuth, { LoginBody } from "@/src/app/hooks/useAuth";
import { showErrorMessage } from "@/src/app/helpers/messageHelper";
import { HOME_PATH, ERROR_MESSAGE } from "@/src/app/constants";

export default function LoginFormContainer() {
  const { loginLoading, login } = useAuth();
  const handleOnLogin = (value: LoginBody) => {
    console.log(value);

    login({ ...value, tokenDevice: localStorage.getItem("deviceToken") })
      .then((res: any) => {
        if ((res as any).data.code !== 0)
          return showErrorMessage(ERROR_MESSAGE.LOGIN);
        // console.log(res);

        localStorage.setItem("currentUser", JSON.stringify(res?.data.object));
        localStorage.setItem("token", res.data.object.token);
        localStorage.setItem("loginTime", new Date().getTime().toString());
        localStorage.setItem("teacherId", res?.data.object.id);
        window.location.replace(HOME_PATH);
      })
      .catch((err) => console.log(err));
  };
  return <LoginForm onFinish={handleOnLogin} />;
}
