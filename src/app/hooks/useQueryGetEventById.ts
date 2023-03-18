import { useQuery } from "react-query";
import axios from "axios";
import { SERVER_BASE_URL } from "../constants";

const useQueryGetEventById = (id: string | undefined) => {
  const queryFn = () => {
    if (id) {
      return axios.get(
        `${SERVER_BASE_URL}/ums/schedule/getById?scheduleId=${id}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
    }
    return undefined;
  };

  const {
    data: result,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: `useQueryGetEventById=${id}`,
    queryFn: () => queryFn(),
  });

  return {
    data: (result as any)?.data.object,
    loading,
    error,
  };
};

export default useQueryGetEventById;
