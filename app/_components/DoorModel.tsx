'use client';

import { useStore } from '@app/(index)/Controls';
import {
  MeshTransmissionMaterial,
  Plane,
  Torus,
  useGLTF,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { easing } from 'maath';
import { useEffect, useRef } from 'react';
import {
  Color,
  FrontSide,
  MeshPhysicalMaterial,
  type Group,
  type Object3DEventMap,
} from 'three';
import type { GLTF } from 'three-stdlib';

type Props = {
  widthSize: number;
  heightSize: number;
} & React.JSX.IntrinsicElements['group'];

type GLTFResult = GLTF & {
  nodes: {
    Cylinder: THREE.Mesh;
    Cylinder002: THREE.Mesh;
    Cylinder001: THREE.Mesh;
    Cylinder003: THREE.Mesh;
  };
  materials: {
    ['silver 1']: THREE.MeshStandardMaterial;
    silver: THREE.MeshStandardMaterial;
    black: THREE.MeshStandardMaterial;
  };
};

export const DoorModel: React.FC<Props> = ({
  widthSize,
  heightSize,
  ...props
}) => {
  const group = useRef<Group<Object3DEventMap> | null>(null);
  const light = useRef<any>();
  const { scroll, setModel } = useStore();
  const { mousePosition } = useStore();
  const { nodes, materials } = useGLTF('/framer.glb') as GLTFResult;

  useEffect(() => {
    setModel([group.current]);
  }, [setModel]);

  const materialProps = useControls({
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: true,
    samples: { value: 8, min: 1, max: 32, step: 1 },
    resolution: { value: 1024, min: 256, max: 2048, step: 256 },
    transmission: { value: 0.6, min: 0, max: 1 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0.06, min: 0, max: 1 },
    anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 0, min: 0, max: 1 },
    // attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    // attenuationColor: '#ffffff',
    // color: '#c9ffa1',
    // bg: '#839681',
    // depthWrite: false,
    depthTest: false,
    transparent: true,
    polygonOffset: false,
    polygonOffsetFactor: -10,
    toneMapped: false,
  });

  useFrame((state, delta) => {
    if (group.current) {
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
    <group ref={group} dispose={null}>
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          // material={materials.black}
          position={[-0.569, 0.298, -0.695]}
          rotation={[-0.136, -1.12, -1.31]}
          material-side={FrontSide}
          // renderOrder={1}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder003.geometry}
            // material={materials.black}
            position={[0.027, 0.093, 0.413]}
            scale={1.042}
            material-side={FrontSide}
            renderOrder={2}
          >
            {!materialProps.meshPhysicalMaterial ? (
              <MeshTransmissionMaterial
                // background={new Color(materialProps.bg)}
                {...materialProps}
              />
            ) : (
              <meshPhysicalMaterial
                // background={new Color(materialProps.bg)}
                {...materialProps}
              />
            )}
          </mesh>
          {!materialProps.meshPhysicalMaterial ? (
            <MeshTransmissionMaterial
              // background={new Color(materialProps.bg)}
              {...materialProps}
            />
          ) : (
            <meshPhysicalMaterial
              // background={new Color(materialProps.bg)}
              {...materialProps}
            />
          )}
        </mesh>
      </group>

      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          // material={materials['silver 1']}
          material-side={FrontSide}
          position={[-0.208, 0.883, -0.005]}
          rotation={[-0.412, 0.986, 1.171]}
          // renderOrder={3}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder002.geometry}
            // material={materials.silver}
            position={[0.027, 0.093, 0.413]}
            scale={1.042}
            material-side={FrontSide}
            renderOrder={4}
          >
            {!materialProps.meshPhysicalMaterial ? (
              <MeshTransmissionMaterial
                // background={new Color(materialProps.bg)}
                {...materialProps}
              />
            ) : (
              <meshPhysicalMaterial
                // background={new Color(materialProps.bg)}
                {...materialProps}
              />
            )}
          </mesh>
          {!materialProps.meshPhysicalMaterial ? (
            <MeshTransmissionMaterial
              // background={new Color(materialProps.bg)}
              {...materialProps}
            />
          ) : (
            <meshPhysicalMaterial
              // background={new Color(materialProps.bg)}
              {...materialProps}
            />
          )}
        </mesh>
      </group>

      {/* <Torus args={[1, 0.2, 16, 100]} position={[0, 0, -2]}>
        <MeshTransmissionMaterial
          background={new Color(materialProps.bg)}
          {...materialProps}
        />
      </Torus>
      <Torus args={[1, 0.2, 16, 100]} position={[0, 0, 0]}>
        <MeshTransmissionMaterial
          background={new Color(materialProps.bg)}
          {...materialProps}
        />
      </Torus> */}

      {/* <Torus args={[1, 0.2, 16, 100]} position={[0, 0, -2]} renderOrder={-1}>
        <MeshTransmissionMaterial {...materialProps} />
      </Torus>
      <Torus args={[1, 0.2, 16, 100]} position={[0, 0, 0]}>
        <MeshTransmissionMaterial {...materialProps} />
      </Torus>
      <Plane args={[2, 1]} position={[0, 0, -1]} renderOrder={2}>
        <MeshTransmissionMaterial {...materialProps} />
      </Plane> */}
    </group>
  );
};
