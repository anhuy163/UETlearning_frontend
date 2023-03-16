import { useQuery } from "react-query";
import axios from "axios";
import { SERVER_BASE_URL } from "../constants";

const useQueryGetEvents = () => {
  const queryFn = () => {
    return axios.get(
      `${SERVER_BASE_URL}/ums/schedule/getSchedules?page=0&size=50&sortType=132132132132`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
  };

  const {
    data: result,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: "useQuerygetEvents",
    queryFn: () => queryFn(),
  });

  return {
    data: (result as any)?.data.object.teacherScheduleList || [],
    loading,
    error,
  };
};

export default useQueryGetEvents;
