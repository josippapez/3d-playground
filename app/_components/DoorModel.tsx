'use client';

import { useStore } from '@app/(index)/Controls';
import { Html, RoundedBox } from '@react-three/drei';
import { HtmlProps } from '@react-three/drei/web/Html';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useEffect, useRef, useState } from 'react';
import { Group, Object3DEventMap } from 'three';

type Props = {
  widthSize: number;
  heightSize: number;
} & React.JSX.IntrinsicElements['group'];

export const DoorModel: React.FC<Props> = ({
  widthSize,
  heightSize,
  ...props
}) => {
  const group = useRef<Group<Object3DEventMap> | null>(null);
  const roundedBox = useRef<any>();

  const [hovered, setHovered] = useState(false);

  // const scroll = useScroll();
  const { scroll, setModel } = useStore();
  const { mousePosition } = useStore();
  // const { nodes, scene, animations, scenes } = useGLTF(`/graces-draco2.glb`);
  // const { ref, mixer, names, actions, clips } = useAnimations(animations);
  // const { animationName } = useControls(
  //   'Animation',
  //   {
  //     animationName: {
  //       options: names,
  //       value: names[0],
  //     },
  //   },
  //   [nodes, names, actions],
  // );

  useEffect(() => {
    setModel([group.current]);
  }, [setModel]);

  useFrame((state, delta) => {
    // if (group.current) {
    //   // easing.dampE(
    //   //   group.current.rotation,
    //   //   [0, -state.pointer.x * (Math.PI / 10), 0],
    //   //   1.5,
    //   //   delta,
    //   // );
    //   // easing.damp3(
    //   //   group.current.position,
    //   //   [0, -2.5, 1 - Math.abs(state.pointer.x)],
    //   //   1,
    //   //   delta,
    //   // );
    //   easing.dampE(group.current.rotation, [0, scroll * (Math.PI * 2), 0]);
    // }

    const isHovered = state.raycaster.intersectObject(
      roundedBox.current,
    ).length;

    if (isHovered) {
      easing.damp3(roundedBox.current.position, [0, 1, 0], 0.2, delta);
      easing.dampC(roundedBox.current.material.color, 'purple', 0.2, delta);
    } else {
      easing.damp3(roundedBox.current.position, [0, 0, 0], 0.2, delta);
      easing.dampC(roundedBox.current.material.color, 'gray', 0.2, delta);
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
        {/* <primitive object={scene} /> */}
        <mesh>
          <RoundedBox
            args={[3, 3, 3]}
            radius={0.4}
            ref={roundedBox}
            onPointerOver={(e) => setHovered(true)}
            onPointerLeave={(e) => setHovered(false)}
          >
            {/* <meshLambertMaterial attach="material" color={'gray'} /> */}
            <meshStandardMaterial
              depthTest={true}
              depthWrite={true}
              metalness={0.9}
              roughness={0.5}
              color={'gray'}
            />
          </RoundedBox>
        </mesh>
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
