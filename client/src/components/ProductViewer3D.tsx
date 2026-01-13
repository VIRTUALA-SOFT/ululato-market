/**
 * ULULATO Product 3D Viewer Component
 * Design: Interactive 3D product visualization using Three.js
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 * 
 * Features:
 * - 360° rotation with mouse drag
 * - Zoom with scroll wheel
 * - Auto-rotation toggle
 * - Product image mapped to 3D geometry
 */

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Environment, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';
import { RotateCcw, Pause, Play, ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductViewer3DProps {
  imageUrl: string;
  productName: string;
  className?: string;
}

// Product mesh that displays the image on a curved surface
function ProductMesh({ imageUrl, autoRotate }: { imageUrl: string; autoRotate: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  
  // Configure texture
  useEffect(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  // Auto rotation
  useFrame((_, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {/* Cylinder geometry to wrap the product image around */}
      <cylinderGeometry args={[2, 2, 2.5, 64, 1, true]} />
      <meshStandardMaterial 
        map={texture} 
        side={THREE.DoubleSide}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
}

// Flat product display for items that look better flat
function FlatProductMesh({ imageUrl, autoRotate }: { imageUrl: string; autoRotate: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  useFrame((_, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={meshRef as any}>
      {/* Front face */}
      <mesh position={[0, 0, 0.01]} castShadow>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial 
          map={texture} 
          side={THREE.FrontSide}
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>
      {/* Back face */}
      <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]} castShadow>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial 
          map={texture} 
          side={THREE.FrontSide}
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>
      {/* Edge */}
      <mesh>
        <boxGeometry args={[3, 3, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Box product display for 3D box-like products
function BoxProductMesh({ imageUrl, autoRotate }: { imageUrl: string; autoRotate: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  useFrame((_, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial 
        map={texture} 
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
}

// Sphere product display for rounded products
function SphereProductMesh({ imageUrl, autoRotate }: { imageUrl: string; autoRotate: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
    }
  }, [texture]);

  useFrame((_, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[1.8, 64, 64]} />
      <meshStandardMaterial 
        map={texture} 
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
}

// Camera controls component
function CameraController({ zoom }: { zoom: number }) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 5 / zoom;
    camera.updateProjectionMatrix();
  }, [zoom, camera]);

  return null;
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#FFD100" wireframe />
    </mesh>
  );
}

export default function ProductViewer3D({ imageUrl, productName, className }: ProductViewer3DProps) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'flat' | 'cylinder' | 'box' | 'sphere'>('flat');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setAutoRotate(true);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const renderProductMesh = () => {
    switch (viewMode) {
      case 'cylinder':
        return <ProductMesh imageUrl={imageUrl} autoRotate={autoRotate} />;
      case 'box':
        return <BoxProductMesh imageUrl={imageUrl} autoRotate={autoRotate} />;
      case 'sphere':
        return <SphereProductMesh imageUrl={imageUrl} autoRotate={autoRotate} />;
      default:
        return <FlatProductMesh imageUrl={imageUrl} autoRotate={autoRotate} />;
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative w-full aspect-square rounded-2xl overflow-hidden',
        'bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900',
        'border border-white/10',
        isFullscreen && 'fixed inset-0 z-50 rounded-none aspect-auto',
        className
      )}
    >
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1}
            castShadow
          />
          <spotLight 
            position={[-10, -10, -10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={0.5}
          />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFD100" />
          
          {/* Environment for reflections */}
          <Environment preset="studio" />
          
          {/* Product */}
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Infinity, Infinity]}
            snap={true}
          >
            {renderProductMesh()}
          </PresentationControls>
          
          {/* Camera zoom control */}
          <CameraController zoom={zoom} />
          
          {/* Orbit controls for additional interaction */}
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={10}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>

      {/* Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        {/* View mode selector */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-black/50 backdrop-blur-md pointer-events-auto">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-8 px-3 text-xs',
              viewMode === 'flat' && 'bg-primary text-primary-foreground'
            )}
            onClick={() => setViewMode('flat')}
          >
            Plano
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-8 px-3 text-xs',
              viewMode === 'cylinder' && 'bg-primary text-primary-foreground'
            )}
            onClick={() => setViewMode('cylinder')}
          >
            360°
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-8 px-3 text-xs',
              viewMode === 'box' && 'bg-primary text-primary-foreground'
            )}
            onClick={() => setViewMode('box')}
          >
            Cubo
          </Button>
        </div>

        {/* Fullscreen button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 pointer-events-auto"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <X className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </Button>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 pointer-events-none">
        <div className="flex items-center gap-2 p-2 rounded-xl bg-black/50 backdrop-blur-md pointer-events-auto">
          {/* Zoom out */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-white hover:bg-white/20"
            onClick={handleZoomOut}
            title="Alejar"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>

          {/* Zoom indicator */}
          <span className="text-xs text-white/70 min-w-[40px] text-center">
            {Math.round(zoom * 100)}%
          </span>

          {/* Zoom in */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-white hover:bg-white/20"
            onClick={handleZoomIn}
            title="Acercar"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-white/20" />

          {/* Auto rotate toggle */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-9 w-9 rounded-full text-white hover:bg-white/20',
              autoRotate && 'bg-primary/30'
            )}
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Pausar rotación' : 'Iniciar rotación'}
          >
            {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>

          {/* Reset */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-white hover:bg-white/20"
            onClick={handleReset}
            title="Restablecer vista"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-20 left-0 right-0 text-center pointer-events-none">
        <p className="text-xs text-white/50">
          Arrastra para rotar • Scroll para zoom • {productName}
        </p>
      </div>
    </div>
  );
}
