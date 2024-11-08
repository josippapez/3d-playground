'use client';

import { useStore } from '@app/(index)/Controls';
import {
  Html,
  MeshReflectorMaterial,
  useAnimations,
  useGLTF,
} from '@react-three/drei';
import { HtmlProps } from '@react-three/drei/web/Html';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { easing } from 'maath';
import { useEffect, useMemo, useRef } from 'react';
import {
  Group,
  Mesh,
  MeshLambertMaterial,
  MeshPhysicalMaterial,
  Object3DEventMap,
} from 'three';

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
  const light = useRef<any>();
  const { scroll, setModel } = useStore();
  // const scroll = useScroll();
  const { mousePosition } = useStore();
  const { nodes, scene, animations, scenes } = useGLTF(`/framer.glb`);

  const { ref, mixer, names, actions, clips } = useAnimations(animations);

  const { animationName } = useControls(
    'Animation',
    {
      animationName: {
        options: names,
        value: names[0],
      },
    },
    [nodes, names, actions],
  );

  useEffect(() => {
    setModel([group.current]);
  }, [setModel]);

  useMemo(() => {
    Object.values(nodes).forEach((node, index) => {
      if (node instanceof Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;

        console.log(node);

        // blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
        // mixBlur={0} // How much blur mixes with surface roughness (default = 1)
        // mixStrength={1} // Strength of the reflections
        // mixContrast={1} // Contrast of the reflections
        // resolution={256} // Off-buffer resolution, lower=faster, higher=better quality, slower
        // mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        // depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
        // minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        // maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        // depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        // distortion={1} // Amount of distortion based on the distortionMap texture
        // distortionMap={distortionTexture} // The red channel of this texture is used as the distortion map. Default is null
        // debug={0} // Depending on the assigned value, one of the following channels is shown:
        // //0 = no debug
        // //1 = depth channel
        // //2 = base channel
        // //3 = distortion channel
        // //4 = lod channel (based on the roughness)
        // //
        // reflectorOffset={0.2}

        // const physicalMaterial = new MeshPhysicalMaterial({
        //   color: '#FFFFFF',
        //   roughness: 0.1, // Lower roughness for a shi
        //   metalness: 1, // High metalness for re
        //   reflectivity: 1, // Full re
        //   clearcoat: 1, // Additional layer of re
        //   clearcoatRoughness: 0, // Smooth
        //   transmission: 0.9, // Makes it glass-like by adding tr
        //   ior: 1.5, // Index of refraction for gl
        //   thickness: 0.5, // Thickness of the transpar
        // });
        // node.material = physicalMaterial;

        // const tempMaterial = new MeshPhysicalMaterial({
        //   ...node.material,
        //   // color: '#FFFFFF',
        //   roughness: 0.1, // Lower roughness for a shi
        //   metalness: 1, // High metalness for re
        //   clearcoat: 1, // Additional layer of re
        //   clearcoatRoughness: 0.25, // Smooth

        //   // transmission: 0.9, // Makes it glass-like by adding tr
        //   // ior: 1.5, // Index of refraction for gl
        //   // thickness: 0.5, // Thickness of the transpar
        // });
        node.material.clearcoat = 1;
        node.material.clearcoatRoughness = 0;
        node.material.roughness = 0.9;
        node.material.metalness = 1;
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
      easing.dampE(group.current.rotation, [0, scroll * (Math.PI * 2), 0]);
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
      {/* <spotLight
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
          args={[0, 0, 0, 0, 0.1, 50]}
        />
      </spotLight> */}
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
