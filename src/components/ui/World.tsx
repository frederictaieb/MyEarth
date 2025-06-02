import React, { useState } from 'react'
import * as THREE from 'three';
import { AudioLoader, AudioListener, Audio } from 'three';
import { Canvas} from '@react-three/fiber';
import Lights from './Lights';
import Earth from './Earth';
import Clouds from './Clouds';
import Atmosphere from './Atmosphere';
import Soundscape from '../snd/Soundscape';
//import Markers from '@/components/ui/Markers';
import {OrbitControls } from '@react-three/drei';


export default function World() {
  const [radius, setRadius] = useState(10);
  const [withAtmosphere, setWithAtmosphere] = useState(true);
  const [withClouds, setWithClouds] = useState(true);
  const [withSoundscape, setWithSoundscape] = useState(true);
  const [withOrbitControls, setWithOrbitControls] = useState(true);

  return (
      <Canvas
        style={{ background: 'black' }}
        camera={{ position: [0, 0, 30], near: 1, far: 1000, fov: 45 }}
        >
        <Lights />
          <Earth radius={radius} />
          {withAtmosphere && <Atmosphere radius={radius}/>}
          {withClouds && <Clouds radius={radius}/>}
          {withSoundscape && <Soundscape />}
          {withOrbitControls && <OrbitControls />}
      </Canvas>
  )
}