import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface TreeProps {
  position?: [number, number, number];
  scale?: number;
}

const Tree = ({ position = [0, 0, 0], scale = 1 }: TreeProps) => {
  return (
    <group position={position} scale={scale}>
      {/* Tree trunk */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 4]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>

      {/* Tree foliage */}
      <mesh position={[0, 4.5, 0]}>
        <coneGeometry args={[2, 4, 8]} />
        <meshStandardMaterial color="#2d5a27" />
      </mesh>
    </group>
  );
};

export const TreeViewer = () => {
  const [rotation, setRotation] = useState(0);

  return (
    <div className="w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[8, 8, 8]} />
        <OrbitControls enableZoom={true} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
        />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#8b7355" />
        </mesh>

        {/* Trees */}
        <Tree position={[0, 0, 0]} />
        <Tree position={[-3, 0, 2]} scale={0.8} />
        <Tree position={[2, 0, -2]} scale={1.2} />
      </Canvas>
    </div>
  );
};