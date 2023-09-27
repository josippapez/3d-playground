'use client';

import { useTexture } from '@react-three/drei';
import { DoubleSide, RepeatWrapping } from 'three';

export const Floor: React.FC = () => {
  const texture = useTexture([
    '/texture/floor/patterned_brick_floor_ao_1k.jpg',
    '/texture/floor/patterned_brick_floor_arm_1k.jpg',
    '/texture/floor/patterned_brick_floor_diff_1k.jpg',
    '/texture/floor/patterned_brick_floor_disp_1k.png',
    '/texture/floor/patterned_brick_floor_nor_gl_1k.jpg',
    '/texture/floor/patterned_brick_floor_rough_1k.jpg',
  ]);

  const [ambientOcclusion, arm, diffuse, displacement, normalDx, roughnessMap] =
    texture;

  texture.forEach((texture) => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.setScalar(50);
  });

  return (
    <mesh rotation-x={[-Math.PI / 2]} receiveShadow position={[0, -0.44, 0]}>
      <planeGeometry args={[100, 100, 1, 1]} />
      <meshStandardMaterial
        roughnessMap={roughnessMap}
        aoMap={ambientOcclusion}
        map={diffuse}
        normalMap={normalDx}
        displacementMap={displacement}
        metalnessMap={arm}
        side={DoubleSide}
      />
    </mesh>
  );
};
