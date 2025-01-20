'use client';

import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';

// Import Scene component dynamically with no loading state
const DynamicScene = dynamic(() => import('./scene').then(mod => mod.Scene), {
  ssr: false,
});

export function ThreeDAvatar() {
  return (
    <div className="h-[300px] w-[300px]">
      <Canvas
        camera={{ position: [3, 3, 3], fov: 75 }}
        shadows
        gl={{ antialias: true }}
      >
        <DynamicScene />
      </Canvas>
    </div>
  );
} 