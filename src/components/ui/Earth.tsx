import { useRef } from 'react';
import * as THREE from "three"
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Markers from './Markers';

export default function Earth(props:any) {
    const radius = props.radius;
    const ref = useRef<THREE.Mesh>(null);

    const albedoMap = useTexture("./textures/Albedo.jpg")
    const bumpMap = useTexture("./textures/Bump.jpg")
    const oceanMap = useTexture("./textures/Ocean.png")
    const lightsMap = useTexture("./textures/night_lights_modified.png")
    const cloudsMap = useTexture("./textures/Clouds.png")

    useFrame(() => {
        if (ref.current) {
          ref.current.rotation.y += 0.0001;
        }
      });

    //23.5 / 360 * 2 * Math.PI
    return (
      <group ref={ref} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <mesh>
            <sphereGeometry args={[radius, 64, 64]} />
            <meshStandardMaterial 
              map={albedoMap} 
              bumpMap={bumpMap}
              bumpScale={0.3}
              roughnessMap={oceanMap}
              metalness={0.1}
              metalnessMap={oceanMap}
              emissiveMap={lightsMap}
              emissive={new THREE.Color(0xffff88)}
              onBeforeCompile={(shader) => {
                shader.uniforms.tClouds = { value: cloudsMap }
                shader.uniforms.tClouds.value.wrapS = THREE.RepeatWrapping;
                shader.uniforms.uv_xOffset = { value: 0 }
                shader.fragmentShader = shader.fragmentShader.replace(
                  '#include <common>', 
                  `
                  #include <common>
                  uniform sampler2D tClouds;
                  uniform float uv_xOffset;
                  `
                );
                shader.fragmentShader = shader.fragmentShader.replace(
                  '#include <roughnessmap_fragment>',
                  `
                  float roughnessFactor = roughness;
                  #ifdef USE_ROUGHNESSMAP
                    vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
                    texelRoughness = vec4(1.0) - texelRoughness;
                    roughnessFactor *= clamp(texelRoughness.g, 0.5, 1.0);
                  #endif
                  `
                );
              }}
        />
        </mesh>
        <Markers />
        </group>
    )
  }