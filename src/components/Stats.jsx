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
      className="text-center"
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <div className="text-blue-600 text-5xl mb-2">{icon}</div>
      <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{count}+</div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="py-16 md:py-20 bg-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
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
        </div>
      </div>
    </section>
  );
};

export default Stats;
