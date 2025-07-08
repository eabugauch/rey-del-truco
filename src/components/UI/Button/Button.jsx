// src/components/UI/Button/Button.jsx
import React from 'react';
import styles from './Button.module.css';

/**
 * Button Component - Sistema de botones reutilizable para Rey del Truco
 * 
 * @param {Object} props - Propiedades del componente
 * @param {'primary'|'secondary'|'ghost'|'danger'} props.variant - Variante visual del botón
 * @param {'small'|'medium'|'large'} props.size - Tamaño del botón
 * @param {boolean} props.disabled - Si el botón está deshabilitado
 * @param {boolean} props.loading - Si el botón está en estado de carga
 * @param {boolean} props.fullWidth - Si el botón ocupa todo el ancho disponible
 * @param {'light'|'heavy'|'negative'|null} props.organic - Rotación orgánica para efecto handwritten
 * @param {boolean} props.pulse - Aplicar animación de pulso
 * @param {boolean} props.selected - Si el botón está seleccionado
 * @param {string} props.className - Clases CSS adicionales (especialmente Tailwind)
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {Function} props.onClick - Función a ejecutar al hacer click
 * @param {string} props.type - Tipo de botón HTML
 * @param {Object} props.style - Estilos inline adicionales
 */
const Button = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  organic = null,
  pulse = false,
  selected = false,
  className = '',
  children,
  onClick,
  type = 'button',
  style,
  ...rest
}) => {
  // Construir clases CSS
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    organic && styles[`organic${organic.charAt(0).toUpperCase() + organic.slice(1)}`],
    pulse && styles.pulse,
    selected && styles.selected,
    loading && styles.loading,
    className
  ].filter(Boolean).join(' ');

  // Handler para click que respeta el estado disabled y loading
  const handleClick = (event) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      style={style}
      {...rest}
    >
      {loading ? (
        <>
          <span className={styles.buttonContent}>
            {children}
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Variants disponibles para facilitar el uso
Button.variants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  GHOST: 'ghost',
  DANGER: 'danger'
};

// Sizes disponibles
Button.sizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
};

// Organic rotations disponibles
Button.organic = {
  LIGHT: 'light',
  HEAVY: 'heavy',
  NEGATIVE: 'negative'
};

export default Button;