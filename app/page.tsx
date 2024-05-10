'use client';

import { Controls } from '@app/(index)/Controls';
import { Bvh, CameraControls, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';

export default function Page() {
  return (
    <main className="overflow-hidden grid grid-cols-48 min-h-svh bg-black">
      <Leva collapsed hidden={false} />
      <Canvas
        // performance={{
        //   min: 0.1,
        //   max: 1,
        // }}
        dpr={1}
        // frameloop="always"
        shadows="basic"
        // className="bg-gradient-to-b from-black via-black via-[80%] to-stone-800"
        className="bg-stone-950 col-span-full !select-auto !pointer-events-auto"
        gl={{
          // antialias: true,
          // enable later in production
          antialias: false,
          // stencil: false,
          // depth: false,
          powerPreference: 'high-performance',
        }}
        camera={{
          type: 'OrthographicCamera',
          zoom: 1,
          position: [0, 10, 0],
        }}
      >
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
        <Controls />
        <Preload all />
      </Canvas>
    </main>
  );
}
