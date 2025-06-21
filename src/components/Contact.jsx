import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: '',
    location: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ 
        isSubmitting: false, 
        isSubmitted: true, 
        error: null 
      });
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        domain: '',
        location: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, isSubmitted: false }));
      }, 5000);
    }, 1500);
  };
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const inputVariants = {
    focus: { 
      scale: 1.01,
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)", 
      transition: { duration: 0.2 } 
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white" id="contact">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                GET IN TOUCH
              </h2>
              
              <h3 className="text-xl font-bold mb-6 text-blue-600">
                Fill the form to contact us
              </h3>
              
              <p className="text-gray-700 mb-8">
                At INLIGHN TECH, we believe that the future of education lies in bridging the gap between academic learning and industry needs.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 text-white p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Corporate Office</div>
                    <div className="text-gray-700">
                      Office No: VO-301, WeWork Prestige Central, Ground Floor, 36, Infantry Rd, Tasker Town, Shivaji Nagar, Bengaluru, Karnataka 560001
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 text-white p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <div className="text-gray-700">+91 9368842663</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-gray-700">info@inlighntech.com</div>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              {formStatus.isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-xl font-bold mb-2">Message Sent Successfully!</h4>
                  <p>Thank you for contacting us. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-blue-50 p-6 rounded-lg">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Full Name *
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none"
                      whileFocus="focus"
                      variants={inputVariants}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address *
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none"
                      whileFocus="focus"
                      variants={inputVariants}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="domain" className="block text-gray-700 font-medium mb-2">
                        Internship Domain *
                      </label>
                      <motion.select
                        id="domain"
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none"
                        whileFocus="focus"
                        variants={inputVariants}
                      >
                        <option value="">Select Domain</option>
                        <option value="Full Stack Development">Full Stack Development</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Data Analysis">Data Analysis</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Project Management">Project Management</option>
                      </motion.select>
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                        Location *
                      </label>
                      <motion.input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none"
                        whileFocus="focus"
                        variants={inputVariants}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Message
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none"
                      whileFocus="focus"
                      variants={inputVariants}
                    ></motion.textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={formStatus.isSubmitting}
                    className={`w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all ${
                      formStatus.isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                    whileHover={!formStatus.isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!formStatus.isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {formStatus.isSubmitting ? 'Sending...' : 'Contact Us'}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
