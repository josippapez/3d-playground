'use client';

import { DoorCanvas } from '@app/_components/DoorCanvas';
import clsx from 'clsx';
import { useState } from 'react';

export const Controls: React.FC = () => {
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('day');
  const [selectedModel, setSelectedModel] = useState('vrata.glb');
  const [widthSize, setWidthSize] = useState(1270);
  const [heightSize, setHeightSize] = useState(2700);
  return (
    <>
      <div className="bg-white z-[1] col-span-12 p-12 space-y-20">
        <p>Resize width</p>
        <input
          type="range"
          min={800}
          max={1270}
          step={1}
          defaultValue={widthSize}
          onChange={(e) => setWidthSize(parseFloat(e.target.value))}
          className="w-full"
        />
        <input
          type="number"
          min={800}
          max={1270}
          value={widthSize}
          onChange={(e) => setWidthSize(parseFloat(e.target.value))}
          className="w-full bg-gray-5 text-gray-2 px-16 py-4 rounded"
        />
        <p>Resize height</p>
        <input
          type="range"
          min={2000}
          max={2700}
          step={1}
          defaultValue={heightSize}
          onChange={(e) => setHeightSize(parseFloat(e.target.value))}
          className="w-full"
        />
        <input
          type="number"
          min={2000}
          max={2700}
          value={heightSize}
          onChange={(e) => setHeightSize(parseFloat(e.target.value))}
          className="w-full bg-gray-5 text-gray-2 px-16 py-4 rounded"
        />
        <p>Time of Day</p>
        <ul className="space-y-8">
          <li>
            <button
              onClick={() => setTimeOfDay('day')}
              className={clsx(
                'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                timeOfDay === 'day' && 'text-gray-7 bg-secondary-darker-1',
              )}
            >
              Day
            </button>
          </li>
          <li>
            <button
              onClick={() => setTimeOfDay('night')}
              className={clsx(
                'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                timeOfDay === 'night' && 'text-gray-7 bg-secondary-darker-1',
              )}
            >
              Night
            </button>
          </li>
        </ul>
        <p>Models</p>
        <ul className="space-y-8">
          <li>
            <button
              onClick={() => setSelectedModel('vrata-draco.gltf')}
              className={clsx(
                'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                selectedModel === 'vrata-draco.gltf' &&
                  'text-gray-7 bg-secondary-darker-1',
              )}
            >
              Vrata Draco
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedModel('vrata.glb')}
              className={clsx(
                'bg-gray-5 text-gray-2 w-full px-16 py-4 rounded',
                selectedModel === 'vrata.glb' &&
                  'text-gray-7 bg-secondary-darker-1',
              )}
            >
              Vrata 2
            </button>
          </li>
        </ul>
      </div>
      <div className="fixed left-0 top-0 h-full w-full -z-1">
        <DoorCanvas
          enableStats
          position={[0, 0, 0]}
          widthSize={widthSize}
          heightSize={heightSize}
          selectedModel={selectedModel}
          timeOfDay={timeOfDay}
        />
      </div>
    </>
  );
};
