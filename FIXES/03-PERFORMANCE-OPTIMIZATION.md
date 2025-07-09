# ⚡ PERFORMANCE OPTIMIZATION - OPTIMIZACIONES CRÍTICAS

## 📋 **OVERVIEW**
Optimizaciones de rendimiento para mantener 60fps en móviles y reducir memory usage. Cambios seguros que NO rompen funcionalidad existente.

---

## 🔥 **TASK #1: REACT PERFORMANCE OPTIMIZATION (CRÍTICO)**

### **Descripción**
Eliminar re-renders innecesarios y optimizar componentes críticos.

### **Ubicación**
- `src/components/ScoreDisplay.jsx`
- `src/components/AnotadorTruco.jsx`

### **Implementación**

#### **1. Optimizar ScoreDisplay**
```javascript
// src/components/ScoreDisplay.jsx
import React, { useCallback, useMemo } from 'react';

const ScoreDisplay = React.memo(({ puntos, puntosTotales }) => {
  
  // Memoizar cálculos pesados
  const scoreData = useMemo(() => {
    const mitadPuntos = Math.floor(puntosTotales / 2);
    const puntosBuenas = Math.min(puntos, mitadPuntos);
    const puntosMalas = Math.max(0, puntos - mitadPuntos);
    
    return {
      puntosBuenas,
      puntosMalas,
      cuadraditosBuenasCompletos: Math.floor(puntosBuenas / 5),
      puntosSueltosBuenas: puntosBuenas % 5,
      cuadraditosMalasCompletos: Math.floor(puntosMalas / 5),
      puntosSueltosMalas: puntosMalas % 5
    };
  }, [puntos, puntosTotales]);

  // Memoizar renderizado de cuadraditos
  const renderCuadradito = useCallback((puntosEnCuadradito, key) => {
    if (puntosEnCuadradito === 0) {
      return <div key={key} className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 xl:w-16 xl:h-16"></div>;
    }

    const esCompleto = puntosEnCuadradito === 5;
    const alArco = puntos === puntosTotales - 1;
    
    let colorLinea, strokeWidth;
    if (alArco) {
      colorLinea = "var(--current-ink-accent)";
      strokeWidth = "3.5";
    } else {
      colorLinea = "var(--current-ink-color)";
      strokeWidth = "3";
    }
    
    const containerClass = alArco 
      ? "w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 xl:w-16 xl:h-16 animate-pulse drop-shadow-lg" 
      : "w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 xl:w-16 xl:h-16";
    
    return (
      <div key={key} className={containerClass}>
        <svg width="44" height="44" viewBox="0 0 64 64" className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 xl:w-16 xl:h-16">
          <defs>
            <filter id="roughPaper">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" result="noise" seed="1" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            </filter>
          </defs>
          {puntosEnCuadradito >= 1 && (
            <path d="M7,9 Q6,14 7,19 T6,28 Q7,33 6,38 T7,47 Q6,52 7,54" 
                  stroke={colorLinea} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" 
                  opacity="0.95" filter="url(#roughPaper)" />
          )}
          {/* ... resto de paths ... */}
        </svg>
      </div>
    );
  }, [puntos, puntosTotales]);

  // Memoizar secciones completas
  const renderSeccion = useCallback((cuadradosCompletos, puntosSueltos, maxCuadrados) => {
    const elementos = [];
    
    for (let i = 0; i < maxCuadrados; i++) {
      if (i < cuadradosCompletos) {
        elementos.push(renderCuadradito(5, `completo-${i}`));
      } else if (i === cuadradosCompletos && puntosSueltos > 0) {
        elementos.push(renderCuadradito(puntosSueltos, `parcial-${i}`));
      } else {
        elementos.push(<div key={`vacio-${i}`} className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 xl:w-16 xl:h-16"></div>);
      }
    }
    
    return elementos;
  }, [renderCuadradito]);

  return (
    <div className="relative flex flex-col items-center h-full responsive-padding">
      {/* Resto del componente usando scoreData memoizado */}
    </div>
  );
});

export default ScoreDisplay;
```

