import { useQuery } from "react-query";
import axios from "axios";
import { SERVER_BASE_URL } from "../constants";

const useQueryGetPostById = (id: string) => {
  const queryFn = () => {
    return axios.get(`${SERVER_BASE_URL}/post/detail?id=${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  };

  const {
    data: result,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: `useQueryGetPostById=${id}`,
    queryFn: () => queryFn(),
  });

  return {
    data: (result as any)?.data?.object || [],
    loading,
    error,
  };
};

export default useQueryGetPostById;
