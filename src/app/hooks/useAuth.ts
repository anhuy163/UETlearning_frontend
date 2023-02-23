import { LOGIN_PATH } from "@/src/app/constants";
import { useMutation } from "react-query";
import { SERVER_URL } from "../constants";
import axios from "axios";

export type LoginBody = {
  email: string;
  password: string;
};

const useAuth = () => {
  const mutationFn = (body: LoginBody) => {
    return axios.post(`${SERVER_URL}/login`, body);
  };

  const { isLoading: loading, mutateAsync } = useMutation({
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
    localStorage.removeItem("currentUser");
    window.location.replace(LOGIN_PATH);
  };

  return { loading, login, logout };
};

export default useAuth;
