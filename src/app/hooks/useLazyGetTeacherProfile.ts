import { SERVER_URL } from "./../constants";
import axios from "axios";
import { useState } from "react";
import { setUser } from "../redux/slice/userSlice";
import { useAppDispatch } from "./useRedux";
const useLazyQueryGetProfile = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const fetchData = async (enable: boolean) => {
    if (!enable) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${SERVER_URL}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (res?.data.code === 0) {
        dispatch(setUser(res.data.object));
        localStorage.setItem(
          "currentUser",
          JSON.stringify((res as any)?.data?.object)
        );
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return { fetchData, loading };
};

export default useLazyQueryGetProfile;
