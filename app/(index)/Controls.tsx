'use client';

import { DoorCanvas } from '@app/_components/DoorCanvas';
import { Effects } from '@app/_components/Effects';
import { Floor } from '@app/_components/Floor';
import { Lights } from '@app/_components/Lights';
import { Loader } from '@app/_components/Loader';
import {
  KeyboardControls,
  KeyboardControlsEntry,
  useKeyboardControls,
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import clsx from 'clsx';
import { useControls } from 'leva';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { create } from 'zustand';

enum ControlsKeys {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

export const useStore = create<{
  scroll: number;
  mousePosition: { x: number; y: number };
  setScroll: (scroll: number) => void;
  setMousePosition: (x: number, y: number) => void;
}>((set) => ({
  scroll: 0,
  mousePosition: { x: 0, y: 0 },
  setScroll: (scroll) => set({ scroll }),
  setMousePosition: (x, y) => {
    set({
      mousePosition: { x, y },
    });
  },
}));

export const Controls: React.FC = () => {
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('day');
  const [selectedModel, setSelectedModel] = useState('graces-draco2.glb');
  const [widthSize, setWidthSize] = useState(1270);
  const [heightSize, setHeightSize] = useState(2700);
  const { enableStats, enableControls } = useControls({
    enableStats: false,
    enableControls: false,
  });

  const { setScroll, setMousePosition } = useStore();
  useEffect(() => {
    // add mouse event listener that uses x an y position of the mouse on screen and maps them so that the 0 point is in the center of the screen. Also mapped to 0-1
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMousePosition(
        (e.clientX - centerX) / centerX,
        (e.clientY - centerY) / -centerY,
      );
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setMousePosition]);

  const [modelProps, setModelProps] =
    useState<JSX.IntrinsicElements['group']>();

  return (
    <>
      {enableControls && (
        <div className="bg-white z-[1] col-span-12 p-12 space-y-20">
          <p>Resize width</p>
          <input
            type="range"
            min={800}
            max={1270}
            step={1}
            defaultValue={widthSize}
            onChange={(e) => setWidthSize(parseFloat(e.target.value))}
            className="w-full"
          />
          <input
            type="number"
            min={800}
            max={1270}
            value={widthSize}
            onChange={(e) => setWidthSize(parseFloat(e.target.value))}
            className="w-full bg-gray-5 text-gray-2 px-16 py-4 rounded"
          />
          <p>Resize height</p>
          <input
            type="range"
            min={2000}
            max={2700}
            step={1}
            defaultValue={heightSize}
            onChange={(e) => setHeightSize(parseFloat(e.target.value))}
            className="w-full"
          />
          <input
            type="number"
            min={2000}
            max={2700}
            value={heightSize}
            onChange={(e) => setHeightSize(parseFloat(e.target.value))}
            className="w-full bg-gray-5 text-gray-2 px-16 py-4 rounded"
          />
          <p>Time of Day</p>
          <ul className="space-y-8">
            <li>
              <button
                data-time-of-day="day"
                onClick={() => setTimeOfDay('day')}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  timeOfDay === 'day' && 'text-gray-7 bg-secondary-darker-1',
                )}
              >
                Day
              </button>
            </li>
            <li>
              <button
                data-time-of-day="night"
                onClick={() => setTimeOfDay('night')}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  timeOfDay === 'night' && 'text-gray-7 bg-secondary-darker-1',
                )}
              >
                Night
              </button>
            </li>
          </ul>
          <p>Models</p>
          <ul className="space-y-8">
            <li>
              <button
                onClick={() => setSelectedModel('vrata-draco.gltf')}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  selectedModel === 'vrata-draco.gltf' &&
                    'text-gray-7 bg-secondary-darker-1',
                )}
              >
                Vrata Draco
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedModel('vrata.gltf')}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  selectedModel === 'vrata.gltf' &&
                    'text-gray-7 bg-secondary-darker-1',
                )}
              >
                Vrata 2
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedModel('vrata-draco-2.gltf')}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  selectedModel === 'vrata-draco-2.gltf' &&
                    'text-gray-7 bg-secondary-darker-1',
                )}
              >
                Vrata 2 -compressed
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedModel('iphone13proDraco.glb')}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  selectedModel === 'iphone13proDraco.glb' &&
                    'text-gray-7 bg-secondary-darker-1',
                )}
              >
                Iphone 13
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedModel('heart.glb')}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  selectedModel === 'heart.glb' &&
                    'text-gray-7 bg-secondary-darker-1',
                )}
              >
                Heart
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedModel('portal.glb')}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  selectedModel === 'portal.glb' &&
                    'text-gray-7 bg-secondary-darker-1',
                )}
              >
                Portal
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedModel('knight.gltf')}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  selectedModel === 'knight.gltf' &&
                    'text-gray-7 bg-secondary-darker-1',
                )}
              >
                Knight
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedModel('kocka.glb')}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  selectedModel === 'kocka.glb' &&
                    'text-gray-7 bg-secondary-darker-1',
                )}
              >
                kocka
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedModel('car.glb')}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  selectedModel === 'car.glb' &&
                    'text-gray-7 bg-secondary-darker-1',
                )}
              >
                car
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedModel('CLOTCHFUBd.glb')}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  selectedModel === 'CLOTCHFUBd.glb' &&
                    'text-gray-7 bg-secondary-darker-1',
                )}
              >
                CLOTCHFUBd.glb
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedModel('heart_baked.glb')}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  selectedModel === 'heart_baked.glb' &&
                    'text-gray-7 bg-secondary-darker-1',
                )}
              >
                heart_baked.glb
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedModel('graces-draco2.glb');
                  setModelProps({});
                }}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  selectedModel === 'graces-draco2.glb' &&
                    'text-gray-7 bg-secondary-darker-1',
                )}
              >
                graces-draco2.glb
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedModel('chinese-dragon.glb');
                  setModelProps({
                    scale: 0.1,
                  });
                }}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  selectedModel === 'chinese-dragon.glb' &&
                    'text-gray-7 bg-secondary-darker-1',
                )}
              >
                chinese-dragon.glb
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedModel('horse-sculpture.glb');
                  setModelProps({
                    scale: 0.15,
                  });
                }}
                className={clsx(
                  'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                  selectedModel === 'horse-sculpture.glb' &&
                    'text-gray-7 bg-secondary-darker-1',
                )}
              >
                horse-sculpture.glb
              </button>
            </li>
          </ul>
        </div>
      )}
      <div
        className="overflow-y-auto max-h-screen relative top-0 bg-transparent col-span-full text-white flex flex-col"
        onScroll={(e) => {
          setScroll(
            // map scroll from 0 to 1
            e.currentTarget.scrollTop /
              (e.currentTarget.scrollHeight - e.currentTarget.clientHeight),
          );
        }}
      >
        <section
          className="min-h-screen p-40 w-1/2 self-start backdrop-blur"
          id="section1"
        >
          <button
            onClick={() =>
              document.getElementById('section2')?.scrollIntoView({
                behavior: 'smooth',
              })
            }
          >
            Go next
          </button>
        </section>
        <section
          className="min-h-screen p-40 w-1/2 self-end backdrop-blur-lg"
          id="section2"
        >
          <button
            onClick={() =>
              document.getElementById('section1')?.scrollIntoView({
                behavior: 'smooth',
              })
            }
          >
            dfgdfgdfgdfgdfg
          </button>
        </section>
      </div>
      <div className="fixed left-0 top-0 h-full w-full -z-[1]">
        <DoorCanvas
          enableStats={enableStats}
          position={[0, 0, 0]}
          widthSize={widthSize}
          heightSize={heightSize}
          selectedModel={selectedModel}
          timeOfDay={timeOfDay}
          {...modelProps}
        />

        {/* <GameCanvas timeOfDay={timeOfDay} /> */}
      </div>
    </>
  );
};

