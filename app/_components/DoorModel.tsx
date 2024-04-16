'use client';

import {
  Bounds,
  Html,
  Plane,
  RoundedBox,
  Stage,
  useAnimations,
  useFBX,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import {
  Clock,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhysicalMaterial,
  MeshToonMaterial,
  Object3D,
  Object3DEventMap,
  PointLight,
  SpotLight,
} from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { easing, geometry } from 'maath';
import { HtmlProps } from '@react-three/drei/web/Html';

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
  const { nodes, scene, animations, scenes } = useGLTF('/' + selectedModel);

  const { ref, mixer, names, actions, clips } = useAnimations(animations);

  console.log(animations, names, actions, clips, nodes, scene);

  const widthScale = widthSize / 1270;
  const heightScale = heightSize / 2700;

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

        console.log(node);
        if (node.name === 'Node_3') {
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
    easing.dampE(
      group.current.rotation,
      [0, -state.pointer.x * (Math.PI / 10), 0],
      1.5,
      delta,
    );
    easing.damp3(
      group.current.position,
      [0, -5.5, 1 - Math.abs(state.pointer.x)],
      1,
      delta,
    );
    easing.damp3(
      light.current.position,
      [state.pointer.x * 12, 0, 8 + state.pointer.y * 4],
      0.2,
      delta,
    );
  });

  return (
    // <Bounds fit clip observe damping={6} margin={1.2}>
    <Stage
      preset={'rembrandt'}
      intensity={1}
      shadows
      adjustCamera
      environment={'city'}
    >
      <group {...props} ref={group}>
        <primitive object={scene} />
        {/* <Annotation position={[1.75, 3, 2.5]}>
          Test <span style={{ fontSize: '1.5em' }}>🌗</span>
        </Annotation> */}
        <spotLight
          angle={0.5}
          penumbra={0.5}
          ref={light}
          castShadow
          intensity={100}
          shadow-mapSize={1024}
          shadow-bias={-0.001}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, -10, 10, 0.1, 50]}
          />
        </spotLight>
      </group>
    </Stage>
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
      occlude="blending"
      className="bg-white rounded-2xl"
    >
      <div onClick={() => console.log('.')}>{children}</div>
    </Html>
  );
};
