import { useQuery } from "react-query";
import axios from "axios";
import { SERVER_BASE_URL } from "../constants";

const useQueryGetConversation = (studentId: string, page: number) => {
  //   console.log(localStorage.getItem("currentUser"));

  const queryFn = () => {
    return axios.get(
      `${SERVER_BASE_URL}/chat/getMessage?studentId=${studentId}&teacherId=${
        JSON.parse(localStorage.getItem("currentUser")!).id
      }&page=${page}&size=20`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
  };

  const {
    data: result,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: "useQueryGetConversation",
    queryFn: () => queryFn(),
  });

  return { data: (result as any)?.data?.object || [], loading, error };
};

export default useQueryGetConversation;
