// import { useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import * as THREE from 'three';
// import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';

// // Animated 3D shape component
// const AnimatedShape = () => {
//   const mesh = useRef();
  
//   useFrame((state) => {
//     const time = state.clock.getElapsedTime();
//     mesh.current.rotation.x = Math.sin(time / 4);
//     mesh.current.rotation.y = Math.sin(time / 2);
//     let scale = 1 + 0.3 * Math.sin(time);
//     mesh.current.scale.set(scale, scale, scale);
//   });

//   return (
//     <mesh ref={mesh} position={[0, 0, 0]}>
//       <dodecahedronGeometry args={[1.5, 0]} />
//       <meshStandardMaterial 
//         color="#3b82f6"
//         roughness={0.5}
//         metalness={0.8}
//         wireframe={true}
//       />
//     </mesh>
//   );
// };

// // Scene setup component
// const Scene = () => {
//   const { camera } = useThree();
  
//   useEffect(() => {
//     camera.position.z = 5;
//   }, [camera]);

//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} intensity={1} />
//       <AnimatedShape />
//       <OrbitControls enableZoom={false} enablePan={false} />
//     </>
//   );
// };

// const Hero = () => {
//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delayChildren: 0.3,
//         staggerChildren: 0.2
//       }
//     }
//   };
  
//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };

//   return (
//     <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white to-blue-50 pt-16">
//       {/* 3D Animation Background */}
//       <div className="absolute inset-0 z-0 opacity-70">
//         <Canvas>
//           <Scene />
//         </Canvas>
//       </div>
      
//       <div className="container mx-auto px-4 md:px-6 z-10 relative">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="text-center md:text-left"
//           >
//             <motion.h1 
//               variants={itemVariants}
//               className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900"
//             >
//               Transform Your Career with 
//               <span className="block text-blue-600">INLIGHN TECH</span>
//             </motion.h1>
            
//             <motion.p 
//               variants={itemVariants}
//               className="text-lg md:text-xl text-gray-700 mb-8"
//             >
//               Gain real-world experience with our immersive internship programs in Cyber Security, 
//               Full Stack Development, Data Science, Data Analysis and various tech domains. 
//               Learn today, lead tomorrow.
//             </motion.p>
            
//             <motion.div 
//               variants={itemVariants}
//               className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
//             >
//               <motion.a 
//                 href="/programs"
//                 className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Explore Internships
//               </motion.a>
              
//               <motion.a 
//                 href="/about"
//                 className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-50 transition-all"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Learn More
//               </motion.a>
//             </motion.div>
//           </motion.div>
          
//           {/* Decorative vertical text */}
//           <div className="hidden md:flex justify-end relative">
//             <div className="absolute right-0 top-0 h-full flex items-center">
//               <div className="text-8xl font-bold text-blue-100 transform -rotate-90 origin-center whitespace-nowrap">
//                 TECH INTERNSHIPS
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Torus } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { use3DOptimization } from '../hooks/use3DOptimization';
import { useAnimation } from '../contexts/AnimationContext';

// Original Animated 3D shape component (Wireframe Dodecahedron)
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

