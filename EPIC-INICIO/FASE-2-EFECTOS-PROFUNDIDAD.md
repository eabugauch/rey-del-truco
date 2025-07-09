# 🎭 FASE 2: EFECTOS DE PROFUNDIDAD - REY DEL TRUCO

## 🎯 **OBJETIVO**
Agregar profundidad visual y perspectiva 3D a la pantalla de inicio, creando capas visuales que den sensación de majestuosidad y dimensión real.

## 🎨 **ELEMENTOS A IMPLEMENTAR**

### 1. **PERSPECTIVA 3D EN LAYOUT**
```css
/* Perspectiva principal del contenedor */
.rey-premium-layout-3d {
  perspective: 1200px;
  perspective-origin: center center;
  transform-style: preserve-3d;
}

.rey-premium-container-3d {
  transform-style: preserve-3d;
  position: relative;
  z-index: 10;
}
```

### 2. **CORONA CON ROTACIÓN 3D**
```css
/* Corona flotante con rotación sutil */
@keyframes floatRotate3D {
  0% { 
    transform: rotateY(0deg) rotateX(5deg) translateY(0px);
  }
  25% { 
    transform: rotateY(90deg) rotateX(3deg) translateY(-10px);
  }
  50% { 
    transform: rotateY(180deg) rotateX(5deg) translateY(0px);
  }
  75% { 
    transform: rotateY(270deg) rotateX(3deg) translateY(-10px);
  }
  100% { 
    transform: rotateY(360deg) rotateX(5deg) translateY(0px);
  }
}

.corona-3d {
  transform-style: preserve-3d;
  animation: floatRotate3D 12s ease-in-out infinite;
  filter: drop-shadow(0 20px 40px rgba(212, 175, 55, 0.3));
}
```

### 3. **TRONO CON PERSPECTIVA**
```css
/* Trono con perspectiva y sombras dinámicas */
@keyframes throne3DFloat {
  0%, 100% { 
    transform: rotateX(5deg) rotateY(-2deg) translateZ(0px);
  }
  50% { 
    transform: rotateX(3deg) rotateY(2deg) translateZ(20px);
  }
}

.trono-perspective {
  transform-style: preserve-3d;
  animation: throne3DFloat 8s ease-in-out infinite;
  filter: 
    drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5))
    drop-shadow(0 10px 30px rgba(212, 175, 55, 0.2));
}
```

### 4. **SOMBRAS DINÁMICAS CURSOR**
```css
/* Sombras que responden al cursor */
.dynamic-shadow {
  position: relative;
  transition: all 0.3s ease;
}

.dynamic-shadow::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(212, 175, 55, 0.1) 0%,
    transparent 70%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.dynamic-shadow:hover::after {
  opacity: 1;
}
```

### 5. **CAPAS DE PROFUNDIDAD**
```css
/* Múltiples capas con diferentes profundidades */
.depth-layer-1 {
  transform: translateZ(100px);
  z-index: 10;
}

.depth-layer-2 {
  transform: translateZ(50px);
  z-index: 8;
}

.depth-layer-3 {
  transform: translateZ(0px);
  z-index: 6;
}

.depth-layer-background {
  transform: translateZ(-50px);
  z-index: 4;
  filter: blur(1px);
  opacity: 0.8;
}
```

### 6. **REFLEJOS METÁLICOS**
```css
/* Efectos de metal y brillo */
@keyframes metallicShine {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.metallic-effect {
  position: relative;
  background: linear-gradient(
    45deg,
    #B8860B 0%,
    #D4AF37 25%,
    #FFD700 50%,
    #D4AF37 75%,
    #B8860B 100%
  );
  background-size: 400% 100%;
  animation: metallicShine 3s ease-in-out infinite;
}

.metallic-effect::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    transparent 40%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 60%
  );
  animation: metallicShine 2s ease-in-out infinite reverse;
}
```

## 🎨 **BLUR SELECTIVO Y DEPTH OF FIELD**

