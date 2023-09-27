import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useControls } from 'leva';

export function Effects() {
  const { enableFX, intensity, luminanceSmoothing, luminanceThreshold } =
    useControls({
      enableFX: true,
      luminanceThreshold: { value: 4, min: 0, max: 4, step: 0.05 },
      luminanceSmoothing: { value: 50, min: 0, max: 50, step: 1 },
      intensity: { value: 0.09, min: 0, max: 1, step: 0.01 },
    });

  return (
    enableFX && (
      <EffectComposer multisampling={16} resolutionScale={1} renderPriority={2}>
        <Bloom
          luminanceThreshold={luminanceThreshold}
          mipmapBlur
          luminanceSmoothing={luminanceSmoothing}
          intensity={intensity}
        />
      </EffectComposer>
    )
  );
}
