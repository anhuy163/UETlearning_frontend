/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import styles from './styles.module.less'
import { createScreenVideoTrack } from "agora-rtc-react";

const useScreenVideoTrack = createScreenVideoTrack({
      encoderConfig: "720p_3",
    });

export default function Controls ({ tracks, hasCam, client}: any) {
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const [shareScreen, setShareScreen] = useState(false);

  const screenTracks = useScreenVideoTrack().tracks;

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

  const startShareScreen = async () => {
    setShareScreen(true);
    if (hasCam) {
      await client.publish(screenTracks).catch(err => console.log(err));
    } else {
      await client.publish(screenTracks).catch(err => console.log(err));
    }
  }

  const stopShareScreen = async () => {
    if (hasCam) {
      await client.unpublish(screenTracks).catch(err => console.log(err));
    } else {
      await client.unpublish(screenTracks).catch(err => console.log(err));
    }
    screenTracks.stop();
    setShareScreen(false);
  }


  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    // we close the tracks to perform cleanup
    tracks[0].close();
    if(tracks.length ===  2) {tracks[1].close();}
  };

  return (
    <div className={styles.controls}>
      <p className={trackState.audio ? styles.on : styles.off} onClick={() => mute("audio")}>
        {trackState.audio ? "Tắt microphone" : "Bật microphone"}
      </p>
      {hasCam ? <p className={trackState.video ? styles.on : styles.off} onClick={() => mute("video")}>
        {trackState.video ? "Tắt camera" : "Bật camera"}
      </p> : <></>}
      {shareScreen ? <p className={styles.off} onClick={() => stopShareScreen()}>Dừng chia sẻ màn hình</p> : <p className={styles.on} onClick={() => startShareScreen()}>Chia sẻ màn hình</p>}
      <p className={styles.on} onClick={() => leaveChannel()}>Leave</p>
    </div>
  );
};