### **Efecto Bokeh**
```css
/* Blur progresivo por distancia */
.bokeh-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 30% 40%, 
    rgba(212, 175, 55, 0.1) 0%,
    transparent 40%
  ),
  radial-gradient(
    circle at 70% 60%, 
    rgba(255, 215, 0, 0.05) 0%,
    transparent 30%
  );
  filter: blur(8px);
  z-index: 1;
}

.focus-sharp {
  filter: blur(0px);
  z-index: 10;
}

.focus-medium {
  filter: blur(1px);
  z-index: 8;
}

.focus-soft {
  filter: blur(3px);
  z-index: 6;
}
```

## 🎯 **ARCHIVOS A MODIFICAR**

### **1. globals.css**
```css
/* Agregar todas las animaciones y efectos 3D */

/* Variables CSS para efectos dinámicos */
:root {
  --mouse-x: 50%;
  --mouse-y: 50%;
  --depth-factor: 1;
}

/* Contenedor principal 3D */
.rey-premium-layout {
  perspective: 1200px;
  perspective-origin: center center;
  transform-style: preserve-3d;
}

/* Efectos de profundidad responsivos */
@media (max-width: 768px) {
  .rey-premium-layout {
    perspective: 800px;
  }
  
  .corona-3d,
  .trono-perspective {
    animation-duration: 15s; /* Más lento en móvil */
  }
}

@media (prefers-reduced-motion: reduce) {
  .corona-3d,
  .trono-perspective {
    animation: none;
    transform: rotateX(3deg) rotateY(-1deg);
  }
}
```

### **2. PantallaInicio.jsx**
```jsx
// Agregar tracking del mouse para efectos dinámicos
const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

useEffect(() => {
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setMousePosition({ x, y });
    
    // Actualizar CSS custom properties
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
  };

  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);

// Estructura con capas de profundidad
<div className="rey-premium-layout rey-premium-layout-3d">
  <div className="bokeh-background depth-layer-background"></div>
  
  <div className="rey-premium-container rey-premium-container-3d">
    <div className="depth-layer-1">
      <img 
        src={require('../styles/assets/images/corona.png')} 
        alt="Corona Rey del Truco" 
        className="rey-premium-corona corona-3d dynamic-shadow metallic-effect focus-sharp"
      />
    </div>
    
    <div className="depth-layer-2">
      <h1 className="rey-premium-title focus-sharp">
        REY DEL TRUCO
      </h1>
    </div>
    
    <div className="depth-layer-3">
      <img 
        src={require('../styles/assets/images/tronoArg.png')} 
        alt="Trono Argentino" 
        className="rey-premium-trono trono-perspective dynamic-shadow focus-medium"
      />
    </div>
    
    <div className="depth-layer-1">
      <div className="rey-premium-buttons focus-sharp">
        {/* Botones */}
      </div>
    </div>
  </div>
</div>
```

## ⚡ **PERFORMANCE OPTIMIZATIONS**

### **GPU Acceleration**
```css
/* Forzar aceleración por GPU */
.gpu-accelerated {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Limitar repaints */
.contain-layout {
  contain: layout style paint;
}
```

### **Responsive 3D**
```css
/* Reducir efectos 3D en dispositivos móviles */
@media (max-width: 768px) {
  .rey-premium-layout-3d {
    perspective: 600px;
  }
  
  .corona-3d,
  .trono-perspective {
    animation-duration: 20s;
  }
}

/* Eliminar efectos en dispositivos de baja potencia */
@media (prefers-reduced-motion: reduce) {
  .corona-3d,
  .trono-perspective {
    animation: none;
    transform: none;
  }
}
```

## 🎪 **TESTING CHECKLIST**

- [ ] Perspectiva 3D funciona correctamente
- [ ] Corona rota suavemente en 3D
- [ ] Trono tiene perspectiva realista
- [ ] Sombras responden al cursor
- [ ] Capas de profundidad se ven bien
- [ ] Reflejos metálicos son sutiles
- [ ] Performance mantiene 60fps
- [ ] Funciona en dispositivos móviles
- [ ] Respeta preferencias de movimiento

## 🚀 **PRÓXIMOS PASOS**

Después de implementar la Fase 2:
- **FASE 3**: Interactividad Premium
- **FASE 4**: Elementos Ornamentales

---

**🎭 RESULTADO ESPERADO**: Una pantalla de inicio con profundidad visual real, donde cada elemento tiene su lugar en un espacio 3D cohesivo y majestuoso, creando una experiencia inmersiva digna de un Rey.