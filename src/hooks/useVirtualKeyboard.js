// src/hooks/useVirtualKeyboard.js
import { useState, useEffect } from 'react';

export const useVirtualKeyboard = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDifference = viewportHeight - currentHeight;
      
      // Para Chrome móvil, usar threshold más bajo
      const keyboardThreshold = 100;
      const keyboardVisible = heightDifference > keyboardThreshold;
      
      setIsKeyboardVisible(keyboardVisible);
    };

    // Guardar altura inicial
    const initialHeight = window.innerHeight;
    setViewportHeight(initialHeight);

    // Solo usar resize listener básico para Chrome móvil
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [viewportHeight]);

  return {
    isKeyboardVisible
  };
};