import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { SERVER_BASE_URL } from "../constants";

const useMutationSendMessage = () => {
  const queryClient = useQueryClient();
  const mutationFn = (msg: any) => {
    return axios.post(`${SERVER_BASE_URL}/chat/teacher`, msg, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  };

  const {
    isLoading: loading,
    mutateAsync,
    error,
  } = useMutation({
    mutationFn: (msg: any) => mutationFn(msg),
    onSuccess: () => {
      //   queryClient.invalidateQueries("useQueryGetConversation");
    },
  });

  const doMutation = (msg: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await mutateAsync(msg as never);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { doMutation, loading, error };
};

export default useMutationSendMessage;
