import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const Videos = dynamic(() => import("../../components/VideoTrack"), {
  ssr: false,
});
const Controls = dynamic(() => import("../../components/ControlCall"), {
  ssr: false,
});

const config = {
  mode: "rtc",
  codec: "vp8",
};

const appId = "84e6846fa5ca43c68fe534ebd95b4730";
const token =
  "007eJxTYBBcc6fK+0ag6hzer2Fh/tbm/M+kVpjn2bQ5vEjrkG1bzKzAYGGSamZhYpaWaJqcaGKcbGaRlmpqbJKalGJpmmRibmzAaySQ0hDIyHDq8ysWRgYIBPFZGUpSi0sMGRgAouMdQg==";

const useClient = createClient(config as any);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

export default function VideoCall({ channelName }: any) {
  const [users, setUsers] = useState([]);

  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    // function to initialise the SDK
    let init = async () => {
      (tracks as any)[0].setVolume(1000);
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user as never];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User: any) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User: any) => User.uid !== user.uid);
        });
      });

      await client.join(appId, channelName, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
    };

    if (ready && tracks) {
      console.log("init ready");
      init();
    }
  }, [client, ready, tracks]);

  return (
    <div>
      {ready && tracks && (
        <Controls tracks={tracks} hasCam={true} client={client} />
      )}
      {tracks && <Videos users={users} tracks={tracks} hasCam={true} />}
    </div>
  );
}
