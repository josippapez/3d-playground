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
  OrthographicCamera,
  Stats,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

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
  return (
    <Canvas
      shadows
      gl={{
        antialias: true,
        // enable later in production
        // antialias: false,
        // stencil: false,
        // depth: false,
        // powerPreference: 'high-performance',
      }}
      camera={{
        type: 'OrthographicCamera',
        zoom: 1.5,
        position: [0.5, 1, 10],
        near: 1,
        far: 25,
      }}
    >
      <Suspense fallback={<Loader />}>
        <Skybox timeOfDay={props.timeOfDay} />
        <Lights timeOfDay={props.timeOfDay} />
        <Effects />
        {/* <Environment files={'/studio_garden_1k.hdr'} /> */}
        <DoorModel {...props} />
        {/* <Floor /> */}
        {/* <OrbitControls makeDefault /> */}
      </Suspense>
      <Grid />
      {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']}
          labelColor="white"
        />
      </GizmoHelper> */}
      <axesHelper args={[3]} />
      {props.enableStats && <Stats />}
    </Canvas>
  );
}
