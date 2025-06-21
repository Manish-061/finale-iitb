import { useEffect, useState } from 'react';
import CustomCursor from './CustomCursor';

const CursorProvider = ({ children }) => {
  const [showCustomCursor, setShowCustomCursor] = useState(true);
  
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setShowCustomCursor(!mediaQuery.matches);
    };
    
    // Initial check
    handleChange();
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    
    // Apply cursor-none class to body when custom cursor is shown
    if (showCustomCursor) {
      document.body.classList.add('cursor-none');
    } else {
      document.body.classList.remove('cursor-none');
    }
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      document.body.classList.remove('cursor-none');
    };
  }, [showCustomCursor]);
  
  return (
    <>
      {children}
      {showCustomCursor && <CustomCursor />}
    </>
  );
};

export default CursorProvider;
