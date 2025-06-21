import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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

  return (
    <section className="py-16 md:py-24 bg-white" id="about">
      <div className="container mx-auto px-4 md:px-6">
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
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">About INLIGHN TECH</h3>
              <p className="text-gray-700">
                At INLIGHN TECH, we believe that the future of education lies in bridging the gap between academic learning and industry needs. 
                Founded with a passion for providing meaningful and immersive learning experiences, we offer internship programs that equip 
                students and young professionals with practical skills in Full Stack Development, Data Science, and Project Management.
              </p>
            </motion.div>
            
            {/* Mission Section */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-700">
                To empower students and young professionals by providing immersive, real-world learning experiences through tailored 
                internship programs. We aim to equip our participants with the practical skills and confidence they need to succeed 
                in the fast-evolving tech industry.
              </p>
            </motion.div>
            
            {/* Vision Section */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-700">
                To empower students and young professionals by providing immersive, real-world learning experiences through tailored 
                internship programs. We aim to equip our participants with the practical skills and confidence they need to succeed 
                in the fast-evolving tech industry.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