#### **2. Optimizar Event Handlers**
```javascript
// src/components/AnotadorTruco.jsx
import React, { useCallback, useState } from 'react';

const AnotadorTruco = () => {
  const [procesandoPunto, setProcesandoPunto] = useState(false);
  
  // Memoizar event handlers
  const handleSumarPunto = useCallback((equipo) => {
    if (!ganador && !procesandoPunto) {
      setProcesandoPunto(true);
      sumarPunto(equipo);
      setTimeout(() => setProcesandoPunto(false), 100);
    }
  }, [ganador, procesandoPunto, sumarPunto]);

  const handleRestarPunto = useCallback((equipo) => {
    if (!ganador && !procesandoPunto) {
      setProcesandoPunto(true);
      restarPunto(equipo);
      setTimeout(() => setProcesandoPunto(false), 100);
    }
  }, [ganador, procesandoPunto, restarPunto]);

  const handlePointerDown = useCallback((e, equipo) => {
    e.preventDefault();
    e.stopPropagation();
    handleSumarPunto(equipo);
  }, [handleSumarPunto]);

  // Resto del componente...
};
```

### **Testing**
- [ ] Verificar que no hay re-renders innecesarios
- [ ] Confirmar que funcionalidad se mantiene
- [ ] Medir performance con React DevTools

---

## 🔥 **TASK #2: ASSET OPTIMIZATION (CRÍTICO)**

### **Descripción**
Optimizar imágenes pesadas que afectan tiempo de carga.

### **Assets Problemáticos**
- `corona.png`: 1.7MB → Target: <200KB
- `tronoArg.png`: 2.5MB → Target: <400KB

### **Implementación**

#### **1. Optimizar Imágenes**
```bash
# Herramientas recomendadas:
# - TinyPNG: https://tinypng.com/
# - Squoosh: https://squoosh.app/
# - ImageOptim (Mac)

# Proceso:
1. Abrir original en Squoosh
2. Convertir a WebP si es posible
3. Ajustar calidad hasta tamaño objetivo
4. Mantener respaldo PNG para compatibilidad
```

#### **2. Lazy Loading (Opcional)**
```javascript
// src/components/PantallaInicio.jsx
import React, { Suspense, lazy } from 'react';

const LazyTronoImage = lazy(() => import('./LazyTronoImage'));

// Componente wrapper
const LazyTronoImage = () => (
  <img 
    src={require('../styles/assets/images/tronoArg.png')} 
    alt="Trono Argentino" 
    className="rey-premium-trono"
    loading="lazy"
  />
);

// Uso con Suspense
<Suspense fallback={<div className="rey-premium-trono bg-gray-800 animate-pulse"></div>}>
  <LazyTronoImage />
</Suspense>
```

#### **3. Preload Crítico**
```html
<!-- public/index.html - Agregar en head -->
<link rel="preload" href="%PUBLIC_URL%/corona-optimized.png" as="image" type="image/png">
```

### **Testing**
- [ ] Imágenes optimizadas funcionan igual
- [ ] Tiempo de carga mejorado
- [ ] Calidad visual mantenida

---

## 🔥 **TASK #3: MEMORY LEAK FIXES (CRÍTICO)**

### **Descripción**
Corregir memory leaks en event listeners y cleanup.

### **Ubicación**
- `src/hooks/useSwipeBack.js`
- `src/hooks/useGamePersistence.js`

### **Implementación**

#### **1. Fix useSwipeBack Dependencies**
```javascript
// src/hooks/useSwipeBack.js
import { useEffect, useCallback } from 'react';

const useSwipeBack = (onSwipeBack, enabled = true) => {
  // Memoizar handlers para evitar re-creación
  const handleTouchStart = useCallback((e) => {
    // Lógica existente
  }, []);

  const handleTouchMove = useCallback((e) => {
    // Lógica existente
  }, []);

  const handleTouchEnd = useCallback((e) => {
    // Lógica existente
  }, [onSwipeBack]); // Dependency correcta

  useEffect(() => {
    if (!enabled || !onSwipeBack) return;

    // Event listeners con passive correcto
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Cleanup mejorado
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, enabled, onSwipeBack]);
};

export default useSwipeBack;
```

#### **2. Debounce localStorage**
```javascript
// src/hooks/useGamePersistence.js
import { useEffect, useCallback, useRef } from 'react';

const useGamePersistence = (gameState) => {
  const timeoutRef = useRef(null);

  // Debounced save
  const debouncedSave = useCallback((data) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }, 500);
  }, []);

  useEffect(() => {
    const partidaData = {
      // ... existing data
    };

    if (gameState.puntosNos > 0 || gameState.puntosEllos > 0 || gameState.historial.length > 0) {
      debouncedSave(partidaData);
    }

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [gameState, debouncedSave]);

  // ... resto del hook
};
```

