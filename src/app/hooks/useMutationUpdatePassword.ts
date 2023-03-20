import { useMutation } from "react-query";
import { SERVER_BASE_URL } from "../constants";
import axios from "axios";

const useMutationChangePassword = () => {
  const mutationFn = (body: any) => {
    return axios.post(
      `${SERVER_BASE_URL}/ums/session/teacher/updatePassWord`,
      body,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
  };

  const { isLoading: loading, mutateAsync } = useMutation({
    mutationFn: (body) => mutationFn(body),
  });

  const doMutation = (body: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await mutateAsync(body);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };
  return { doMutation, loading };
};

export default useMutationChangePassword;
