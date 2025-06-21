import { createContext, useContext, useState, useEffect } from 'react';

const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Check for user's motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setAnimationsEnabled(false);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev);
  };
  
  const getAnimationProps = (baseProps) => {
    if (!animationsEnabled || reducedMotion) {
      return {};
    }
    return baseProps;
  };
  
  return (
    <AnimationContext.Provider value={{ 
      animationsEnabled, 
      toggleAnimations, 
      reducedMotion,
      getAnimationProps 
    }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
