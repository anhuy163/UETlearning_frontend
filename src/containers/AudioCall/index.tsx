import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createClient, createMicrophoneAudioTrack } from "agora-rtc-react";

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
  "007eJxTYFCzqCtNXGF0vf5VN++d6XsXpbzqlujrsuZJ/SG82kRAQl6BwcIk1czCxCwt0TQ50cQ42cwiLdXU2CQ1KcXSNMnE3NiA/YpgSkMgI8OTi6LMjAwQCOKzMpSkFpcYMjAAAPm0Hek=";

const useClient = createClient(config as any);
const useMicroPhoneAudioTrack = createMicrophoneAudioTrack();

export default function AudioCall({ channelName }: any) {
  const [users, setUsers] = useState([]);
  const client = useClient();
  let tracks = [] as any;
  const audioTrack = useMicroPhoneAudioTrack().track;
  tracks.push(audioTrack);

  useEffect(() => {
    // function to initialise the SDK
    let init = async () => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers: never[]) => {
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

      await client
        .join(appId, channelName, localStorage.getItem("channelToken"), null)
        .catch((err) => console.log("err", err));
      if (tracks)
        await client.publish([tracks[0]]).catch((err) => console.log(err));
    };

    if (tracks) {
      console.log("init ready");
      init();
    }

    console.log("aaaaaaaaaaaaaaaaaa", client);
  }, [client, tracks]);

  return (
    <div>
      {tracks && <Controls tracks={tracks} hasCam={false} client={client} />}
      {tracks && <Videos users={users} tracks={tracks} hasCam={false} />}
    </div>
  );
}
