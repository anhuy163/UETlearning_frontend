import { useMutation } from "react-query";
import axios from "axios";
import { SERVER_URL } from "../constants";

export type RegisterBody = {
  realName: string;
  emailAccount: string;
  isActive: boolean;
  username: string;
  password: string;
  type: number;
  dateOfBirth: string;
  phoneNumber: string;
  gender: number;
  status: number;
  point: number;
  course: number;
  subject: string;
};

const useMutationRegister = () => {
  const mutationFn = (body: RegisterBody) => {
    return axios.post(`${SERVER_URL}/register`, body);
  };

  const { isLoading: loading, mutateAsync } = useMutation({
    mutationFn: (body: RegisterBody) => mutationFn(body),
  });

  const register = (body: RegisterBody) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await mutateAsync(body);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { loading, register };
};

export default useMutationRegister;
