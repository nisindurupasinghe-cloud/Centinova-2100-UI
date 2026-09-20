import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, Ring, MeshDistortMaterial } from '@react-three/drei';

function SkyPodMesh({ color }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.008;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Pod Body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 16]} />
        <meshPhysicalMaterial
          color={color}
          emissive="#003344"
          roughness={0.1}
          metalness={0.8}
          transmission={0.4}
          thickness={0.8}
          clearcoat={1}
        />
      </mesh>
      {/* Front Holographic Cockpit Glass */}
      <mesh position={[0, 0.2, 0.7]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[0.9, 0.6, 0.8]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={0.8} transparent roughness={0.05} />
      </mesh>
      {/* Plasma Energy Wings */}
      <mesh position={[-1.4, 0, -0.2]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.8, 0.08, 0.5]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
      <mesh position={[1.4, 0, -0.2]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.8, 0.08, 0.5]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
      {/* Bottom Plasma Thruster Glow */}
      <mesh position={[0, -0.8, -0.4]}>
        <cylinderGeometry args={[0.4, 0.1, 0.6, 16]} />
        <meshBasicMaterial color="#00f3ff" wireframe />
      </mesh>
    </group>
  );
}

function HyperTrainMesh({ color }) {
  const groupRef = useRef();
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.006;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Sleek Capsule */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.65, 2.8, 16, 32]} />
        <meshStandardMaterial color="#1a2035" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* MagLev Ring Arrays */}
      {[-1, -0.3, 0.4, 1.1].map((xPos, idx) => (
        <mesh key={idx} position={[xPos, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.8, 0.06, 16, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} />
        </mesh>
      ))}
      {/* Top Neon Status Stripe */}
      <mesh position={[0, 0.68, 0]}>
        <boxGeometry args={[2.6, 0.06, 0.1]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function QuantumBusMesh({ color }) {
  const groupRef = useRef();
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.007;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Hexagonal Cyber Bus Body */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1.6, 1.1, 2.4]} />
        <meshStandardMaterial color="#0b1329" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Side Glass Panels */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.65, 0.4, 2.2]} />
        <meshPhysicalMaterial color={color} transmission={0.7} roughness={0.1} emissive="#002233" />
      </mesh>
      {/* Inductive Dynamic Wheels */}
      {[
        [-0.85, -0.4, 0.7],
        [0.85, -0.4, 0.7],
        [-0.85, -0.4, -0.7],
        [0.85, -0.4, -0.7]
      ].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.15, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
        </mesh>
      ))}
    </group>
  );
}

function SmartRoadMesh({ color }) {
  const groupRef = useRef();
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.009;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Futuristic Wedge Aerodynamic Pod */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.9, 2.0, 4]} />
        <meshStandardMaterial color="#121a30" roughness={0.1} metalness={0.95} />
      </mesh>
      {/* Undercarriage MagLev Field */}
      <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.0, 1.0, 0.1, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

export default function Vehicle3DViewer({ modelType = 'sky_pod', color = '#00f3ff' }) {
  return (
    <div className="w-full h-full min-h-[220px] relative rounded-xl overflow-hidden cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, -2, -4]} intensity={2} color={color} />
        
        <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.8}>
          {modelType === 'sky_pod' && <SkyPodMesh color={color} />}
          {modelType === 'hyper_train' && <HyperTrainMesh color={color} />}
          {modelType === 'quantum_bus' && <QuantumBusMesh color={color} />}
          {modelType === 'smart_road' && <SmartRoadMesh color={color} />}
        </Float>

        <Sparkles count={40} scale={4} size={2} speed={0.4} color={color} />
        <Ring args={[1.8, 1.84, 32]} position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color={color} opacity={0.6} transparent />
        </Ring>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 4} />
      </Canvas>
      <div className="absolute bottom-2 right-3 pointer-events-none text-[10px] text-cyan-400/70 font-mono flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full border border-cyan-500/20 backdrop-blur-md">
        <span>3D ROTATION READY</span>
      </div>
    </div>
  );
}
