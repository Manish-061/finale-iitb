import { useState, useEffect } from 'react';

const useSkeletonLoading = (duration = 3000, dependencies = []) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, dependencies);

  return isLoading;
};

export default useSkeletonLoading;
