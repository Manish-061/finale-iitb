import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const rafIdRef = useRef(null);
  const lastPointer = useRef({ x: 0, y: 0 });
  
  // State to track different cursor states
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring configuration for smooth animation
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  
  // Check if device supports touch
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    
    return () => {
      window.removeEventListener('resize', checkTouchDevice);
    };
  }, []);
  
  // Update cursor position and handle interactions
  useEffect(() => {
    // Pointer movement without triggering React re-renders
    const onPointerMove = (e) => {
      lastPointer.current.x = e.clientX;
      lastPointer.current.y = e.clientY;
      if (rafIdRef.current == null) {
        rafIdRef.current = requestAnimationFrame(() => {
          cursorX.set(lastPointer.current.x);
          cursorY.set(lastPointer.current.y);
          rafIdRef.current = null;
        });
      }
    };
    
    // Handle click states
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add hover listeners to interactive elements
    const updateHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .cursor-hover'
      );
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };
    
    // Initial setup
    updateHoverListeners();
    
    // Update listeners when DOM changes (for dynamic content)
    const observer = new MutationObserver(updateHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);
  
  // Hide cursor for touch devices
  if (isTouchDevice) {
    return null;
  }
  
  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: 0,
          top: 0,
          x: smoothX,
          y: smoothY,
          willChange: 'transform',
        }}
      >
        <motion.div
          className="w-8 h-8 border-2 border-white rounded-full"
          style={{
            translateX: '-50%',
            translateY: '-50%',
            willChange: 'transform',
          }}
          animate={{
            scale: isClicking ? 0.5 : isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 0.6,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 15,
            mass: 0.1,
          }}
        />
      </motion.div>
      
      {/* Inner Dot */}
      <motion.div
        className="fixed pointer-events-none z-[51] mix-blend-difference"
        style={{
          left: 0,
          top: 0,
          x: smoothX,
          y: smoothY,
          willChange: 'transform',
        }}
      >
        <motion.div
          className="w-2 h-2 bg-white rounded-full"
          style={{
            translateX: '-50%',
            translateY: '-50%',
            willChange: 'transform',
          }}
          animate={{
            scale: isClicking ? 1.5 : isHovering ? 0.5 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 20,
            mass: 0.1,
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
