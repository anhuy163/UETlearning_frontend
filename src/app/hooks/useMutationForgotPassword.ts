import { SERVER_BASE_URL } from "../constants";
import axios from "axios";
import { useMutation } from "react-query";

const useMutationForgotPassword = () => {
  const mutationFn = (body: any) => {
    return axios.post(`${SERVER_BASE_URL}/ums/forgetPassword/teacher`, body);
  };

  const { isLoading: loading, mutateAsync } = useMutation({
    mutationFn: (body: any) => mutationFn(body),
  });

  const doMutation = (body: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await mutateAsync(body);
        resolve((res as any)?.data);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { loading, doMutation };
};

export default useMutationForgotPassword;
