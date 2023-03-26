import React, { ReactNode, use, useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { useRouter } from "next/router";
import {
  HOME_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  TOKEN_EXPIRATION_CHECK_PERIOD_MS,
} from "../app/constants";
import useAuth from "../app/hooks/useAuth";
import useQueryGetContacts from "../app/hooks/useQueryGetContacts";
import PopupCallingAccept from "../components/PopupCallingAccept";
import { setUser } from "../app/redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks/useRedux";
import { onMessaging } from "../firebase";
import messaging from "../firebase";
import { onMessage } from "firebase/messaging";
import usePageVisibility from "../app/hooks/usePageVisibility";
import useMutationUpdateTeacherStatus from "../app/hooks/useMutationUpdateTeacherStatus";
import { updateContactsByMsg } from "../app/redux/slice/contactsSlice";
import {} from "firebase/app";
// import { handleBackgroundMessage } from "../../public/firebase-messaging-sw";
import socket from "../app/socket";
import VerifyPage from "../components/VerifyPage";
import { updateUserPoints } from "../app/redux/slice/userSlice";
type RouteGuardProps = {
  children: ReactNode;
};

export default function RouteGuard({ children }: RouteGuardProps) {
  const isVisible = usePageVisibility();
  const { checkTokenIsExpired, logout } = useAuth();
  const { doMutation: updateStatus, loading: updatingStatus } =
    useMutationUpdateTeacherStatus();
  const router = useRouter();
  const [directing, setDirecting] = useState(true);
  const [getTokenLoading, setGetTokenLoading] = useState(true);
  const [toggleOpenCallingPopup, setToggleOpenCallingPopup] = useState(false);
  const currentTeacher = useAppSelector((state) => state.user);
  const { loading: getContactLoading } = useQueryGetContacts();
  const [callingStudent, setCallingStudent] = useState<any>();
  const [callingStudentName, setCallingStudentName] = useState<any>();
  const onDirecting = () => {
    setDirecting(false);
  };
  const handleOnCancelPopup = () => {
    // localStorage.removeItem("channelToken");
    // localStorage.removeItem("channelName");
    socket.emit("cancelCall", {
      to: callingStudent,
    });
    setToggleOpenCallingPopup(false);
    setCallingStudent(undefined);
  };

  const onCancel = () => {
    setToggleOpenCallingPopup(false);
  };

  const dispatch = useAppDispatch();

  // const handleOnReceiveBackgroundMessage = (payload: any) => {
  //   if (payload.type === "2") {
  //     setToggleOpenCallingPopup(true);
  //   }
  // };
  // console.log(currentTeacher.point);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const now = new Date();
      const loginTime = new Date(
        parseInt(localStorage.getItem("loginTime") as any)
      );
      const timeSinceLogin = now.getTime() - loginTime.getTime();
      // console.log(now.getTime());
      // console.log(loginTime.getTime());
      // console.log(timeSinceLogin);
      if (timeSinceLogin > TOKEN_EXPIRATION_CHECK_PERIOD_MS) {
        checkTokenIsExpired()
          ?.then((res: any) => {
            // console.log(res);
            if (res.data.code === 1) return logout();
            localStorage.setItem("token", res.data.object.token);
            localStorage.setItem("loginTime", new Date().getTime().toString());
            setGetTokenLoading(false);
          })
          .catch((err) => {
            console.log(err);
            logout();
            // setGetTokenLoading(false);
          });
        // .finally(() => setGetTokenLoading(false));
        return;
      }
      setGetTokenLoading(false);
    } else setGetTokenLoading(false);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      dispatch(setUser(JSON.parse(localStorage.getItem("currentUser")!)));
    }
  }, []);

  useEffect(() => {
    if (router.pathname === LOGIN_PATH || router.pathname === REGISTER_PATH) {
      setGetTokenLoading(false);
    }
  }, []);

  useEffect(() => {
    if (
      !localStorage.getItem("currentUser") &&
      router.pathname !== LOGIN_PATH &&
      router.pathname !== REGISTER_PATH
    )
      return window.location.replace(LOGIN_PATH);
  }, [router.pathname]);

  useEffect(() => {
    const onMessaging = () => {
      return onMessage(messaging, (payload) => {
        if (payload?.data?.type === "2") {
          console.log("Message received", payload);
          localStorage.setItem("channelToken", payload?.data?.TOKEN_CHANEL!);
          localStorage.setItem("channelName", payload?.data?.Chanel_Name!);
          localStorage.setItem("currentStudentCall", payload.data?.Id!);
          setCallingStudent(payload.data?.Id);
        }
      });
    };
    onMessaging();
  }, []);

  useEffect(() => {
    socket.emit(
      "add-user",
      JSON.parse(localStorage.getItem("currentUser")!)?.id
    );
    socket.on("seenMessageGet", (data) => {
      console.log(data);

      if (data.type === "2") {
        setToggleOpenCallingPopup(true);
        setCallingStudentName(data.senderName);
      }

      setTimeout(() => {
        setToggleOpenCallingPopup(false);
      }, 90000);
    });

    return () => {
      socket.off("seenMessageGet");
      clearTimeout(
        setTimeout(() => {
          setToggleOpenCallingPopup(false);
        }, 90000)
      );
    };
  }, []);

  // useEffect(() => {
  //   if (currentTeacher.status === 2) {
  //     updateStatus({ teacherStatus: 0 });
  //   } else if (currentTeacher.status === 0) {
  //     updateStatus({
  //       teacherStatus: 2,
  //     });
  //   }
  // }, [isVisible]);

  // console.log(toggleOpenCallingPopup);

  useEffect(() => {
    const directTingTimeout = setTimeout(onDirecting, 200);
    () => directTingTimeout;
    const handleStart = (url = "") =>
      url !== router.asPath && setDirecting(true);
    const handleComplete = () => setDirecting(false);
    router.events.on("routeChangeStart", handleStart);
    // router.events.on("routeChangeComplete", handleComplete);
    return () => {
      clearTimeout(directTingTimeout);
      // router.events.on("routeChangeStart", handleStart);
      // router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router.pathname, router.asPath, router.query, router.events]);

  useEffect(() => {
    socket.on("typingMessageGet", (data) => {
      // console.log(data);
      dispatch(updateUserPoints(data?.msg_length * currentTeacher?.priceChat));

      dispatch(
        updateContactsByMsg({
          studentId: data.senderId,
          msg: data.imgUrl ? "Hình ảnh" : data.msg,
          senderName: data.senderName,
          senderAvatar: data.senderAvatar,
          filePath: data.imgSrc,
          readTeacherSize: false,
        })
      );
    });

    return () => {
      socket.off("typingMessageGet");
      // socket.off("cancelCall");
    };
  }, []);
  useEffect(() => {
    socket.on("receiveCancelCall", () => {
      // console.log("reject call");
      localStorage.removeItem("channelName");
      localStorage.removeItem("channelToken");
      localStorage.removeItem("currentStudentCall");
      setToggleOpenCallingPopup(false);
    });

    return () => {
      socket.off("receiveCancelCall");
    };
  }, []);

  // if (
  //   !(directing || getTokenLoading || getContactLoading || updatingStatus) &&
  //   currentTeacher &&
  //   currentTeacher.verify === null
  // ) {
  //   return <VerifyPage />;
  // }

  return (
    <>
      {directing || getTokenLoading || getContactLoading || updatingStatus ? (
        <LoadingScreen />
      ) : (
        <div>
          <div>{children}</div>
          <div>
            {toggleOpenCallingPopup && (
              <PopupCallingAccept
                studentId={callingStudent}
                studentName={callingStudentName}
                open={toggleOpenCallingPopup}
                handleOnCancel={handleOnCancelPopup}
                onCancel={onCancel}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
