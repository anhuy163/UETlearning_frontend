/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import styles from "./styles.module.less";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { HOME_PATH } from "@/src/app/constants";
import socket from "@/src/app/socket";

const ShareScreen = dynamic(() => import("../ShareScreen"), { ssr: false });

export default function Controls({ tracks, hasCam, client }: any) {
  const router = useRouter();
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const [shareScreen, setShareScreen] = useState(false);

  const mute = async (type: any) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    // console.log(typeof localStorage.getItem("currentStudentCall"));

    socket.emit("endCall", {
      to: localStorage.getItem("currentStudentCall"),
    });
    localStorage.removeItem("channelToken");
    localStorage.removeItem("channelName");
    await client.leave();
    client.removeAllListeners();
    // we close the tracks to perform cleanup
    tracks[0].close();
    if (tracks.length === 2) {
      tracks[1].close();
    }
    router.push(HOME_PATH).then(() => {
      localStorage.removeItem("currentStudentCall");
    });
  };

  return (
    <div className={styles.controls}>
      <p
        className={
          trackState.audio
            ? "font-mono font-semibold text-base bg-slate-800 p-2 cursor-pointer rounded-lg text-white opacity-90 hover:opacity-100"
            : "font-mono font-semibold text-base bg-green-800 p-2 cursor-pointer rounded-lg text-white opacity-90 hover:opacity-100"
        }
        onClick={() => mute("audio")}>
        {trackState.audio ? "Tắt microphone" : "Bật microphone"}
      </p>
      {hasCam ? (
        <p
          className={
            trackState.video
              ? "font-mono font-semibold text-base bg-slate-800 p-2 cursor-pointer rounded-lg text-white opacity-90 hover:opacity-100"
              : "font-mono font-semibold text-base bg-green-800 p-2 cursor-pointer rounded-lg text-white opacity-90 hover:opacity-100"
          }
          onClick={() => mute("video")}>
          {trackState.video ? "Tắt camera" : "Bật camera"}
        </p>
      ) : (
        <></>
      )}
      {!shareScreen ? (
        <div
          className='font-mono font-semibold text-base bg-cyan-800 p-2 cursor-pointer rounded-lg text-white opacity-90 hover:opacity-100'
          onClick={() => setShareScreen(true)}>
          Chia sẻ màn hình
        </div>
      ) : (
        <ShareScreen
          client={client}
          setShareScreen={setShareScreen}
          hasCam={hasCam}
          tracks={tracks}
        />
      )}
      <p
        className='font-mono font-semibold text-base bg-red-700 p-2 cursor-pointer rounded-lg text-white opacity-90 hover:opacity-100'
        onClick={() => leaveChannel()}>
        Kết thúc
      </p>
    </div>
  );
}
