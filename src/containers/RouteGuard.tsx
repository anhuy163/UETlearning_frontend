import React, { ReactNode, use, useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { useRouter } from "next/router";
import {
  FORGOT_PASSWORD_PATH,
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
import useLazyQueryGetProfile from "../app/hooks/useLazyGetTeacherProfile";
import {} from "firebase/app";
// import { handleBackgroundMessage } from "../../public/firebase-messaging-sw";
import socket from "../app/socket";
import VerifyPage from "../components/VerifyPage";
import { updateUserPoints } from "../app/redux/slice/userSlice";
import { useIdleTimer } from "react-idle-timer";
import { showNotificationMessage } from "../app/helpers/messageHelper";
import useQueryGetNotifications from "../app/hooks/useQueryGetNotifications";
type RouteGuardProps = {
  children: ReactNode;
};

export default function RouteGuard({ children }: RouteGuardProps) {
  const { fetchData, loading: fetchingData } = useLazyQueryGetProfile();
  // const { refetch: refetchNotifications } = useQueryGetNotifications();
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
  //HANDLE IDLE STATUS//
  const onIdle = () => {
    updateStatus({ teacherStatus: 2 });
  };
  const onActive = () => {
    updateStatus({ teacherStatus: 0 });
  };
  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    // onAction,
    timeout: 300_000,
    throttle: 500,
  });

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

  // useEffect(() => {
  //   if (localStorage.getItem("currentUser")) {
  //     dispatch(setUser(JSON.parse(localStorage.getItem("currentUser")!)));
  //     updateStatus({ teacherStatus: 0 });
  //   }
  // }, []);

  useEffect(() => {
    fetchData(true);
  }, [router.pathname]);

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
            if (res.data.code === 1) return logout();
            localStorage.setItem("token", res.data.object.token);
            localStorage.setItem("loginTime", new Date().getTime().toString());
            fetchData(true);
            setGetTokenLoading(false);
          })
          .catch((err) => {
            console.log(err);
            logout();
          });

        return;
      }
      setGetTokenLoading(false);
    } else setGetTokenLoading(false);
  }, []);

  useEffect(() => {
    if (
      router.pathname === LOGIN_PATH ||
      router.pathname === REGISTER_PATH ||
      router.pathname === FORGOT_PASSWORD_PATH
    ) {
      setGetTokenLoading(false);
    }
  }, []);

  useEffect(() => {
    if (
      !localStorage.getItem("currentUser") &&
      router.pathname !== LOGIN_PATH &&
      router.pathname !== REGISTER_PATH &&
      router.pathname !== FORGOT_PASSWORD_PATH
    )
      return window.location.replace(LOGIN_PATH);
  }, [router.pathname]);

  useEffect(() => {
    const onMessaging = () => {
      return onMessage(messaging, (payload) => {
        console.log(payload);

        if (payload?.data?.type === "2") {
          // console.log("Message received", payload);
          localStorage.setItem("channelToken", payload?.data?.TOKEN_CHANEL!);
          localStorage.setItem("channelName", payload?.data?.Chanel_Name!);
          localStorage.setItem("currentStudentCall", payload.data?.Id!);
          setCallingStudent(payload.data?.Id);
        } else if (payload?.data?.type === "8" || payload?.data?.type === "9") {
          showNotificationMessage("Bạn có 1 thông báo mới");
          // refetchNotifications();
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
      // console.log(data);

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
      dispatch(
        updateUserPoints(
          data?.msg_length *
            JSON.parse(localStorage.getItem("currentUser")!)?.priceChat
        )
      );

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

  //CHANGE STATUS ON CLOSING APP
  // useEffect(() => {
  //   const handleOnClosingApp = async (event: any) => {
  //     // console.log(123);
  //     event.preventDefault();
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     event.returnValue = "";
  //     // localStorage.removeItem("currentUser");
  //     console.log("beforeunload event triggered");
  //     updateStatus({ teacherStatus: 2 });
  //   };
  //   window.addEventListener("unload", handleOnClosingApp);

  //   return () => {
  //     window.removeEventListener("unload", handleOnClosingApp);
  //   };
  // }, []);

  if (
    !(
      directing ||
      getTokenLoading ||
      getContactLoading ||
      // updatingStatus ||
      fetchingData
    ) &&
    currentTeacher &&
    currentTeacher.verify === null
  ) {
    return <VerifyPage />;
  }

  return (
    <>
      {directing ||
      getTokenLoading ||
      getContactLoading ||
      // updatingStatus ||
      fetchingData ? (
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
