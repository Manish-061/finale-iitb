import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Animated 3D shape component
const AnimatedShape = () => {
  const mesh = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(time / 4);
    mesh.current.rotation.y = Math.sin(time / 2);
    let scale = 1 + 0.3 * Math.sin(time);
    mesh.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <dodecahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial 
        color="#3b82f6"
        roughness={0.5}
        metalness={0.8}
        wireframe={true}
      />
    </mesh>
  );
};

// Scene setup component
const Scene = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 5;
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <AnimatedShape />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
};

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white to-blue-50 pt-16">
      {/* 3D Animation Background */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Canvas>
          <Scene />
        </Canvas>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900"
            >
              Transform Your Career with 
              <span className="block text-blue-600">INLIGHN TECH</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-700 mb-8"
            >
              Gain real-world experience with our immersive internship programs in Cyber Security, 
              Full Stack Development, Data Science, Data Analysis and various tech domains. 
              Learn today, lead tomorrow.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <motion.a 
                href="/programs"
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Internships
              </motion.a>
              
              <motion.a 
                href="/about"
                className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Decorative vertical text */}
          <div className="hidden md:flex justify-end relative">
            <div className="absolute right-0 top-0 h-full flex items-center">
              <div className="text-8xl font-bold text-blue-100 transform -rotate-90 origin-center whitespace-nowrap">
                TECH INTERNSHIPS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