// New FloatingTechCube elements
const FloatingTechElements = () => {
  const cubeRef = useRef();
  const sphereRef = useRef();
  const torusRef = useRef();
  const smallCube1Ref = useRef();
  const smallCube2Ref = useRef();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Animate the main tech cube
    if (cubeRef.current) {
      cubeRef.current.rotation.x = time * 0.3;
      cubeRef.current.rotation.y = time * 0.4;
      cubeRef.current.position.y = Math.sin(time * 1.2) * 0.3;
    }
    
    // Animate the floating sphere
    if (sphereRef.current) {
      sphereRef.current.position.x = Math.sin(time * 1.5) * 2.5;
      sphereRef.current.position.y = Math.cos(time * 1.2) * 1.5;
      sphereRef.current.rotation.z = time * 0.8;
    }
    
    // Animate the torus ring
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.6;
      torusRef.current.rotation.y = time * 0.5;
      torusRef.current.position.x = Math.cos(time * 0.8) * 2;
      torusRef.current.position.z = Math.sin(time * 0.6) * 1;
    }
    
    // Animate small cubes
    if (smallCube1Ref.current) {
      smallCube1Ref.current.rotation.x = time * 1.2;
      smallCube1Ref.current.rotation.y = time * 0.8;
      smallCube1Ref.current.position.y = 1.5 + Math.sin(time * 2) * 0.3;
    }
    
    if (smallCube2Ref.current) {
      smallCube2Ref.current.rotation.z = time * 1.5;
      smallCube2Ref.current.position.x = -1.5 + Math.cos(time * 1.8) * 0.5;
    }
  });

  return (
    <group position={[3, 0, -2]}>
      {/* Main Tech Cube */}
      <Box ref={cubeRef} args={[1.2, 1.2, 1.2]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#2563eb"
          roughness={0.3}
          metalness={0.8}
          emissive="#1e40af"
          emissiveIntensity={0.1}
        />
      </Box>
      
      {/* Floating Sphere */}
      <Sphere ref={sphereRef} args={[0.4, 32, 32]} position={[2, 0.5, 0]}>
        <meshStandardMaterial 
          color="#60a5fa"
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Rotating Torus */}
      <Torus ref={torusRef} args={[0.6, 0.2, 16, 100]} position={[-1.5, 0, 0]}>
        <meshStandardMaterial 
          color="#1d4ed8"
          roughness={0.4}
          metalness={0.7}
        />
      </Torus>
      
      {/* Additional smaller elements */}
      <Box ref={smallCube1Ref} args={[0.3, 0.3, 0.3]} position={[1, 1.5, 0.5]}>
        <meshStandardMaterial color="#3b82f6" wireframe />
      </Box>
      
      <Box ref={smallCube2Ref} args={[0.2, 0.2, 0.2]} position={[-1.5, -1, 0.3]}>
        <meshStandardMaterial color="#2563eb" />
      </Box>
    </group>
  );
};

// Combined Scene setup component
const CombinedScene = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 8;
    camera.position.y = 1;
  }, [camera]);

  return (
    <>
      {/* Enhanced Lighting Setup */}
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
      <pointLight 
        position={[5, 5, 5]} 
        intensity={0.3} 
        color="#60a5fa" 
      />
      
      {/* Original Animated Shape (Center) */}
      <AnimatedShape />
      
      {/* New Floating Tech Elements (Right side) */}
      <FloatingTechElements />
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate={true}
        autoRotateSpeed={0.3}
      />
    </>
  );
};

const Hero = () => {
  const canRender3D = use3DOptimization();
  const { animationsEnabled, reducedMotion } = useAnimation();
  const enable3D = canRender3D && animationsEnabled && !reducedMotion;
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-blue-50 to-blue-100 pt-16">
      
      {/* Enhanced 3D Animation Background with both animations */}
      {enable3D && (
        <div className="absolute inset-0 z-0">
          <Canvas
            shadows
            dpr={[1, 1.5]}
            gl={{ antialias: false, powerPreference: 'high-performance' }}
          >
            <CombinedScene />
          </Canvas>
        </div>
      )}
      
      {/* Animated particles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={
              animationsEnabled && !reducedMotion
                ? { y: [0, -30, 0], opacity: [0.3, 0.7, 0.3], scale: [1, 1.5, 1] }
                : { opacity: 0.2 }
            }
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
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
              <span className="block text-blue-600 relative">
                INLIGHN TECH
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </span>
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
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <Link 
                  to="/programs"
                  className="relative bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-all block text-center"
                >
                  Explore Internships
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/about"
                  className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-50 transition-all block text-center"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Enhanced decorative vertical text with animation */}
          <div className="hidden md:flex justify-end relative">
            <motion.div 
              className="absolute right-0 top-0 h-full flex items-center"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="text-8xl font-bold text-blue-100 transform -rotate-90 origin-center whitespace-nowrap">
                TECH INTERNSHIPS
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={animationsEnabled && !reducedMotion ? { y: [0, 10, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-blue-600 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-blue-600 rounded-full mt-2"
            animate={animationsEnabled && !reducedMotion ? { y: [0, 12, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
