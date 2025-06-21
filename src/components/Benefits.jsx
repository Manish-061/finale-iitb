import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
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
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const benefitItems = [
    {
      title: "Career Support",
      description: "We go beyond training. Our career services include portfolio reviews, interview prep, and connections with industry professionals to help you land your dream job."
    },
    {
      title: "Tailored Programs",
      description: "Our courses in Full Stack Development, Data Science, and Project Management are crafted with a focus on hands-on, practical learning."
    },
    {
      title: "Expert Mentorship",
      description: "Learn from industry professionals who bring real-world experience and insights to your learning journey."
    },
    {
      title: "Industry Projects",
      description: "Work on real projects that solve actual business problems, building a portfolio that demonstrates your capabilities to future employers."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="benefits">
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
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900"
          >
            Why Choose Us?
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Our internship programs are designed to give you a competitive edge in the tech industry.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefitItems.map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
