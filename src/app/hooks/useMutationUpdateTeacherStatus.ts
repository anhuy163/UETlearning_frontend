import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { SERVER_URL } from "../constants";
import { showSuccessfulMessage } from "../helpers/messageHelper";
import useLazyQueryGetProfile from "./useLazyGetTeacherProfile";

const useMutationUpdateTeacherStatus = () => {
  const { fetchData: fetchProfile } = useLazyQueryGetProfile();
  const queryClient = useQueryClient();
  const muatationFn = (body: any) => {
    return axios.put(`${SERVER_URL}/updateStatusTeacher`, body, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  };

  const {
    isLoading: loading,
    error,
    mutateAsync,
  } = useMutation({
    mutationFn: (body) => muatationFn(body),
    onSuccess: () => {
      //   showSuccessfulMessage("Cập nhật hồ sơ thành công");
      //   queryClient.invalidateQueries("useQueryGetTeacherProfile");
      fetchProfile(true);
    },
  });

  const doMutation = (body: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await mutateAsync(body as never);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { doMutation, loading };
};

export default useMutationUpdateTeacherStatus;
