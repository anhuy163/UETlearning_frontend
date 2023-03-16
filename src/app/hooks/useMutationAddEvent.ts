import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { SERVER_BASE_URL, SUCCESSFUL_MESSAGE } from "../constants";
import axios from "axios";
import { showSuccessfulMessage } from "../helpers/messageHelper";

const useMutationAddEvent = () => {
  const queryClient = useQueryClient();
  const mutationFn = (body: any) => {
    return axios.post(`${SERVER_BASE_URL}/ums/schedule/teacherCreate`, body, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  };
  const { isLoading: loading, mutateAsync } = useMutation({
    mutationFn: (body: any) => mutationFn(body),
    onSuccess: () => {
      queryClient.invalidateQueries("useQuerygetEvents"),
        showSuccessfulMessage(SUCCESSFUL_MESSAGE.EVENT_CREATE);
    },
  });

  const doMutation = (body: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await mutateAsync(body);
        resolve((res as any)?.data.object);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { loading, doMutation };
};

export default useMutationAddEvent;
