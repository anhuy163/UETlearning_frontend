import React from "react";
import { AgoraVideoPlayer } from "agora-rtc-react";
import styles from "./styles.module.less";

export default function Videos({ users, tracks, hasCam }: any) {
  return (
    <div>
      <div className={styles.videos}>
        {/* AgoraVideoPlayer component takes in the video track to render the stream,
            you can pass in other props that get passed to the rendered div */}
        {hasCam ? (
          <AgoraVideoPlayer
            style={{ height: "95%", width: "95%" }}
            className={styles.vid}
            videoTrack={tracks[1]}
          />
        ) : (
          <></>
        )}
        {users.length > 0 &&
          users.map((user: any) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  style={{ height: "95%", width: "95%" }}
                  className={styles.vid}
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              );
            } else return null;
          })}
      </div>
    </div>
  );
}
