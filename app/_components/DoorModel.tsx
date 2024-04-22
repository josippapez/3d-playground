'use client';

import { useStore } from '@app/(index)/Controls';
import {
  Html,
  MeshReflectorMaterial,
  Stage,
  useAnimations,
  useGLTF,
  useScroll,
} from '@react-three/drei';
import { HtmlProps } from '@react-three/drei/web/Html';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { easing } from 'maath';
import { useEffect, useMemo, useRef } from 'react';
import { Mesh, MeshLambertMaterial } from 'three';

type Props = {
  widthSize: number;
  heightSize: number;
  selectedModel: string;
} & React.JSX.IntrinsicElements['group'];

export const DoorModel: React.FC<Props> = ({
  widthSize,
  heightSize,
  selectedModel,
  ...props
}) => {
  const group = useRef<any>();
  const light = useRef<any>();
  // const scroll = useScroll();
  const { scroll, mousePosition } = useStore();
  const { nodes, scene, animations, scenes } = useGLTF('/' + selectedModel);

  const { ref, mixer, names, actions, clips } = useAnimations(animations);

  const { animationName } = useControls(
    'Animation',
    {
      animationName: {
        options: names,
        value: names[0],
      },
    },
    [selectedModel, nodes, names, actions],
  );

  useMemo(() => {
    Object.values(nodes).forEach((node, index) => {
      if (node instanceof Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        // node.material.envMapIntensity = 0.8;
        // this is needed because ambient light is not working materials with metalness set to 1
        // That's because metalness pratically reflects light and becomes darker (or in other words
        // the perfect metal doesn't exist in real life)
        if (node.material.metalness === 1) {
          node.material.metalness = 0.9;
        }

        if (
          node.name === 'Node_3' ||
          node.name === 'uploads_files_2654970_Asian+Dragon' ||
          node.name === 'uploads_files_3362108_Horse'
        ) {
          const lambertMaterial = new MeshLambertMaterial({ color: '#404044' });
          node.material = lambertMaterial;
        }
      }
    });
  }, [nodes]);

  useEffect(() => {
    // Reset and fade in animation after an index has been changed
    actions[animationName]?.reset().fadeIn(0.5).play();
    // In the clean-up phase, fade it out
    return () => {
      actions[animationName]?.fadeOut(0.5);
    };
  }, [animationName, actions, names]);

  useFrame((state, delta) => {
    if (group.current) {
      // easing.dampE(
      //   group.current.rotation,
      //   [0, -state.pointer.x * (Math.PI / 10), 0],
      //   1.5,
      //   delta,
      // );
      // easing.damp3(
      //   group.current.position,
      //   [0, -2.5, 1 - Math.abs(state.pointer.x)],
      //   1,
      //   delta,
      // );
      easing.damp3(group.current.rotation, [0, scroll * (Math.PI * 2), 0]);
    }
    if (light.current) {
      easing.damp3(
        light.current.position,
        [mousePosition.x * 12, mousePosition.y * 4, 5],
        0.2,
        delta,
      );
    }
  });

  return (
    // <Bounds fit clip observe damping={6} margin={1.2}>
    // <Stage
    //   preset={'rembrandt'}
    //   intensity={1}
    //   shadows
    //   adjustCamera
    //   environment={'city'}
    // >
    <group>
      <group {...props} ref={group}>
        <primitive object={scene} />
        {/* <Annotation position={[1.75, 3, 2.5]}>
          Click <span style={{ fontSize: '1.5em' }}>🌗</span>
        </Annotation> */}
      </group>
      {/* <mesh position={props.position} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 5]} />
        <MeshReflectorMaterial
          mirror={1}
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={15}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#151515"
          metalness={0.6}
          roughness={1}
        />
      </mesh> */}
      <spotLight
        angle={0.5}
        penumbra={0.5}
        ref={light}
        castShadow
        intensity={150}
        shadow-mapSize={1024}
        shadow-bias={-0.001}
        position={[0, 0, 5]}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 50]}
        />
      </spotLight>
    </group>
    // </Stage>
  );
};

const Annotation: React.FC<
  {
    children: React.ReactNode;
  } & HtmlProps
> = ({ children, ...props }) => {
  return (
    <Html
      {...props}
      transform
      occlude="raycast"
      className="bg-white rounded-2xl hover:bg-slate-600 transition-all cursor-pointer"
    >
      <div onClick={() => console.log('.')}>{children}</div>
    </Html>
  );
};
