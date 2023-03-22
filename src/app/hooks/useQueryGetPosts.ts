import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { SERVER_BASE_URL } from "../constants";
import { useAppSelector } from "./useRedux";

const useQueryGetPosts = (params: number) => {
  const currentUser = useAppSelector((state) => state.user);

  const queryFn = () => {
    return axios.get(
      params === 1
        ? `${SERVER_BASE_URL}/post/searchQuestions?page=0&size=50`
        : params === 2
        ? `${SERVER_BASE_URL}/post/searchQuestions?page=0&size=50&course=${currentUser.course}`
        : `${SERVER_BASE_URL}/post/searchQuestions?page=0&size=50&tab=${params}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
  };

  const {
    data: result,
    isLoading: loading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: "useQueryGetPosts",
    queryFn: () => queryFn(),
  });

  useEffect(() => {
    refetch();
  }, [params]);

  return {
    data: (result as any)?.data?.object || [],
    loading,
    error,
    isFetching,
  };
};

export default useQueryGetPosts;
