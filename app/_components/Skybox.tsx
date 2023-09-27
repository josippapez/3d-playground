'use client';

import { Sky, Stars } from '@react-three/drei';

type Props = {
  timeOfDay: 'day' | 'night';
};

export const Skybox: React.FC<Props> = ({ timeOfDay }) => {
  return timeOfDay === 'day' ? (
    <Sky sunPosition={[100, 20, 100]} />
  ) : (
    <>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <color attach="background" args={['#23354d']} />
    </>
  );
};
