import axios from "axios";
import { SERVER_BASE_URL } from "../constants";
import { useAppSelector } from "./useRedux";

const useHandleCall = () => {
  //   const currentTeacher = useAppSelector((state) => state.user);
  const handleOnCallingAccept = async (
    studentId: string | undefined,
    tokenRTC: string
  ) => {
    console.log(studentId);

    try {
      const result = await axios.post(
        `${SERVER_BASE_URL}/call/acceptCall`,
        { studentId, tokenRTC, teacherId: localStorage.getItem("teacherId") },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleOnCallingAccept };
};

export default useHandleCall;
