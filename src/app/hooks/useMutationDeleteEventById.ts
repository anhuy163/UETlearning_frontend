import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { SERVER_BASE_URL, SUCCESSFUL_MESSAGE } from "../constants";
import axios from "axios";
import { showSuccessfulMessage } from "../helpers/messageHelper";

const useMutationDeleteEventById = () => {
  const queryClient = useQueryClient();
  const mutationFn = (id: any) => {
    return axios.delete(
      `${SERVER_BASE_URL}/ums/schedule/remove?scheduleId=${id}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
  };
  const { isLoading: loading, mutateAsync } = useMutation({
    mutationFn: (id: any) => mutationFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries("useQuerygetEvents"),
        showSuccessfulMessage(SUCCESSFUL_MESSAGE.EVENT_DELETE);
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

export default useMutationDeleteEventById;
