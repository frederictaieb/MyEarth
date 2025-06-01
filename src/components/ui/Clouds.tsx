import { useRef } from 'react';
import * as THREE from "three"
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Clouds(props:any) {
    const radius = props.radius;
    const ref = useRef<THREE.Mesh>(null);
    const cloudsMap = useTexture("./textures/Clouds.png")

    useFrame(() => {
        if (ref.current) {
          ref.current.rotation.y += 0.0002;
        }
      });

    //23.5 / 360 * 2 * Math.PI
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[radius + 0.05, 64, 64]} />
            <meshStandardMaterial 
                alphaMap={cloudsMap}
                transparent={true}
            />
        </mesh>
    )
  }