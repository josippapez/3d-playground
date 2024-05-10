'use client';
import { useStore } from '@app/(index)/Controls';
import { DoorModel } from '@app/_components/DoorModel';
import { Effects } from '@app/_components/Effects';
import { Lights } from '@app/_components/Lights';
import { Loader } from '@app/_components/Loader';
import { AdaptiveDpr, Html, SoftShadows, Stats } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { easing } from 'maath';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Suspense, useRef } from 'react';

export function DoorCanvas(
  props: JSX.IntrinsicElements['group'] & {
    enableStats?: boolean;
    timeOfDay: 'day' | 'night';
    zoom?: number;
    widthSize: number;
    heightSize: number;
  },
) {
  const light = useRef<any>();

  const { camera } = useThree();
  const { mousePosition } = useStore();
  const { debug, enabled, samples, focus, size } = useControls(
    {
      debug: true,
      enabled: true,
      size: { value: 35, min: 0, max: 100, step: 0.1 },
      focus: { value: 0.5, min: 0, max: 2, step: 0.1 },
      samples: { value: 5, min: 1, max: 40, step: 1 },
    },
    undefined,
    { collapsed: true },
  );

  useFrame((state, delta) => {
    if (light.current) {
      easing.damp3(
        light.current.position,
        [
          camera.position.x + mousePosition.x * 12,
          camera.position.y + mousePosition.y * 4,
          camera.position.z + 5,
        ],
        0.2,
        delta,
      );
      light.current.updateMatrixWorld();
    }
  });

  return (
    <>
      <AdaptiveDpr pixelated />
      {/* <Pathtracer> */}
      {/* <pointLight position={[10, -10, -20]} intensity={10} />
      <pointLight position={[-10, -10, -20]} intensity={10} /> */}
      {enabled && <SoftShadows samples={samples} />}
      <Effects />
      {/* <Skybox timeOfDay={props.timeOfDay} /> */}
      {/* <Lights timeOfDay={props.timeOfDay} /> */}
      {/* <Environment files={'/studio_garden_1k.hdr'} /> */}
      {/* <Floor /> */}
      <ErrorBoundary
        errorComponent={() => (
          <Html className="text-white">
            <h1>Something went wrong</h1>
          </Html>
        )}
      >
        <Suspense fallback={<Loader />}>
          {/* <ScrollControls pages={3}> */}
          <group position={[-10, 0, 0]} rotation={[Math.PI / -6, 0, 0]}>
            {/* GRID of rounded boxes */}
            <group>
              {Array.from({ length: 60 }).map((_, index) => (
                <DoorModel
                  key={index}
                  {...props}
                  position={[
                    Math.floor(index / 5) * 3 - 6,
                    0,
                    (index % 5) * 3 - 6,
                  ]}
                />
              ))}
            </group>
            {/* <DoorModel {...props} position={[0, -2.5, 0]} /> */}
          </group>
          {/* </ScrollControls> */}
          {/* <OrbitControls makeDefault autoRotate={false} /> */}
          <spotLight
            angle={0.5}
            penumbra={0.5}
            ref={light}
            castShadow
            intensity={300}
            shadow-mapSize={1024}
            shadow-bias={-0.001}
            position={camera.position}
          >
            <orthographicCamera
              attach="shadow-camera"
              args={[-10, 10, -10, 10, 0.1, 50]}
            />
          </spotLight>
        </Suspense>
      </ErrorBoundary>
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
    </>
  );
}
