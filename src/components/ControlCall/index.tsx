/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import styles from './styles.module.less'
import dynamic from 'next/dynamic';

const ShareScreen = dynamic(() => import('../ShareScreen'), { ssr: false })

export default function Controls ({ tracks, hasCam, client}: any) {
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
      {!shareScreen ? <div onClick={() => setShareScreen(true)}>share</div> : <ShareScreen client={client} setShareScreen={setShareScreen} hasCam={hasCam} tracks={tracks} />}
      <p className={styles.on} onClick={() => leaveChannel()}>Leave</p>
    </div>
  );
};


