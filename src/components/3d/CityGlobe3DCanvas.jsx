import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, Html } from '@react-three/drei';
import { CITY_NODES } from '../../data/transitData';

function HolographicCityMesh({ activeNode, onSelectNode }) {
  const globeGroup = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    if (globeGroup.current) {
      globeGroup.current.rotation.y += 0.003;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= 0.005;
    }
  });

  return (
    <group ref={globeGroup}>
      {/* Wireframe Core Globe */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 32, 24]} />
        <meshBasicMaterial color="#00f3ff" wireframe opacity={0.18} transparent />
      </mesh>

      {/* Inner Glowing Hologram Core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.2, 24, 24]} />
        <meshStandardMaterial
          color="#0b1e42"
          emissive="#003366"
          roughness={0.2}
          transmission={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Outer Holographic Orbital Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.4, 0.03, 16, 64]} />
        <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={2} />
      </mesh>

      {/* Transport Beams / Connectors */}
      {CITY_NODES.map((node, i) => {
        const nextNode = CITY_NODES[(i + 1) % CITY_NODES.length];
        return (
          <line key={`beam-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([...node.coords, ...nextNode.coords])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00ff88" opacity={0.5} transparent linewidth={1} />
          </line>
        );
      })}

      {/* City Hub Nodes */}
      {CITY_NODES.map((node) => {
        const isSelected = activeNode?.id === node.id;
        const color = node.type === 'air_pod' ? '#00f3ff' : node.type === 'hyper_train' ? '#ff007f' : '#00ff88';

        return (
          <group key={node.id} position={node.coords}>
            <mesh onClick={() => onSelectNode && onSelectNode(node)}>
              <sphereGeometry args={[isSelected ? 0.25 : 0.16, 16, 16]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <ringGeometry args={[0.2, 0.28, 16]} />
              <meshBasicMaterial color={color} side={2} opacity={0.7} transparent />
            </mesh>
            {isSelected && (
              <Html distanceFactor={10} position={[0, 0.4, 0]}>
                <div className="bg-black/90 border border-cyan-400 text-cyan-300 text-[11px] px-2 py-1 rounded shadow-lg whitespace-nowrap font-mono backdrop-blur-md">
                  📍 {node.name}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function CityGlobe3DCanvas({ activeNode, onSelectNode }) {
  return (
    <div className="w-full h-full min-h-[300px] relative">
      <Canvas camera={{ position: [0, 0, 6.8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00f3ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff007f" />
        
        <HolographicCityMesh activeNode={activeNode} onSelectNode={onSelectNode} />
        
        <Sparkles count={80} scale={7} size={2.5} speed={0.5} color="#00f3ff" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
