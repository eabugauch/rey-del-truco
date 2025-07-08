// src/components/MobileNavHeader.jsx
import React from 'react';

const MobileNavHeader = ({ onBack, title, subtitle, className = '', temaActual }) => {
  return (
    <div className={`mobile-nav-header ${className}`}>
      <div className="flex items-center justify-between p-4 pt-6 pb-6 safe-top">
        {/* Back Button - Estándares iOS/Android */}
        <button
          onClick={onBack}
          className="native-back-button flex items-center gap-2 px-2 py-2 rounded-xl transition-all duration-200 organic-button touch-manipulation"
          aria-label="Volver a la pantalla anterior"
          type="button"
        >
          {/* Chevron SVG optimizado para ambas plataformas */}
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="back-chevron"
            aria-hidden="true"
          >
            <path 
              d="M15 18L9 12L15 6" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          
          {/* Texto responsive - visible solo en tablet+ */}
          <span className={`back-text text-sm ${temaActual === 'rey' ? 'rey-buttons' : 'handwritten-normal'}`} style={{
            textTransform: temaActual === 'rey' ? 'uppercase' : undefined
          }}>
            {temaActual === 'rey' ? 'VOLVER' : 'Volver'}
          </span>
        </button>

        {/* Title Section */}
        <div className="flex-1 text-center px-4">
          <h1 className={`text-2xl md:text-3xl ${temaActual === 'rey' ? 'rey-script' : 'handwritten-title'} ink-blue organic-text`} style={{
            color: temaActual === 'rey' ? '#D4A574' : undefined
          }}>
            {title}
          </h1>
          {subtitle && (
            <p className={`text-xs ${temaActual === 'rey' ? 'rey-buttons' : 'handwritten-normal'} ink-blue opacity-70 mt-1`} style={{
              color: temaActual === 'rey' ? '#F5DEB3' : undefined,
              textTransform: temaActual === 'rey' ? 'none' : undefined
            }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Spacer para mantener centrado el título */}
        <div className="w-16"></div>
      </div>
    </div>
  );
};

export default MobileNavHeader;