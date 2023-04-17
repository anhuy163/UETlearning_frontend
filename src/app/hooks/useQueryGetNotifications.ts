import { useQuery } from "react-query";
import axios from "axios";
import { SERVER_BASE_URL } from "../constants";

const useQueryGetNotifications = () => {
  const queryFn = () => {
    return axios.get(
      `${SERVER_BASE_URL}/notification/getNotifications?page=0&size=20&types=8,9`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
  };

  const {
    data: result,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: "useQueryGetNotifications",
    queryFn: () => queryFn(),
  });

  return {
    data: (result as any)?.data?.object || [],
    loading,
    error,
    refetch,
  };
};

export default useQueryGetNotifications;
