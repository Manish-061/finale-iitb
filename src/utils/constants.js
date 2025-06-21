// Animation configurations
export const ANIMATION_VARIANTS = {
  // Page transition animations
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.4, ease: "easeIn" }
    }
  },

  // Stagger container animations
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  },

  // Item reveal animations
  staggerItem: {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },

  // Scale animations
  scaleIn: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  },

  // Slide animations
  slideInLeft: {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },

  slideInRight: {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }
};

// Company information
export const COMPANY_INFO = {
  name: 'INLIGHN TECH',
  email: 'info@inlighntech.com',
  phone: '+91 9368842663',
  address: {
    line1: 'Office No: VO-301, WeWork Prestige Central',
    line2: 'Ground Floor, 36, Infantry Rd',
    line3: 'Tasker Town, Shivaji Nagar',
    line4: 'Bengaluru, Karnataka 560001'
  },
  socialMedia: {
    facebook: '#',
    twitter: '#',
    linkedin: '#',
    instagram: '#'
  }
};
