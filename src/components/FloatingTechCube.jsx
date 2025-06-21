import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// The main 3D animated component
const TechCube = () => {
  const cubeRef = useRef();
  const sphereRef = useRef();
  const torusRef = useRef();
  
  // Animation loop
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Animate the main cube
    if (cubeRef.current) {
      cubeRef.current.rotation.x = time * 0.3;
      cubeRef.current.rotation.y = time * 0.4;
      cubeRef.current.position.y = Math.sin(time) * 0.5;
    }
    
    // Animate the floating sphere
    if (sphereRef.current) {
      sphereRef.current.position.x = Math.sin(time * 1.5) * 3;
      sphereRef.current.position.y = Math.cos(time * 1.2) * 2;
      sphereRef.current.rotation.z = time * 0.8;
    }
    
    // Animate the torus ring
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.6;
      torusRef.current.rotation.y = time * 0.5;
      torusRef.current.position.x = Math.cos(time * 0.8) * 2.5;
    }
  });

  return (
    <group>
      {/* Main Tech Cube */}
      <Box ref={cubeRef} args={[2, 2, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#3b82f6"
          roughness={0.3}
          metalness={0.8}
          emissive="#1e40af"
          emissiveIntensity={0.1}
        />
      </Box>
      
      {/* Floating Sphere */}
      <Sphere ref={sphereRef} args={[0.6, 32, 32]} position={[3, 1, 0]}>
        <meshStandardMaterial 
          color="#60a5fa"
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Rotating Torus */}
      <Torus ref={torusRef} args={[1, 0.3, 16, 100]} position={[-2, 0, 0]}>
        <meshStandardMaterial 
          color="#2563eb"
          roughness={0.4}
          metalness={0.7}
          wireframe={false}
        />
      </Torus>
      
      {/* Additional smaller elements for tech feel */}
      <Box args={[0.5, 0.5, 0.5]} position={[1.5, 2, 1]}>
        <meshStandardMaterial color="#1d4ed8" wireframe />
      </Box>
      
      <Box args={[0.3, 0.3, 0.3]} position={[-1.8, -1.5, 0.5]}>
        <meshStandardMaterial color="#3b82f6" />
      </Box>
    </group>
  );
};

// Main component
const FloatingTechCube = () => {
  return (
    <div className="w-full h-96 relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow
        />
        <pointLight 
          position={[-10, -10, -5]} 
          intensity={0.5} 
          color="#3b82f6" 
        />
        
        {/* The animated tech cube */}
        <TechCube />
        
        {/* Controls (optional - you can remove this) */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default FloatingTechCube;
