import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Mirunalini R",
    role: "Data Analyst Intern",
    image: "/assets/images/avatar1.jpg", // Replace with actual image paths
    text: "During my Data Analytics internship at INLIGHN TECH, I learned SQL, Power BI, Tableau, and Data Cleaning. The program focused on real-world business intelligence projects, which helped me understand data-driven decision-making. The mentorship and structured learning approach made a significant impact on my skills."
  },
  {
    id: 2,
    name: "Surendra Kumar",
    role: "Data Science Intern (India)",
    image: "/assets/images/avatar2.jpg",
    text: "I completed my Data Science internship at INLIGHN TECH, where I gained hands-on experience in Machine Learning, Data Visualization, and AI Models. Working on real-world datasets helped me apply my knowledge in a practical way. The structured guidance and expert mentorship improved my problem-solving and analytical skills. Thanks to this experience."
  },
  {
    id: 3,
    name: "Vignesh",
    role: "Business Analyst Intern",
    image: "/assets/images/avatar3.jpg",
    text: "I interned in Business Analysis at INLIGHN TECH, where I gained hands-on experience in Market Research, Business Intelligence, and Financial Analysis. The training and projects provided deep insights into business strategies, and I developed strong analytical and problem-solving skills. The experience was incredibly valuable for my career."
  },
  {
    id: 4,
    name: "Hariharan Rajendaran",
    role: "Full-Stack Developer Intern",
    image: "/assets/images/avatar4.jpg",
    text: "At INLIGHN TECH, I completed my Full-Stack Development internship, where I worked on React, Node.js, MongoDB, and API development. I built web applications from scratch, which helped me understand both frontend and backend development. The real-world exposure and expert guidance made me industry-ready."
  },
  {
    id: 5,
    name: "Sumit Vishwas",
    role: "Python Developer Intern",
    image: "/assets/images/avatar5.jpg",
    text: "My Python Development internship at INLIGHN TECH gave me hands-on experience with Django, Flask, Web Scraping, and Automation. I worked on projects that enhanced my programming skills and helped me understand backend development better. The structured learning path made a big difference in my confidence and abilities."
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const testimonialsRef = useRef(null);
  
  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    })
  };

  return (
    <section className="py-16 md:py-24 bg-blue-50" id="testimonials">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            What Our Interns Say
          </h2>
          
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Hear from our alumni about their experience with our internship programs.
          </p>
          
          <div className="relative overflow-hidden" ref={testimonialsRef}>
            {/* Testimonial Carousel */}
            <div className="flex justify-center">
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="bg-white rounded-xl p-8 shadow-lg w-full max-w-3xl"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-blue-100">
                      {/* Placeholder image - replace with actual images */}
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-blue-600">
                        {testimonials[currentIndex].name.charAt(0)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-gray-700 mb-4 italic">
                        "{testimonials[currentIndex].text}"
                      </p>
                      <div className="font-semibold text-gray-900">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-blue-600">
                        {testimonials[currentIndex].role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-center mt-8 gap-4">
              <button 
                onClick={goToPrevious}
                className="bg-white p-3 rounded-full shadow-md hover:bg-blue-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} className="text-blue-600" />
              </button>
              
              <button 
                onClick={goToNext}
                className="bg-white p-3 rounded-full shadow-md hover:bg-blue-50 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} className="text-blue-600" />
              </button>
            </div>
            
            {/* Indicator Dots */}
            <div className="flex justify-center mt-4 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
