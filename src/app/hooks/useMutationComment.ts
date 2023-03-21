import { useMutation } from "react-query";
import axios from "axios";
import { useQueryClient } from "react-query";
import { SERVER_BASE_URL } from "../constants";

const useMutationComment = (id: string) => {
  const queryClient = useQueryClient();
  const mutationFn = (body: any) => {
    return axios.post(`${SERVER_BASE_URL}`, body, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  };

  const { isLoading: loading, mutateAsync } = useMutation({
    mutationFn: (body: any) => mutationFn(body),
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
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

export default useMutationComment;
