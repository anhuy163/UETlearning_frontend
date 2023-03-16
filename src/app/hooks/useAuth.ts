import { useState } from "react";
import { LOGIN_PATH } from "@/src/app/constants";
import { useMutation } from "react-query";
import { SERVER_URL } from "../constants";
import { TOKEN_EXPIRATION_CHECK_PERIOD_MS } from "@/src/app/constants";
import axios from "axios";

export type LoginBody = {
  email: string;
  password: string;
  tokenDevice: any;
};

const useAuth = () => {
  const checkTokenIsExpired = () => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("refreshing token");

        const result = await axios.post(`${SERVER_URL}/refresh_token`, null, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  };
  const mutationFn = (body: LoginBody) => {
    return axios.post(`${SERVER_URL}`, body);
  };

  const { isLoading: loginLoading, mutateAsync } = useMutation({
    mutationFn: (body: LoginBody) => mutationFn(body),
  });

  const login = (body: LoginBody) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await mutateAsync(body);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  };

  const logout = () => {
    // console.log("logout");

    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    window.location.replace(LOGIN_PATH);
  };

  return { loginLoading, login, logout, checkTokenIsExpired };
};

export default useAuth;
