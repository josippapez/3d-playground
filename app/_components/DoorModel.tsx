'use client';

import { Bounds, useGLTF } from '@react-three/drei';
import { Mesh, MeshPhysicalMaterial, Object3D, PointLight } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type GLTFDoorResult = GLTF & {
  nodes: Record<string, Mesh | PointLight | Object3D>;
  materials: Record<string, MeshPhysicalMaterial>;
};

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
  const { nodes, scene } = useGLTF('/' + selectedModel) as GLTFDoorResult;

  const widthScale = widthSize / 1270;
  const heightScale = heightSize / 2700;

  Object.values(nodes).forEach((node, index) => {
    if (node instanceof Mesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  return (
    <Bounds fit clip observe damping={6} margin={1.2}>
      <primitive
        object={scene}
        dispose={null}
        {...props}
        scale={[widthScale, heightScale, 1]}
      />
    </Bounds>
  );
};
