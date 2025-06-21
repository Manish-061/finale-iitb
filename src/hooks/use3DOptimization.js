import { useEffect, useState } from 'react';

export const use3DOptimization = () => {
  const [shouldRender3D, setShouldRender3D] = useState(true);

  useEffect(() => {
    // Check device capabilities
    const checkDeviceCapabilities = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isLowEndDevice = navigator.hardwareConcurrency < 4;
      const hasWebGL = (() => {
        try {
          const canvas = document.createElement('canvas');
          return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
        } catch (e) {
          return false;
        }
      })();

      // Only render 3D on capable devices
      setShouldRender3D(hasWebGL && !isLowEndDevice);
    };

    checkDeviceCapabilities();
  }, []);

  return shouldRender3D;
};
