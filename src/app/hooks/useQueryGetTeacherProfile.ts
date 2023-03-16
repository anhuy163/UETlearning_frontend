import axios from "axios";
import { SERVER_URL } from "../constants";
import { useQuery } from "react-query";

const useQueryGetTeacherProfile = () => {
  const query = () => {
    return axios.get(SERVER_URL, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  };

  const {
    data: result,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: "useQueryGetTeacherProfile",
    queryFn: () => query(),
  });

  return { data: (result as any)?.data.object, loading, error };
};

export default useQueryGetTeacherProfile;
