import React, { useEffect, useState } from 'react'
import { createScreenVideoTrack } from "agora-rtc-react";

const useScreenVideoTrack = createScreenVideoTrack({
      encoderConfig: "720p_3",
    });

export default function ShareScreen({ client, setShareScreen, tracks, hasCam }: any) {
  const screenTracks = useScreenVideoTrack().tracks;

  const [trackCam, setTrackCam] = useState(tracks);

  const startShareScreen = async () => {
    if (hasCam) {
      await client.unpublish(tracks[1]).catch(err => console.log(err))
      await client.publish(screenTracks).catch(err => console.log(err))
    } else {
      await client.publish(screenTracks).catch(err => console.log(err))
    }
  }
  const stopShareScreen = async () => {
    if (hasCam) {
      await client.unpublish(screenTracks).catch(err => console.log(err))
      await client.publish(trackCam[1]).catch(err => console.log(err))
    } else {
      await client.unpublish(screenTracks).catch(err => console.log(err))
    }

  }
  
  useEffect(() => {
    startShareScreen();       
    },[screenTracks])

  return (
    <div onClick={() => {
      setShareScreen(false);
      stopShareScreen()
    }}>Tắt share</div>
  )
}
