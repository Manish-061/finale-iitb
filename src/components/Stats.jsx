import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Counter animation hook
const useCounter = (end, duration = 2) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    let animationFrame;
    
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      setCount(Math.floor(percentage * end));
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, isInView]);
  
  return { count, ref: nodeRef };
};

const StatItem = ({ icon, value, label }) => {
  const { count, ref } = useCounter(value);
  
  return (
    <motion.div 
      ref={ref}
      className="text-center relative p-6 rounded-xl backdrop-blur-sm"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
      }}
      whileHover={{ 
        scale: 1.05, 
        transition: { duration: 0.2 },
        boxShadow: '0 0 25px rgba(59, 130, 246, 0.5)'
      }}
      animate={{
        boxShadow: [
          '0 0 5px rgba(59, 130, 246, 0.3)',
          '0 0 20px rgba(59, 130, 246, 0.6)',
          '0 0 5px rgba(59, 130, 246, 0.3)'
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      <div className="text-blue-600 text-5xl mb-2">{icon}</div>
      <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{count}+</div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="py-16 md:py-20 bg-blue-50 relative">
      {/* Section background with subtle animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-blue-50/50" 
        animate={{ 
          background: [
            'linear-gradient(to right, rgba(219, 234, 254, 0.5), rgba(239, 246, 255, 0.5))',
            'linear-gradient(to right, rgba(239, 246, 255, 0.5), rgba(219, 234, 254, 0.5))',
            'linear-gradient(to right, rgba(219, 234, 254, 0.5), rgba(239, 246, 255, 0.5))'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto rounded-2xl p-8 relative overflow-hidden"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Animated border glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ 
              border: '2px solid rgba(59, 130, 246, 0.4)',
              zIndex: -1
            }}
            animate={{
              boxShadow: [
                '0 0 5px rgba(59, 130, 246, 0.3) inset, 0 0 10px rgba(59, 130, 246, 0.3)',
                '0 0 15px rgba(59, 130, 246, 0.6) inset, 0 0 20px rgba(59, 130, 246, 0.5)',
                '0 0 5px rgba(59, 130, 246, 0.3) inset, 0 0 10px rgba(59, 130, 246, 0.3)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatItem 
              icon="👨‍💻" 
              value={500} 
              label="Interns Enrolled" 
            />
            <StatItem 
              icon="🚀" 
              value={120} 
              label="Projects Completed" 
            />
            <StatItem 
              icon="😊" 
              value={98} 
              label="Satisfaction Rate %" 
            />
            <StatItem 
              icon="👨‍🏫" 
              value={30} 
              label="Expert Instructors" 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