### **Testing**
- [ ] No hay memory leaks después de uso prolongado
- [ ] Event listeners se limpian correctamente
- [ ] Performance estable en sesiones largas

---

## 🔥 **TASK #4: CSS ANIMATION OPTIMIZATION (ALTO)**

### **Descripción**
Optimizar animaciones CSS para mejor performance en móviles.

### **Ubicación**
- `src/styles/globals.css`

### **Implementación**

#### **1. Optimizar Animaciones Críticas**
```css
/* src/styles/globals.css - Reemplazar animaciones costosas */

/* ANTES: Animación costosa */
.rey-premium-trono {
  animation: throne-glow 6s ease-in-out infinite;
}

@keyframes throne-glow {
  0%, 100% { 
    filter: 
      drop-shadow(0 15px 50px rgba(0, 0, 0, 0.7))
      drop-shadow(0 5px 20px rgba(212, 165, 116, 0.1));
  }
  50% { 
    filter: 
      drop-shadow(0 15px 50px rgba(0, 0, 0, 0.7))
      drop-shadow(0 5px 20px rgba(212, 165, 116, 0.2))
      drop-shadow(0 0 40px rgba(212, 165, 116, 0.05));
  }
}

/* DESPUÉS: Animación optimizada */
.rey-premium-trono {
  filter: 
    drop-shadow(0 15px 50px rgba(0, 0, 0, 0.7))
    drop-shadow(0 5px 20px rgba(212, 165, 116, 0.1));
  animation: throne-glow-optimized 6s ease-in-out infinite;
  will-change: opacity;
}

@keyframes throne-glow-optimized {
  0%, 100% { 
    opacity: 0.98;
  }
  50% { 
    opacity: 1;
  }
}
```

#### **2. Añadir will-change a Elementos Animados**
```css
/* Elementos que se animan frecuentemente */
.rey-premium-score-display.rey-premium-score-winner {
  will-change: transform, opacity;
}

.animate-pulse {
  will-change: opacity;
}

.rey-premium-corona {
  will-change: transform;
}

/* Remove will-change después de animación */
.animation-complete {
  will-change: auto;
}
```

#### **3. Optimizar SVG Filters**
```css
/* Reducir complejidad de filtros SVG */
#roughPaper {
  /* ANTES: Muy complejo */
  /* feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" */
  
  /* DESPUÉS: Simplificado */
  feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" seed="1";
  feDisplacementMap in="SourceGraphic" in2="noise" scale="0.2";
}
```

### **Testing**
- [ ] Animaciones mantienen 60fps en móvil
- [ ] Calidad visual aceptable
- [ ] Menor uso de CPU/GPU

---

## 🔧 **IMPLEMENTACIÓN SEGURA**

### **Orden de Implementación**
1. **React Performance** - Más impacto, menos riesgo
2. **Memory Leaks** - Fixes específicos
3. **Asset Optimization** - Solo mejora carga
4. **CSS Animation** - Último, más visual

### **Precauciones**
- Hacer commit después de cada optimización
- Medir performance antes/después
- Mantener funcionalidad intacta
- Probar en dispositivo real

### **Rollback Plan**
- Cada optimización es independiente
- Fácil revertir cambios específicos
- Mantener versiones originales como backup

---

## ✅ **CRITERIOS DE ÉXITO**

### **React Performance**
- [x] Menos re-renders (medible con DevTools)
- [x] Funcionalidad mantenida
- [x] Tiempo de respuesta mejorado

### **Asset Optimization**
- [x] Imágenes < 50% tamaño original
- [x] Tiempo de carga mejorado
- [x] Calidad visual mantenida

### **Memory Leaks**
- [x] Uso estable de memoria
- [x] Event listeners limpios
- [x] Sin degradación en sesiones largas

### **CSS Animations**
- [x] 60fps en móviles medios
- [x] Calidad visual aceptable
- [x] Menor uso de CPU

---

## 🎯 **SIGUIENTE PASO**
Una vez completadas estas optimizaciones, proceder con **04-UX-IMPROVEMENTS.md**

*Estimado: 8-10 horas de trabajo*  
*Prioridad: ALTA*  
*Riesgo: MEDIO-BAJO (cambios más complejos)*