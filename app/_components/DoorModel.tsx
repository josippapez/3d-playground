'use client';

import { Bounds, useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type GLTFDoorResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.MeshPhysicalMaterial>;
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

  Object.values(nodes).forEach((node) => {
    if (node.isMesh) {
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
