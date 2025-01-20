'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { NavBar } from "@/components/nav-bar";

export default function MinecraftPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Constants
    const worldWidth = 128;
    const worldDepth = 128;
    const worldHalfWidth = worldWidth / 2;
    const worldHalfDepth = worldDepth / 2;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfd1e5);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
    const data = generateHeight(worldWidth, worldDepth);
    camera.position.y = getY(worldHalfWidth, worldHalfDepth, data, worldWidth) * 100 + 100;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Controls setup
    const controls = new FirstPersonControls(camera, renderer.domElement);
    controls.movementSpeed = 1000;
    controls.lookSpeed = 0.125;
    controls.lookVertical = true;

    // Geometry setup
    const matrix = new THREE.Matrix4();
    const pxGeometry = new THREE.PlaneGeometry(100, 100);
    const nxGeometry = new THREE.PlaneGeometry(100, 100);
    const pyGeometry = new THREE.PlaneGeometry(100, 100);
    const pzGeometry = new THREE.PlaneGeometry(100, 100);
    const nzGeometry = new THREE.PlaneGeometry(100, 100);

    // Set up geometry transformations
    pxGeometry.rotateY(Math.PI / 2);
    pxGeometry.translate(50, 0, 0);

    nxGeometry.rotateY(-Math.PI / 2);
    nxGeometry.translate(-50, 0, 0);

    pyGeometry.rotateX(-Math.PI / 2);
    pyGeometry.translate(0, 50, 0);

    pzGeometry.translate(0, 0, 50);

    nzGeometry.rotateY(Math.PI);
    nzGeometry.translate(0, 0, -50);

    // Set up UV coordinates
    setupGeometries(pxGeometry, nxGeometry, pyGeometry, pzGeometry, nzGeometry);

    // Generate terrain
    const geometries = generateTerrain(worldWidth, worldDepth, matrix, {
      pxGeometry, nxGeometry, pyGeometry, pzGeometry, nzGeometry
    }, data, worldWidth);

    const geometry = mergeGeometries(geometries);
    geometry.computeBoundingSphere();

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/minecraft/atlas.png');
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.NearestFilter;

    // Create mesh
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide })
    );
    scene.add(mesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xeeeeee, 3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 12);
    directionalLight.position.set(1, 1, 0.5).normalize();
    scene.add(directionalLight);

    // Animation
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      controls.update(clock.getDelta());
      renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      controls.handleResize();
    }

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className="relative w-full h-screen">
        <div ref={containerRef} className="absolute inset-0" />
        <div className="absolute top-20 left-4 text-white bg-black/50 p-2 rounded">
          <p>Use WASD to move</p>
          <p>Click and drag to look around</p>
        </div>
      </div>
    </>
  );
}

// Helper functions
function generateHeight(width: number, height: number) {
  const size = width * height;
  const data = new Array(size);
  const perlin = new ImprovedNoise();
  const z = Math.random() * 100;

  let quality = 2;

  for (let j = 0; j < 4; j++) {
    if (j === 0) for (let i = 0; i < size; i++) data[i] = 0;

    for (let i = 0; i < size; i++) {
      const x = i % width;
      const y = ~~(i / width);
      data[i] += perlin.noise(x / quality, y / quality, z) * quality;
    }

    quality *= 4;
  }

  return data;
}

function getY(x: number, z: number, data: number[], width: number) {
  return (data[x + z * width] * 0.15) | 0;
}

function setupGeometries(...geometries: THREE.PlaneGeometry[]) {
  // Update UV coordinates for side faces
  geometries.forEach((geometry, index) => {
    if (index === 2) { // pyGeometry (top face)
      geometry.attributes.uv.array[5] = 0.5;
      geometry.attributes.uv.array[7] = 0.5;
    } else { // side faces
      geometry.attributes.uv.array[1] = 0.5;
      geometry.attributes.uv.array[3] = 0.5;
    }
  });
}

function generateTerrain(
  worldWidth: number,
  worldDepth: number,
  matrix: THREE.Matrix4,
  geometries: Record<string, THREE.PlaneGeometry>,
  data: number[],
  width: number
) {
  const result = [];

  for (let z = 0; z < worldDepth; z++) {
    for (let x = 0; x < worldWidth; x++) {
      const h = getY(x, z, data, width);

      matrix.makeTranslation(
        x * 100 - (worldWidth / 2) * 100,
        h * 100,
        z * 100 - (worldDepth / 2) * 100
      );

      const px = getY(x + 1, z, data, width);
      const nx = getY(x - 1, z, data, width);
      const pz = getY(x, z + 1, data, width);
      const nz = getY(x, z - 1, data, width);

      result.push(geometries.pyGeometry.clone().applyMatrix4(matrix));

      if ((px !== h && px !== h + 1) || x === 0) {
        result.push(geometries.pxGeometry.clone().applyMatrix4(matrix));
      }
      if ((nx !== h && nx !== h + 1) || x === worldWidth - 1) {
        result.push(geometries.nxGeometry.clone().applyMatrix4(matrix));
      }
      if ((pz !== h && pz !== h + 1) || z === worldDepth - 1) {
        result.push(geometries.pzGeometry.clone().applyMatrix4(matrix));
      }
      if ((nz !== h && nz !== h + 1) || z === 0) {
        result.push(geometries.nzGeometry.clone().applyMatrix4(matrix));
      }
    }
  }

  return result;
}