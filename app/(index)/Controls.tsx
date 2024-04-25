'use client';

import { AnimateSentence } from '@app/_clientComponents/AnimateSentence';
import { DoorCanvas } from '@app/_components/DoorCanvas';
import { Effects } from '@app/_components/Effects';
import { Floor } from '@app/_components/Floor';
import { Lights } from '@app/_components/Lights';
import { Loader } from '@app/_components/Loader';
import { motion } from 'framer-motion';
import {
  Html,
  KeyboardControls,
  KeyboardControlsEntry,
  useKeyboardControls,
} from '@react-three/drei';
import { Canvas, GroupProps, useFrame, useThree } from '@react-three/fiber';
import clsx from 'clsx';
import { useControls } from 'leva';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Group, Object3DEventMap, Vector3 } from 'three';
import { create } from 'zustand';
import { easing } from 'maath';

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
  model: (Group<Object3DEventMap> | null)[];
  setModel: (model: (Group<Object3DEventMap> | null)[]) => void;
}>((set) => ({
  scroll: 0,
  mousePosition: { x: 0, y: 0 },
  setScroll: (scroll) => set({ scroll }),
  setMousePosition: (x, y) => {
    set({
      mousePosition: { x, y },
    });
  },
  model: [],
  setModel: (model: (Group<Object3DEventMap> | null)[]) => {
    set({
      model,
    });
  },
}));

const useModelRotation = (rotation: [number, number, number]) => {
  const [triggerRotation, setTriggerRotation] = useState(false);
  const { model } = useStore();
  useFrame(() => {
    if (!model[0] || !triggerRotation) return;
    easing.dampE(model[0].rotation, rotation);
  });

  return {
    triggerRotation,
    setTriggerRotation,
  };
};

export const Controls: React.FC = () => {
  const { triggerRotation, setTriggerRotation } = useModelRotation([0, 0, 0]);
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('day');
  const [widthSize, setWidthSize] = useState(1270);
  const [heightSize, setHeightSize] = useState(2700);
  const { enableStats, enableControls } = useControls(
    {
      enableStats: false,
      enableControls: false,
    },
    undefined,
    {
      collapsed: true,
    },
  );

  const { setScroll, setMousePosition, model } = useStore();
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
  }, []);

  const [modelProps, setModelProps] =
    useState<JSX.IntrinsicElements['group']>();

  return (
    <>
      <Html fullscreen className="text-white flex flex-col gap-20">
        <div
          className="overflow-auto"
          onScroll={(e) => {
            setScroll(
              // map scroll from 0 to 1
              e.currentTarget.scrollTop /
                (e.currentTarget.scrollHeight - e.currentTarget.clientHeight),
            );
          }}
        >
          <section
            className="min-h-svh p-10 self-star flex flex-col justify-between snap-center"
            id="section1"
          >
            <div className="flex flex-col p-9 w-1/2">
              <h1 className="typo-zinc text-9xl font-bold font-primary">
                <AnimateSentence
                  text="Discover the Three Graces"
                  style="word-by-word"
                  delay={0}
                />
              </h1>
            </div>
            <div className="flex flex-col backdrop-blur bg-white bg-opacity-[2%] p-9 rounded-3xl justify-center gap-6 w-fit max-w-[50%]">
              <p className="typo-base font-mono text-xl">
                Welcome to our digital showcase dedicated to the timeless
                elegance of the Three Graces. Immerse yourself in the beauty of
                classical sculpture
              </p>
            </div>
          </section>

          <section
            className="min-h-svh p-10 self-end flex flex-col w-full snap-center justify-between"
            id="section2"
          >
            <div className="flex flex-col p-9 w-1/2 self-end">
              <h2 className="typo-zinc text-6xl font-bold font-primary text-right">
                Experience the Grace
              </h2>
            </div>
            <div className="flex flex-col backdrop-blur self-end bg-white bg-opacity-[2%] p-9 rounded-3xl justify-center gap-6 max-w-[50%]">
              <p className="typo-base font-mono text-xl">
                Explore the exquisite details of the Three Graces from every
                angle. Zoom in to appreciate the intricacies of their forms and
                marvel at their enduring charm.
              </p>
            </div>
          </section>

          <section
            className="min-h-svh p-10 self-center flex flex-col w-full justify-between snap-center"
            id="section2"
          >
            <div className="flex flex-col p-9 w-1/2">
              <h2 className="typo-zinc text-6xl font-bold font-primary">
                A Timeless Tribute
              </h2>
            </div>
            <div className="flex flex-col backdrop-blur self-end bg-white bg-opacity-[2%] p-9 rounded-3xl justify-center gap-6 max-w-[50%]">
              <p className="typo-base font-mono text-xl">
                Learn about the history and symbolism behind the Three Graces,
                celebrated for their embodiment of charm, beauty, and creativity
                throughout the ages.
              </p>
            </div>
          </section>

          <motion.section
            className="min-h-svh p-10 self-center flex flex-col w-full justify-between snap-center"
            id="section2"
            viewport={{
              amount: 'all',
            }}
            onViewportEnter={() => {}}
            onViewportLeave={() => {}}
            // on viewport enter set camera position to the center of the section
          >
            <div className="flex flex-col p-9 w-1/2 self-end">
              <h2 className="typo-zinc text-6xl font-bold font-primary text-right">
                Bring Grace to Your Space
              </h2>
            </div>
            <div className="flex flex-col backdrop-blur bg-white bg-opacity-[2%] p-9 rounded-3xl justify-center gap-6 max-w-[50%]">
              <p className="typo-base font-mono text-xl">
                Enhance your digital projects or presentations with the elegance
                of the Three Graces. Contact us to inquire about licensing
                options.
              </p>
            </div>
          </motion.section>
        </div>
      </Html>
      {/* <div className="fixed left-0 top-0 h-full w-full -z-[1]"> */}
      <DoorCanvas
        enableStats={enableStats}
        position={[0, 0, 0]}
        widthSize={widthSize}
        heightSize={heightSize}
        timeOfDay={timeOfDay}
        {...modelProps}
      />

      {/* <GameCanvas timeOfDay={timeOfDay} /> */}
      {/* </div> */}
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