const GameCanvas: React.FC<{
  timeOfDay: 'day' | 'night';
}> = ({ timeOfDay }) => {
  const map = useMemo<KeyboardControlsEntry<ControlsKeys>[]>(
    () => [
      { name: ControlsKeys.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: ControlsKeys.back, keys: ['ArrowDown', 'KeyS'] },
      { name: ControlsKeys.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: ControlsKeys.right, keys: ['ArrowRight', 'KeyD'] },
      { name: ControlsKeys.jump, keys: ['Space'] },
    ],
    [],
  );
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
      // rotate camera by 180 degrees
      camera={{
        zoom: 1,
      }}
    >
      <Suspense fallback={<Loader />}>
        <Lights timeOfDay={timeOfDay} />
        <Effects />
        <Floor />
        {/* render white sprite as a player that can shoot pixels */}
        <KeyboardControls map={map}>
          <Player />
        </KeyboardControls>
        <axesHelper args={[3]} />
      </Suspense>
    </Canvas>
  );
};

const useEventListener = (eventName: string, handler: (e: any) => void) => {
  useEffect(() => {
    window.addEventListener(eventName, handler);
    return () => {
      window.removeEventListener(eventName, handler);
    };
  }, [eventName, handler]);
};

const Player = () => {
  const [sub, get] = useKeyboardControls<ControlsKeys>();
  const { color, size } = useControls('Player', {
    color: '#ff0000',
    size: 1,
  });

  const playerRef = useRef<any>();

  // add WASD controls to move the player
  const speed = 50;
  const { clock, camera } = useThree();

  useFrame(() => {
    const verticalAxes = get().forward ? 1 : get().back ? -1 : 0;
    const horizontalAxes = get().left ? -1 : get().right ? 1 : 0;
    const direction = new Vector3(horizontalAxes, verticalAxes, 0);
    direction.normalize();
    playerRef.current?.position.add(
      direction.multiplyScalar(speed * clock.getDelta()),
    );

    if (playerRef.current) {
      camera.lookAt(playerRef.current?.position);
      // center camera on playerRef
      camera.position.set(
        playerRef.current.position.x,
        playerRef.current.position.y,
        10,
      );
    }

    // if (useKeyPress('shift')) {
    //   // Implement your AddSpeed logic here
    // }
  });

  return (
    <mesh ref={playerRef}>
      <sprite scale={size}>
        <spriteMaterial attach="material" color={color} />
      </sprite>
    </mesh>
  );
};
