import React, { ReactNode, useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { useRouter } from "next/router";
import { HOME_PATH, LOGIN_PATH, REGISTER_PATH } from "../app/constants";

type RouteGuardProps = {
  children: ReactNode;
};

export default function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const [directing, setDirecting] = useState(true);
  const onDirecting = () => {
    setDirecting(false);
  };

  useEffect(() => {
    if (
      !localStorage.getItem("currentUser") &&
      router.pathname !== LOGIN_PATH &&
      router.pathname !== REGISTER_PATH
    )
      return window.location.replace(LOGIN_PATH);
  }, [router.pathname]);

  useEffect(() => {
    const directTingTimeout = setTimeout(onDirecting, 100);
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
  return <>{directing ? <LoadingScreen /> : children}</>;
}
