import { useThree } from '@react-three/fiber';
import {
  Bloom,
  EffectComposer,
  Noise,
  SMAA,
  ToneMapping,
} from '@react-three/postprocessing';
import { useControls } from 'leva';
import { ToneMappingMode } from 'postprocessing';
import { useMemo } from 'react';

export function Effects() {
  const { scene, camera } = useThree();
  const {
    enableToneMapping,
    toneMapping,
    enableFX,
    intensity,
    luminanceSmoothing,
    luminanceThreshold,
    whitePoint,
    maxLuminance,
    minLuminance,
  } = useControls(
    'Effects',
    {
      enableFX: true,
      enableToneMapping: false,
      toneMapping: {
        value: ToneMappingMode.OPTIMIZED_CINEON,
        options: {
          optimized_cineon: ToneMappingMode.OPTIMIZED_CINEON,
          aces_filmic: ToneMappingMode.ACES_FILMIC,
          reinhard: ToneMappingMode.REINHARD,
          reinhard2: ToneMappingMode.REINHARD2,
          reinhard2_adaptive: ToneMappingMode.REINHARD2_ADAPTIVE,
          uncharted2: ToneMappingMode.UNCHARTED2,
        },
      },
      luminanceThreshold: { value: 4, min: 0, max: 4, step: 0.05 },
      luminanceSmoothing: { value: 50, min: 0, max: 50, step: 1 },
      intensity: { value: 0.20, min: 0, max: 1, step: 0.01 },
      maxLuminance: { value: 50, min: 0, max: 50, step: 1 },
      minLuminance: { value: 0, min: 0, max: 50, step: 1 },
      whitePoint: { value: 16, min: 0, max: 64, step: 1 },
    },
    {
      color: '#faa',
      collapsed: true,
    },
  );

  return useMemo(
    () => (
      <EffectComposer
        camera={camera}
        scene={scene}
        multisampling={8}
        resolutionScale={1}
        renderPriority={2}
        disableNormalPass={false}
        enabled={enableFX}
      >
        <SMAA />
        <Bloom
          luminanceThreshold={luminanceThreshold}
          mipmapBlur
          luminanceSmoothing={luminanceSmoothing}
          intensity={intensity}
        />
        <Noise opacity={0.02} />
        {enableToneMapping ? (
          <ToneMapping
            mainCamera={camera}
            mainScene={scene}
            mode={toneMapping}
            whitePoint={whitePoint}
            maxLuminance={maxLuminance}
            minLuminance={minLuminance}
          />
        ) : (
          <></>
        )}
      </EffectComposer>
    ),
    [
      camera,
      enableFX,
      enableToneMapping,
      intensity,
      luminanceSmoothing,
      luminanceThreshold,
      maxLuminance,
      minLuminance,
      scene,
      toneMapping,
      whitePoint,
    ],
  );
}
