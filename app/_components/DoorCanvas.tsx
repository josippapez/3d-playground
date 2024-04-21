'use client';
import { DoorModel } from '@app/_components/DoorModel';
import { Effects } from '@app/_components/Effects';
import { Loader } from '@app/_components/Loader';
import {
  CameraControls,
  ScrollControls,
  SoftShadows,
  Stats,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Pathtracer } from '@react-three/gpu-pathtracer';
import { useControls } from 'leva';
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
  const { debug, enabled, samples, focus, size } = useControls({
    debug: true,
    enabled: true,
    size: { value: 35, min: 0, max: 100, step: 0.1 },
    focus: { value: 0.5, min: 0, max: 2, step: 0.1 },
    samples: { value: 5, min: 1, max: 40, step: 1 },
  });

  return (
    <Canvas
      shadows="basic"
      className="bg-gradient-to-b from-black via-black via-[80%] to-stone-800"
      // className='white'
      gl={{
        antialias: true,
        // enable later in production
        // antialias: false,
        // stencil: false,
        // depth: false,
        powerPreference: 'high-performance',
      }}
      camera={{
        type: 'OrthographicCamera',
        zoom: 1.5,
        // position: [0.5, 1, 10],
        // near: 1,
        // far: 25,
      }}
    >
      {/* <Pathtracer> */}
      <pointLight position={[10, -10, -20]} intensity={10} />
      <pointLight position={[-10, -10, -20]} intensity={10} />
      {enabled && <SoftShadows samples={samples} />}
      <Effects />
      {/* <Skybox timeOfDay={props.timeOfDay} /> */}
      {/* <Lights timeOfDay={props.timeOfDay} /> */}
      {/* <Environment files={'/studio_garden_1k.hdr'} /> */}
      {/* <Floor /> */}
      <Suspense fallback={<Loader />}>
        {/* <ScrollControls pages={3}> */}
        <DoorModel {...props} position={[0, -2.5, 0]} />
        {/* </ScrollControls> */}
        {/* <OrbitControls makeDefault autoRotate={false} /> */}
        <CameraControls
          makeDefault
          // prevents user interaction with the camera (zoom and movement)
          enabled={false}
          maxDistance={5}
          minDistance={5}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 2}
          maxAzimuthAngle={Math.PI / 2}
        />
      </Suspense>
      {/* </Pathtracer> */}
      {/* <Grid /> */}
      {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']}
          labelColor="white"
        />
      </GizmoHelper> */}
      {/* <axesHelper args={[3]} /> */}
      {props.enableStats && <Stats />}
    </Canvas>
  );
}
