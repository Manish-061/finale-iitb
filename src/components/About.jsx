import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus, Cone, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// Floating Tech Icons representing company values
const FloatingTechIcons = () => {
  const groupRef = useRef();
  const excellenceRef = useRef();
  const innovationRef = useRef();
  const communityRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Main group gentle rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
    }
    
    // Excellence icon (Diamond shape)
    if (excellenceRef.current) {
      excellenceRef.current.rotation.x = Math.sin(time * 1.2) * 0.3;
      excellenceRef.current.rotation.z = Math.cos(time * 0.8) * 0.2;
      excellenceRef.current.position.y = Math.sin(time * 1.5) * 0.3;
    }
    
    // Innovation icon (Pulsing sphere)
    if (innovationRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.2;
      innovationRef.current.scale.setScalar(scale);
      innovationRef.current.rotation.y = time * 0.8;
    }
    
    // Community icon (Interconnected torus)
    if (communityRef.current) {
      communityRef.current.rotation.x = time * 0.6;
      communityRef.current.rotation.z = time * 0.4;
      communityRef.current.position.x = Math.sin(time * 0.7) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Excellence - Diamond/Octahedron */}
      <group ref={excellenceRef} position={[-2, 1, 0]}>
        <Cone args={[0.6, 1.2, 8]} position={[0, 0.6, 0]}>
          <meshStandardMaterial 
            color="#3b82f6" 
            roughness={0.2} 
            metalness={0.8}
            emissive="#1e40af"
            emissiveIntensity={0.1}
          />
        </Cone>
        <Cone args={[0.6, 1.2, 8]} position={[0, -0.6, 0]} rotation={[Math.PI, 0, 0]}>
          <meshStandardMaterial 
            color="#3b82f6" 
            roughness={0.2} 
            metalness={0.8}
            emissive="#1e40af"
            emissiveIntensity={0.1}
          />
        </Cone>
      </group>
      
      {/* Innovation - Pulsing Sphere with Orbiting Elements */}
      <group position={[0, 0, 0]}>
        <Sphere ref={innovationRef} args={[0.8, 32, 32]}>
          <meshStandardMaterial 
            color="#60a5fa" 
            roughness={0.3} 
            metalness={0.7}
            transparent
            opacity={0.8}
          />
        </Sphere>
        
        {/* Orbiting small cubes */}
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            args={[0.1, 0.1, 0.1]}
            position={[
              Math.cos((i / 6) * Math.PI * 2) * 1.5,
              Math.sin((i / 6) * Math.PI * 2) * 1.5,
              0
            ]}
          >
            <meshStandardMaterial color="#2563eb" />
          </Box>
        ))}
      </group>
      
      {/* Community - Interconnected Torus */}
      <group ref={communityRef} position={[2, -0.5, 0]}>
        <Torus args={[0.8, 0.2, 16, 100]}>
          <meshStandardMaterial 
            color="#1d4ed8" 
            roughness={0.4} 
            metalness={0.6}
          />
        </Torus>
        <Torus args={[0.6, 0.15, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color="#2563eb" 
            roughness={0.4} 
            metalness={0.6}
          />
        </Torus>
        <Torus args={[0.6, 0.15, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
          <meshStandardMaterial 
            color="#3b82f6" 
            roughness={0.4} 
            metalness={0.6}
          />
        </Torus>
      </group>
      
      {/* Additional floating elements */}
      <Box args={[0.3, 0.3, 0.3]} position={[-3, -1, 1]}>
        <meshStandardMaterial color="#60a5fa" wireframe />
      </Box>
      
      <Sphere args={[0.2, 16, 16]} position={[3, 1.5, -1]}>
        <meshStandardMaterial color="#1d4ed8" />
      </Sphere>
    </group>
  );
};

// Animated Background Grid
const AnimatedGrid = () => {
  const gridRef = useRef();
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      gridRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={gridRef} position={[0, 0, -3]}>
      {/* Create a grid pattern */}
      {[...Array(10)].map((_, i) => (
        <group key={i}>
          {[...Array(10)].map((_, j) => (
            <Box
              key={j}
              args={[0.05, 0.05, 0.05]}
              position={[(i - 5) * 1, (j - 5) * 1, 0]}
            >
              <meshStandardMaterial 
                color="#3b82f6" 
                transparent 
                opacity={0.1}
              />
            </Box>
          ))}
        </group>
      ))}
    </group>
  );
};

// 3D Scene Component
const AboutScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
      {/* Lighting Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        castShadow
      />
      <pointLight 
        position={[-10, -10, -5]} 
        intensity={0.3} 
        color="#3b82f6" 
      />
      <pointLight 
        position={[5, 5, 5]} 
        intensity={0.3} 
        color="#60a5fa" 
      />
      
      {/* 3D Elements */}
      <FloatingTechIcons />
      <AnimatedGrid />
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate={true}
        autoRotateSpeed={0.2}
      />
    </Canvas>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="about">
      
      {/* 3D Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <AboutScene />
      </div>
      
      {/* Animated particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
          >
            We Provide Best <span className="text-blue-600">Internship</span> For You
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <motion.div 
              variants={cardVariants}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                About INLIGHN TECH
              </h3>
              <p className="text-gray-700 leading-relaxed">
                At INLIGHN TECH, we believe that the future of education lies in bridging the gap between academic learning and industry needs. 
                Founded with a passion for providing meaningful and immersive learning experiences, we offer internship programs that equip 
                students and young professionals with practical skills in Full Stack Development, Data Science, and Project Management.
              </p>
            </motion.div>
            
            {/* Mission Section */}
            <motion.div 
              variants={cardVariants}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To empower students and young professionals by providing immersive, real-world learning experiences through tailored 
                internship programs. We aim to equip our participants with the practical skills and confidence they need to succeed 
                in the fast-evolving tech industry.
              </p>
            </motion.div>
            
            {/* Vision Section */}
            <motion.div 
              variants={cardVariants}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To become the premier destination for tech education and internships, recognized globally for our innovative approach to 
                learning. We aspire to create a community of skilled professionals who are empowered to drive technological advancement 
                and make a positive impact in the world.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
