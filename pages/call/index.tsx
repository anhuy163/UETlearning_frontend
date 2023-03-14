import React, { useEffect, useState } from 'react'
import LayoutContainer from '@/src/containers/Layout';
import dynamic from 'next/dynamic';

// const Videos = dynamic(() => import('../../src/components/VideoTrack'), { ssr: false })
// const Controls = dynamic(() => import('../../src/components/ControlCall'), { ssr: false })
const AudioCall = dynamic(() => import('../../src/containers/AudioCall'), { ssr: false });



  

export default function CallPage() {
    const channelName = "63f9ea1afa37d37801026d6763f9a9d0a3b40178cdc9d002";

    const [hasCam, setHasCam] = useState(false);

    const checkCamera = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === 'videoinput');
      setHasCam(cameras.length > 0);
    }

    useEffect(() => {
        checkCamera();
        console.log(hasCam)
    }, [hasCam])
    
    return(
    <LayoutContainer title="call">
            {/* {hasCam ? (<VideoCall channelName={channelName} />) : <AudioCall channelName={channelName} />} */}
            <AudioCall channelName={channelName} />
    </LayoutContainer>)
}





