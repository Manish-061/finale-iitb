import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Animation variants for navbar
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };
  
  // Mobile menu animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-blue-600">
            INLIGHN TECH
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-gray-800 hover:text-blue-600 transition-colors">Home</a>
          <a href="/about" className="text-gray-800 hover:text-blue-600 transition-colors">About Us</a>
          <a href="/programs" className="text-gray-800 hover:text-blue-600 transition-colors">Programs</a>
          <a href="/verify" className="text-gray-800 hover:text-blue-600 transition-colors">Verify Certificate</a>
          <a href="/contact" className="text-gray-800 hover:text-blue-600 transition-colors">Contact Us</a>
          <a 
            href="/login" 
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            Login To Portal
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-white z-50 pt-20 px-4 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              <a 
                href="/" 
                className="text-xl text-gray-800 py-2 border-b border-gray-100"
                onClick={toggleMenu}
              >
                Home
              </a>
              <a 
                href="/about" 
                className="text-xl text-gray-800 py-2 border-b border-gray-100"
                onClick={toggleMenu}
              >
                About Us
              </a>
              <a 
                href="/programs" 
                className="text-xl text-gray-800 py-2 border-b border-gray-100"
                onClick={toggleMenu}
              >
                Programs
              </a>
              <a 
                href="/verify" 
                className="text-xl text-gray-800 py-2 border-b border-gray-100"
                onClick={toggleMenu}
              >
                Verify Certificate
              </a>
              <a 
                href="/contact" 
                className="text-xl text-gray-800 py-2 border-b border-gray-100"
                onClick={toggleMenu}
              >
                Contact Us
              </a>
              <a 
                href="/login" 
                className="bg-blue-600 text-white px-6 py-3 rounded-full text-xl"
                onClick={toggleMenu}
              >
                Login To Portal
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
