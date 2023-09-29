'use client';

import { useHelper } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { useRef } from 'react';
import {
  CameraHelper,
  Color,
  DirectionalLight,
  DirectionalLightHelper,
  Group,
} from 'three';

type Props = {
  timeOfDay: 'day' | 'night';
};

export const Lights: React.FC<Props> = ({ timeOfDay }) => {
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
    // enableHelpers: true,
    position: {
      x: 3.5,
      y: 2.0,
      z: 4,
    },
    castShadow: true,
    intensity: {
      value: 10,
      min: 0,
      max: 50,
      step: 1,
    },
    nightIntensity: {
      value: 5,
      min: 0,
      max: 50,
      step: 1,
    },
    nightColor: '#5b72b9',
    dayColor: '#ffffff',
  });

  const { shadowNormalBias, shadowBias } = useControls({
    shadowBias: {
      value: -0.0007,
      min: -0.003,
      max: -0.0001,
      step: 0.0001,
    },
    shadowNormalBias: {
      value: 0,
      min: -1,
      max: 1,
      step: 0.001,
    },
  });

  const directionalLightHelperRef = useRef<DirectionalLight>(null!);
  const directionalLightHelperRef2 = useRef<DirectionalLight>(null!);
  const lightGroupRef = useRef<Group>(null!);
  // useHelper(directionalLightHelperRef, DirectionalLightHelper, 1, 'red');
  // useHelper(directionalLightHelperRef2, DirectionalLightHelper, 1, 'black');

  // if (
  //   directionalLightHelperRef.current &&
  //   directionalLightHelperRef2.current
  // ) {
  //   const cameraHelper = new CameraHelper(
  //     directionalLightHelperRef.current.shadow.camera,
  //   );
  //   const cameraHelper2 = new CameraHelper(
  //     directionalLightHelperRef2.current.shadow.camera,
  //   );
  //   scene.add(cameraHelper, cameraHelper2);
  // }

  let currentDelta = 0; // needed for keeping track of rotation; It resets when timeOfDay changes so the light can rotate again
  const initialTimeOfDay = useRef('day'); // needed for keeping track of timeOfDay

  useFrame(() => {
    if (timeOfDay === 'night' && timeOfDay !== initialTimeOfDay.current) {
      if (currentDelta <= Math.PI) {
        currentDelta += 0.01;
        lightGroupRef.current.rotation.z += 0.01;
      } else {
        initialTimeOfDay.current = timeOfDay;
      }

      if (directionalLightHelperRef.current.intensity > 0) {
        directionalLightHelperRef.current.intensity -= 0.1;
      }

      if (
        directionalLightHelperRef2.current.intensity <=
        directionalCtl.nightIntensity
      ) {
        directionalLightHelperRef2.current.intensity += 0.05;
      }
    }

    if (timeOfDay === 'day' && timeOfDay !== initialTimeOfDay.current) {
      if (currentDelta <= Math.PI) {
        currentDelta += 0.01;
        lightGroupRef.current.rotation.z += 0.01;
      } else {
        initialTimeOfDay.current = timeOfDay;
      }

      if (
        directionalLightHelperRef.current.intensity < directionalCtl.intensity
      ) {
        directionalLightHelperRef.current.intensity += 0.1;
      }

      if (directionalLightHelperRef2.current.intensity > 0) {
        directionalLightHelperRef2.current.intensity -= 0.05;
      }
    }
  });

  return (
    <>
      <ambientLight
        visible={ambientCtl.visible}
        intensity={ambientCtl.intensity}
      />
      <group ref={lightGroupRef}>
        <directionalLight
          shadow-bias={shadowBias}
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
          intensity={directionalCtl.intensity}
          castShadow={directionalCtl.castShadow}
          position={[
            directionalCtl.position.x,
            directionalCtl.position.y,
            directionalCtl.position.z,
          ]}
          color={directionalCtl.dayColor}
        />
        <directionalLight
          shadow-bias={shadowBias}
          shadow-normalBias={shadowNormalBias}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0}
          shadow-camera-far={25}
          shadow-camera-left={-3}
          shadow-camera-right={3}
          shadow-camera-top={3}
          shadow-camera-bottom={-3}
          ref={directionalLightHelperRef2}
          visible={directionalCtl.visible}
          intensity={0}
          castShadow={directionalCtl.castShadow}
          position={[
            -directionalCtl.position.x,
            -directionalCtl.position.y,
            directionalCtl.position.z,
          ]}
          color={directionalCtl.nightColor}
        />
      </group>
    </>
  );
};
