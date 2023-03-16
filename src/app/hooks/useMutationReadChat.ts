import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { SERVER_URL, SERVER_BASE_URL } from "../constants";

const useMutationReadChat = () => {
  const queryClient = useQueryClient();
  const mutationFn = (id: string) => {
    return axios.get(`${SERVER_BASE_URL}/chat/teacher/read?chatId=${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  };

  const {
    isLoading: loading,
    mutateAsync,
    error,
  } = useMutation({
    mutationFn: (id: string) => mutationFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries("useQueryGetContacts");
    },
  });

  const doMutation = (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await mutateAsync(id);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { doMutation, loading, error };
};

export default useMutationReadChat;
