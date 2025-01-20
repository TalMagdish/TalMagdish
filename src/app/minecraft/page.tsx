'use client';

import dynamic from 'next/dynamic';
import { NavBar } from "@/components/nav-bar";

// Create a client-only component for the Three.js scene
const MinecraftScene = dynamic(() => 
  import('@/components/MinecraftScene').then((mod) => mod.MinecraftScene), 
  { ssr: false }
);

export default function MinecraftPage() {
  return (
    <>
      <NavBar />
      <div className="relative w-full h-screen">
        <MinecraftScene />
        <div className="absolute top-20 left-4 text-white bg-black/50 p-2 rounded">
          <p>Use WASD to move</p>
          <p>Click and drag to look around</p>
        </div>
      </div>
    </>
  );
}