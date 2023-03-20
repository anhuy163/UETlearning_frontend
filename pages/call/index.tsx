import React, { useEffect, useState } from "react";
import LayoutContainer from "@/src/containers/Layout";
import dynamic from "next/dynamic";
import Error from "next/error";

// const Videos = dynamic(() => import('../../src/components/VideoTrack'), { ssr: false })
// const Controls = dynamic(() => import('../../src/components/ControlCall'), { ssr: false })
const AudioCall = dynamic(() => import("../../src/containers/AudioCall"), {
  ssr: false,
});
const VideoCall = dynamic(() => import("../../src/containers/VideoCall"), {
  ssr: false,
});

export default function CallPage() {
  const channelName = "test1";

  const [hasCam, setHasCam] = useState(false);

  const checkCamera = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    setHasCam(cameras.length > 0);
  };

  useEffect(() => {
    checkCamera();
    console.log(hasCam);
  }, [hasCam]);

  return (
    <div className='w-full h-[100vh]'>
      {hasCam ? (
        <VideoCall channelName={channelName} />
      ) : (
        <AudioCall channelName={localStorage.getItem("channelName")} />
      )}
    </div>
  );
  localStorage.getItem("channelName") ? (
    <div className='w-full h-[100vh]'>
      {hasCam ? (
        <VideoCall channelName={channelName} />
      ) : (
        <AudioCall channelName={localStorage.getItem("channelName")} />
      )}
    </div>
  ) : (
    <Error statusCode={404} />
  );
}
