import React, { ReactNode, useEffect, useState } from "react";
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

type RouteGuardProps = {
  children: ReactNode;
};

export default function RouteGuard({ children }: RouteGuardProps) {
  const { checkTokenIsExpired, logout } = useAuth();
  const router = useRouter();
  const [directing, setDirecting] = useState(true);
  const [getTokenLoading, setGetTokenLoading] = useState(true);
  const { loading: getContactLoading } = useQueryGetContacts();
  const onDirecting = () => {
    setDirecting(false);
  };
  // console.log(getTokenLoading);

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
  return (
    <>
      {directing || getTokenLoading || getContactLoading ? (
        <LoadingScreen />
      ) : (
        children
      )}
    </>
  );
}
