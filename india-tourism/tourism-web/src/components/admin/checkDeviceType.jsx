import { useState, useEffect } from 'react';

export const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device has a coarse pointer (touch screen)
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    
    // Set initial state
    setIsMobile(mediaQuery.matches);

    // Listen for changes
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isMobile ? 'mobile' : 'laptop/desktop';
};
