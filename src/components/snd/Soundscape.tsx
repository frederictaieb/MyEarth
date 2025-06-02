import { useEffect } from 'react';
import { AudioListener, AudioLoader, Audio } from 'three';
import { useThree } from '@react-three/fiber';

export default function Sound() {
    const { camera } = useThree();
    useEffect(() => {
      const listener = new AudioListener();
      camera.add(listener);
  
      const sound = new Audio(listener);
  
      const audioLoader = new AudioLoader();
      audioLoader.load('/audio/music.mp3', (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.04);
  
        const handleClick = () => {
            console.log('Soundscape playing');
            sound.play();
        };
        window.addEventListener('click', handleClick);
      });
    }, []);
  
    return null;
  }