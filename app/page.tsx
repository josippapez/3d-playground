'use client';

import { Controls } from '@app/(index)/Controls';
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
        className="bg-stone-950 col-span-full"
        gl={{
          // antialias: true,
          // enable later in production
          antialias: false,
          stencil: false,
          depth: false,
          powerPreference: 'high-performance',
        }}
        camera={{
          type: 'OrthographicCamera',
          zoom: 1.3,
          // position: [0.5, 1, 10],
          // near: 1,
          // far: 25,
        }}
      >
        <Controls />
      </Canvas>
    </main>
  );
}
