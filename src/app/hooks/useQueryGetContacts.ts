import { SERVER_BASE_URL } from "./../constants";
import { useQuery } from "react-query";
import axios from "axios";

const useQueryGetContacts = () => {
  const queryFn = () => {
    return axios.get(`${SERVER_BASE_URL}/chat/teacher`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  };

  const {
    data: result,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: "useQueryGetContacts",
    queryFn: () => queryFn(),
  });

  return { data: (result as any)?.data?.object || [], loading, error };
};

export default useQueryGetContacts;
