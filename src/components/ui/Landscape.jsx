import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function TerrainMesh({ color = '#00f3ff', speed = 0.8 }) {
  const meshRef = useRef();

  // Create procedural heightmap terrain geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(30, 30, 60, 60);
    const pos = geo.attributes.position;
    
    // Displace vertices with combined sine noise for rolling futuristic hills
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Keep center lane flatter for transport corridor, elevate outer hills
      const distFromCenter = Math.abs(x);
      const heightFactor = Math.pow(distFromCenter / 15, 1.8);
      const z = (Math.sin(x * 0.5) * Math.cos(y * 0.5) * 1.2 + Math.sin(x * 0.8 + y * 0.4) * 0.8) * heightFactor;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Endless scrolling toward horizon
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.z += delta * speed * 4;
      if (meshRef.current.position.z >= 5) {
        meshRef.current.position.z = 0;
      }
    }
  });

  return (
    <group>
      {/* Primary Wireframe Glowing Terrain */}
      <mesh 
        ref={meshRef} 
        geometry={geometry} 
        rotation={[-Math.PI / 2.2, 0, 0]} 
        position={[0, -2, 0]}
      >
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={1.8} 
          wireframe={true} 
          transparent={true} 
          opacity={0.65} 
        />
      </mesh>

      {/* Solid Dark Base Underneath for Depth */}
      <mesh 
        geometry={geometry} 
        rotation={[-Math.PI / 2.2, 0, 0]} 
        position={[0, -2.05, 0]}
      >
        <meshBasicMaterial color="#040711" />
      </mesh>
    </group>
  );
}

export default function Landscape({
  color = '#00f3ff',
  speed = 0.8,
  className = '',
  children
}) {
  return (
    <div className={`relative w-full overflow-hidden rounded-3xl border-2 border-cyan-500/30 glass-panel shadow-2xl ${className}`}>
      
      {/* 3D Scrolling Horizon Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 1.5, 6], fov: 60 }}>
          {/* Horizon Atmospheric Fog */}
          <fog attach="fog" args={['#040711', 4, 18]} />
          
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 8, -5]} intensity={3} color={color} />
          
          <TerrainMesh color={color} speed={speed} />
        </Canvas>
        
        {/* Top/Bottom Gradient Fades */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#040711] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#040711] to-transparent pointer-events-none" />
      </div>

      {/* Children Content Overlay */}
      {children && (
        <div className="relative z-10 p-6 sm:p-10">
          {children}
        </div>
      )}

    </div>
  );
}
