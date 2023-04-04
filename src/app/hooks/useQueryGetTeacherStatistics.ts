import { useEffect } from "react";
import { useQuery } from "react-query";
import { SERVER_BASE_URL } from "../constants";
import axios from "axios";

const useQueryGetTeacherStatistics = (params: string) => {
  const queryFn = () => {
    return axios.get(`${SERVER_BASE_URL}/payment/statistical?type=${params}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  };
  const {
    data: res,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: "useQueryGetTeacherStatistic",
    queryFn: () => queryFn(),
  });

  useEffect(() => {
    refetch();
  }, [params]);

  return { data: (res as any)?.data?.object, loading, error };
};

export default useQueryGetTeacherStatistics;
