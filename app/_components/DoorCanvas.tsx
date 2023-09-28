'use client';
import { DoorModel } from '@app/_components/DoorModel';
import { Effects } from '@app/_components/Effects';
import { Floor } from '@app/_components/Floor';
import { Lights } from '@app/_components/Lights';
import { Loader } from '@app/_components/Loader';
import { Skybox } from '@app/_components/Skybox';
import {
  Environment,
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
  Stats,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';
import { Suspense } from 'react';
import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  LinearToneMapping,
  NoToneMapping,
  ReinhardToneMapping,
} from 'three';

export function DoorCanvas(
  props: JSX.IntrinsicElements['group'] & {
    enableStats?: boolean;
    selectedModel: string;
    timeOfDay: 'day' | 'night';
    zoom?: number;
    widthSize: number;
    heightSize: number;
  },
) {
  const { toneMapping, toneMappingExp } = useControls({
    toneMapping: {
      value: ReinhardToneMapping,
      options: {
        No: NoToneMapping,
        Linear: LinearToneMapping,
        Reinhard: ReinhardToneMapping,
        Cineon: CineonToneMapping,
        ACESFilmic: ACESFilmicToneMapping,
      },
    },
    toneMappingExp: {
      value: 1.5,
      min: 0,
      max: 10,
      step: 0.01,
    },
  });
  return (
    <Canvas
      shadows
      gl={{
        toneMapping,
        toneMappingExposure: toneMappingExp,
        antialias: true,
      }}
    >
      <Suspense fallback={<Loader />}>
        <Skybox timeOfDay={props.timeOfDay} />
        <Lights timeOfDay={props.timeOfDay} />
        <Effects />
        <Environment files={'/studio_garden_1k.hdr'} />
        <DoorModel {...props} />
        <Floor />
        <OrbitControls makeDefault />
      </Suspense>
      <Grid />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']}
          labelColor="white"
        />
      </GizmoHelper>
      <axesHelper args={[3]} />
      {process.env.NODE_ENV === 'development' && props.enableStats && <Stats />}
    </Canvas>
  );
}
