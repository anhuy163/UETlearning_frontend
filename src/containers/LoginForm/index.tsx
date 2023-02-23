import React from "react";
import LoginForm from "@/src/components/LoginForm";
import useAuth, { LoginBody } from "@/src/app/hooks/useAuth";
import showErrorMessage from "@/src/app/helpers/messageHelper";
import { HOME_PATH } from "@/src/app/constants";

export default function LoginFormContainer() {
  const { loading, login } = useAuth();
  const handleOnLogin = (value: LoginBody) => {
    console.log(value);
    localStorage.setItem("currentUser", "user");
    window.location.replace(HOME_PATH);
    // login(value)
    //   .then((res) => {
    //     if ((res as any).data.code !== 0)
    //       return showErrorMessage("Tài khoản hoặc mật khẩu không đúng!");
    //     window.location.replace(HOME_PATH);
    //   })
    //   .catch((err) => console.log(err));
  };
  return <LoginForm onFinish={handleOnLogin} />;
}
