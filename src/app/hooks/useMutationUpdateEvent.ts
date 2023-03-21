import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { SERVER_BASE_URL, SUCCESSFUL_MESSAGE } from "../constants";
import axios from "axios";
import { showSuccessfulMessage } from "../helpers/messageHelper";

const useMutationUpdateEvent = () => {
  const queryClient = useQueryClient();
  const mutationFn = (body: any) => {
    return axios.put(`${SERVER_BASE_URL}/ums/schedule/update`, body, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  };
  const { isLoading: loading, mutateAsync } = useMutation({
    mutationFn: (body: any) => mutationFn(body),
    onSuccess: () => {
      queryClient.invalidateQueries("useQuerygetEvents"),
        queryClient.invalidateQueries(
          `useQueryGetEventById=64186ce2c397c11336e41026`
        );
      showSuccessfulMessage(SUCCESSFUL_MESSAGE.EVENT_UPDATE);
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

export default useMutationUpdateEvent;
