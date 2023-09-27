'use client';

import { useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { useRef } from 'react';
import { CameraHelper, DirectionalLight, DirectionalLightHelper } from 'three';

export const Lights: React.FC = () => {
  const { scene } = useThree();
  const ambientCtl = useControls('Ambient Light', {
    visible: true,
    intensity: {
      value: 1.0,
      min: 0,
      max: 10,
      step: 1,
    },
  });

  const directionalCtl = useControls('Directional Light', {
    visible: true,
    position: {
      x: 3.3,
      y: 1.0,
      z: 4.4,
    },
    castShadow: true,
    intensity: {
      value: 20,
      min: 0,
      max: 50,
      step: 1,
    },
  });

  const directionalLightHelperRef = useRef<DirectionalLight>(null!);
  useHelper(directionalLightHelperRef, DirectionalLightHelper, 1, 'red');

  const { shadowNormalBias } = useControls({
    shadowNormalBias: {
      value: 0,
      min: -1,
      max: 1,
      step: 0.001,
    },
  });

  if (directionalLightHelperRef.current) {
    const cameraHelper = new CameraHelper(
      directionalLightHelperRef.current.shadow.camera,
    );
    scene.add(cameraHelper);
  }
  return (
    <>
      <ambientLight
        visible={ambientCtl.visible}
        intensity={ambientCtl.intensity}
      />
      <directionalLight
        shadow-bias={-0.0007}
        shadow-normalBias={shadowNormalBias}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0}
        shadow-camera-far={25}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
        ref={directionalLightHelperRef}
        visible={directionalCtl.visible}
        position={[
          directionalCtl.position.x,
          directionalCtl.position.y,
          directionalCtl.position.z,
        ]}
        intensity={directionalCtl.intensity}
        castShadow={directionalCtl.castShadow}
      />
    </>
  );
};
