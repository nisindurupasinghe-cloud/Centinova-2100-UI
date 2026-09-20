import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Sparkles } from '@react-three/drei';
import { LIVE_VEHICLES, CITY_NODES } from '../../data/transitData';
import * as THREE from 'three';

function CityBuildings() {
  const buildings = [
    { pos: [-3, 0.8, -2], size: [0.8, 1.6, 0.8], color: '#09152b' },
    { pos: [-2, 1.5, 3], size: [1.0, 3.0, 1.0], color: '#0b1d3a' },
    { pos: [3.5, 2.2, -3], size: [0.9, 4.4, 0.9], color: '#0a1630' },
    { pos: [4, 1.0, 2], size: [1.2, 2.0, 1.2], color: '#0d2247' },
    { pos: [0, 2.8, -4], size: [1.4, 5.6, 1.4], color: '#091428' },
    { pos: [-4, 1.2, 0], size: [0.7, 2.4, 0.7], color: '#0a1732' }
  ];

  return (
    <group>
      {buildings.map((b, idx) => (
        <mesh key={idx} position={b.pos}>
          <boxGeometry args={b.size} />
          <meshStandardMaterial color={b.color} roughness={0.3} metalness={0.8} />
          {/* Neon Top Tower Edge */}
          <lineSegments position={[0, b.size[1] / 2, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(b.size[0], 0.05, b.size[2])]} />
            <lineBasicMaterial color="#00f3ff" />
          </lineSegments>
        </mesh>
      ))}
    </group>
  );
}

function MovingVehicle({ vehicle, isSelected, onSelect }) {
  const meshRef = useRef();
  const [posOffset] = useState(() => Math.random() * 10);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() * 0.4 + posOffset;
      const radius = 3.2 + Math.sin(t * 0.3) * 0.5;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = vehicle.modeId === 'air_pod' ? 2.8 + Math.sin(t * 2) * 0.3 : vehicle.modeId === 'hyper_train' ? -0.4 : 0.4;
      meshRef.current.rotation.y = -t + Math.PI / 2;
    }
  });

  const color = vehicle.modeId === 'air_pod' ? '#00f3ff' : vehicle.modeId === 'hyper_train' ? '#ff007f' : vehicle.modeId === 'quantum_bus' ? '#00ff88' : '#9d4edd';

  return (
    <group ref={meshRef} position={vehicle.coords} onClick={() => onSelect(vehicle)}>
      <mesh>
        <boxGeometry args={isSelected ? [0.5, 0.5, 0.8] : [0.35, 0.35, 0.6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isSelected ? 3 : 1.5} />
      </mesh>
      {/* Light Beam Pulse */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.02, 0.4, 0.6, 16]} />
        <meshBasicMaterial color={color} opacity={0.4} transparent />
      </mesh>
      {isSelected && (
        <Html distanceFactor={8} position={[0, 0.6, 0]}>
          <div className="bg-black/90 text-white text-[10px] px-2 py-1 rounded border border-cyan-400 font-mono shadow-2xl backdrop-blur-md">
            <span className="text-cyan-400 font-bold">{vehicle.name}</span>
            <div className="text-gray-300">{vehicle.speed} • {vehicle.battery}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function LiveTracking3DCanvas({ selectedVehicle, onSelectVehicle, viewMode = '3d' }) {
  return (
    <div className="w-full h-full min-h-[400px] relative rounded-2xl overflow-hidden glass-panel">
      <Canvas camera={{ position: viewMode === 'top' ? [0, 10, 0.1] : [0, 4, 7], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, 5, 0]} intensity={3} color="#00f3ff" />

        {/* Cyber Grid Floor */}
        <gridHelper args={[20, 20, '#00f3ff', '#1a2c4e']} position={[0, -0.5, 0]} />

        {/* 3D Buildings & Infrastructure */}
        <CityBuildings />

        {/* Live Moving Vehicles */}
        {LIVE_VEHICLES.map((vehicle) => (
          <MovingVehicle
            key={vehicle.id}
            vehicle={vehicle}
            isSelected={selectedVehicle?.id === vehicle.id}
            onSelect={onSelectVehicle}
          />
        ))}

        {/* Particle Sky Atmosphere */}
        <Sparkles count={100} scale={12} size={2} speed={0.3} color="#00f3ff" />

        <OrbitControls
          enableZoom={true}
          maxPolarAngle={viewMode === 'top' ? 0.1 : Math.PI / 2.1}
          minPolarAngle={0.1}
          autoRotate={viewMode === '3d'}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
