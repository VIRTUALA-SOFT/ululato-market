'use client';

/**
 * Universal3DViewer Component
 * 3D product viewer with texture mapping on different geometries
 * Supports: bag (Mochila), box (Coffee), flat (Art)
 */

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  useTexture,
  Environment,
  Html,
  useProgress,
  PresentationControls
} from '@react-three/drei';
import * as THREE from 'three';

// Types
export type ProductType = 'bag' | 'box' | 'flat';

interface Universal3DViewerProps {
  img: string;
  type: ProductType;
  autoRotate?: boolean;
  className?: string;
}

// Loading component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 border-4 border-[#FFD100]/30 border-t-[#FFD100] rounded-full animate-spin" />
        <span className="text-white/70 text-sm font-medium">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}

// Bag Model (Mochila) - Cylinder with texture
function BagModel({ img }: { img: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(img);
  
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.needsUpdate = true;
    }
  }, [texture]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group>
      {/* Main cylinder body */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry args={[1, 0.9, 1.8, 64, 1, true]} />
        <meshStandardMaterial 
          map={texture}
          side={THREE.DoubleSide}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <circleGeometry args={[1, 64]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>
      {/* Bottom cap */}
      <mesh position={[0, -0.9, 0]} rotation={[Math.PI, 0, 0]} castShadow>
        <circleGeometry args={[0.9, 64]} />
        <meshStandardMaterial color="#8b6914" roughness={0.8} />
      </mesh>
      {/* Strap */}
      <mesh position={[0, 1.2, 0]}>
        <torusGeometry args={[0.3, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#5c4a1f" roughness={0.9} />
      </mesh>
    </group>
  );
}

// Box Model (Coffee/Products) - Box with texture on front
function BoxModel({ img }: { img: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useTexture(img);
  
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    }
  }, [texture]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main box */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.4, 2, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Front face with texture */}
      <mesh position={[0, 0, 0.251]} castShadow>
        <planeGeometry args={[1.35, 1.95]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.5}
          metalness={0}
        />
      </mesh>
      {/* Back face with texture */}
      <mesh position={[0, 0, -0.251]} rotation={[0, Math.PI, 0]} castShadow>
        <planeGeometry args={[1.35, 1.95]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.5}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

// Flat Model (Art/Textiles) - Flat panel with texture
function FlatModel({ img }: { img: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useTexture(img);
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    }
  }, [texture]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      // Gentle floating effect
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.6, 2.6, 0.15]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.2} />
      </mesh>
      {/* Canvas/Artwork */}
      <mesh position={[0, 0, 0.08]} castShadow>
        <planeGeometry args={[2.4, 2.4]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.4}
          metalness={0}
        />
      </mesh>
      {/* Glass effect overlay */}
      <mesh position={[0, 0, 0.085]}>
        <planeGeometry args={[2.4, 2.4]} />
        <meshStandardMaterial 
          color="#ffffff"
          transparent
          opacity={0.05}
          roughness={0}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
}

// Scene component that selects the right model
function Scene({ img, type, autoRotate }: { img: string; type: ProductType; autoRotate: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
      >
        <Suspense fallback={<Loader />}>
          {type === 'bag' && <BagModel img={img} />}
          {type === 'box' && <BoxModel img={img} />}
          {type === 'flat' && <FlatModel img={img} />}
        </Suspense>
      </PresentationControls>
      
      <Environment preset="city" />
      
      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={1}
        enablePan={false}
        enableZoom={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        minDistance={2.5}
        maxDistance={6}
      />
    </>
  );
}

// Main component
export default function Universal3DViewer({ 
  img, 
  type, 
  autoRotate = true,
  className = ''
}: Universal3DViewerProps) {
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 20, 150));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 20, 50));
  const handleReset = () => {
    setZoom(100);
    setIsRotating(autoRotate);
  };

  return (
    <div className={`relative w-full h-full min-h-[400px] bg-gradient-to-b from-[#101C38]/50 to-[#050505] rounded-2xl overflow-hidden ${className}`}>
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 4], fov: 45 + (100 - zoom) * 0.3 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<Loader />}>
          <Scene img={img} type={type} autoRotate={isRotating} />
        </Suspense>
      </Canvas>

      {/* Controls Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#050505]/80 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
        {/* Zoom Out */}
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-[#FFD100] transition-colors"
          title="Alejar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
          </svg>
        </button>

        {/* Zoom Level */}
        <span className="text-white/50 text-sm font-medium min-w-[50px] text-center">
          {zoom}%
        </span>

        {/* Zoom In */}
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-[#FFD100] transition-colors"
          title="Acercar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/20" />

        {/* Toggle Rotation */}
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`w-8 h-8 flex items-center justify-center transition-colors ${isRotating ? 'text-[#FFD100]' : 'text-white/70 hover:text-[#FFD100]'}`}
          title={isRotating ? 'Pausar rotación' : 'Activar rotación'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-[#FFD100] transition-colors"
          title="Restablecer vista"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m0 0a8.001 8.001 0 0115.356 2M4 4h5m11 16v-5h-.581m0 0a8.003 8.003 0 01-15.357-2M20 20h-5" />
          </svg>
        </button>
      </div>

      {/* Type Badge */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-[#FFD100]/20 backdrop-blur-md rounded-full border border-[#FFD100]/30">
        <span className="text-[#FFD100] text-xs font-semibold uppercase tracking-wider">
          {type === 'bag' ? 'Mochila 3D' : type === 'box' ? 'Producto 3D' : 'Arte 3D'}
        </span>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/40 text-xs text-center">
        Arrastra para rotar • Scroll para zoom
      </div>
    </div>
  );
}
