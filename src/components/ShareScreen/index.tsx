import React, { useEffect } from 'react'
import { createScreenVideoTrack } from "agora-rtc-react";

const useScreenVideoTrack = createScreenVideoTrack({
      encoderConfig: "720p_3",
    });

export default function ShareScreen({ client, setShareScreen }: any) {
  const screenTracks = useScreenVideoTrack().tracks;

  const startShareScreen = async () => {
    await client.publish(screenTracks).catch(err => console.log(err))
  }
  const stopShareScreen = async () => {
    await client.unpublish(screenTracks).catch(err => console.log(err))

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
