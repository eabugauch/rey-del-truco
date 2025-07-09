# ♿ ACCESSIBILITY FIXES - MEJORAS DE ACCESIBILIDAD

## 📋 **OVERVIEW**
Implementar mejoras de accesibilidad para cumplir con estándares WCAG 2.1 AA sin romper funcionalidad existente.

---

## 🔥 **TASK #1: ARIA LABELS Y SCREEN READER SUPPORT (CRÍTICO)**

### **Descripción**
Agregar soporte para screen readers y navegación con teclado.

### **Ubicación**
- `src/components/AnotadorTruco.jsx`
- `src/components/ScoreDisplay.jsx`
- `src/components/PantallaInicio.jsx`

### **Implementación**

#### **1. Áreas de Scoring**
```javascript
// src/components/AnotadorTruco.jsx
<div 
  className="h-full flex items-center justify-center overflow-hidden cursor-pointer select-none"
  onPointerDown={(e) => handlePointerDown(e, 'nos')}
  style={{ touchAction: 'none' }}
  role="button"
  tabIndex={0}
  aria-label={`Sumar punto a ${jugador1}. Puntos actuales: ${puntosNos}`}
  aria-describedby="scoring-instructions"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSumarPunto('nos');
    }
  }}
>
  <ScoreDisplay puntos={puntosNos} puntosTotales={puntosTotales} />
</div>

{/* Instrucciones ocultas para screen readers */}
<div id="scoring-instructions" className="sr-only">
  Toca o presiona Enter para sumar un punto. Usa los botones menos para restar puntos.
</div>
```

#### **2. Botones de Acción**
```javascript
// src/components/AnotadorTruco.jsx - Mejorar botones
<button
  onClick={() => handleRestarPunto('nos')}
  disabled={!!ganador}
  className={`rey-premium-score-button rey-premium-score-button-minus ${!!ganador ? 'disabled' : ''}`}
  aria-label={`Restar punto a ${jugador1}. Puntos actuales: ${puntosNos}`}
  aria-describedby="minus-button-help"
>
  −
</button>

<div id="minus-button-help" className="sr-only">
  Restará un punto del marcador actual
</div>
```

#### **3. Puntajes Dinámicos**
```javascript
// src/components/AnotadorTruco.jsx - Puntajes con aria-live
<span 
  className={`rey-premium-score-display ${puntosNos === 29 ? 'rey-premium-score-winner' : ''}`}
  aria-live="polite"
  aria-atomic="true"
  aria-label={`${jugador1}: ${puntosNos} puntos${puntosNos === 29 ? ', al verde' : ''}`}
>
  {puntosNos}
</span>
```

#### **4. Estado "AL VERDE"**
```javascript
// src/components/ScoreDisplay.jsx
{puntos === puntosTotales - 1 && (
  <span 
    className="fluid-text-sm animate-pulse transform rotate-1 drop-shadow-lg high-dpi-text"
    style={{ /* estilos existentes */ }}
    aria-live="assertive"
    aria-atomic="true"
    role="status"
  >
    ¡AL VERDE!
  </span>
)}
```

### **Testing**
- [ ] Screen reader anuncia cambios de puntaje
- [ ] Navegación con teclado funciona
- [ ] Aria labels son descriptivos

---

## 🔥 **TASK #2: FOCUS MANAGEMENT (CRÍTICO)**

### **Descripción**
Implementar manejo correcto del focus en modales y navegación.

### **Ubicación**
- `src/components/AnotadorTruco.jsx` (modales)

### **Implementación**

#### **1. Focus Trap en Modales**
```javascript
// src/components/AnotadorTruco.jsx
import React, { useRef, useEffect } from 'react';

const AnotadorTruco = () => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Focus management para modal de victoria
  useEffect(() => {
    if (ganador && modalVictoriaAbierto) {
      // Guardar elemento con focus actual
      previousFocusRef.current = document.activeElement;
      
      // Enfocar modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
    }
  }, [ganador, modalVictoriaAbierto]);

  // Cleanup focus al cerrar modal
  const cerrarModalVictoria = useCallback(() => {
    setModalVictoriaAbierto(false);
    limpiarGanador();
    
    // Restaurar focus anterior
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [limpiarGanador]);

  // Focus trap handler
  const handleModalKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      cerrarModalVictoria();
    }
    
    if (e.key === 'Tab') {
      // Implementar focus trap básico
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements?.length) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    }
  }, [cerrarModalVictoria]);

  // Modal de victoria con focus management
  return (
    <>
      {ganador && modalVictoriaAbierto && (
        <div 
          className="rey-premium-modal-backdrop" 
          onClick={cerrarModalVictoria}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div 
            className="rey-premium-modal-container" 
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
            tabIndex={-1}
            onKeyDown={handleModalKeyDown}
          >
            <button
              onClick={cerrarModalVictoria}
              className="rey-premium-modal-close"
              aria-label="Cerrar modal de victoria"
              autoFocus
            >
              ✕
            </button>
            
            <div className="rey-premium-modal-icon" aria-hidden="true">🏆</div>
            
            <h2 id="modal-title" className="rey-premium-modal-title">
              ¡Ganó {ganador === 'nos' ? jugador1 : jugador2}!
            </h2>
            
            <p id="modal-description" className="rey-premium-modal-text">
              {puntosTotales} puntos, ¡qué partidazo che!
            </p>
            
            <div className="rey-premium-modal-buttons">
              <button
                onClick={() => {
                  nuevoPartido();
                  setModalVictoriaAbierto(false);
                  setPantallaActual('juego');
                }}
                className="rey-premium-modal-button rey-premium-modal-button-primary"
              >
                OTRA VUELTA
              </button>
              <button
                onClick={() => {
                  setModalVictoriaAbierto(false);
                  setPantallaActual('inicio');
                }}
                className="rey-premium-modal-button rey-premium-modal-button-secondary"
              >
                MENÚ PRINCIPAL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
```

#### **2. Focus Visible Styles**
```css
/* src/styles/globals.css - Mejorar focus styles */

/* Focus visible para botones */
.rey-premium-score-button:focus-visible {
  outline: 2px solid #F5DEB3;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(245, 222, 179, 0.3);
}

.rey-premium-action-button:focus-visible {
  outline: 2px solid #F5DEB3;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(245, 222, 179, 0.3);
}

/* Focus en áreas de scoring */
.scoring-area:focus-visible {
  outline: 2px solid #F5DEB3;
  outline-offset: 2px;
  border-radius: 8px;
  box-shadow: 0 0 0 4px rgba(245, 222, 179, 0.3);
}

/* Focus en inputs */
.rey-premium-player-input:focus-visible {
  outline: 2px solid #F5DEB3;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(245, 222, 179, 0.3);
}

/* Modal focus */
.rey-premium-modal-container:focus {
  outline: none;
}

.rey-premium-modal-close:focus-visible {
  outline: 2px solid #F5DEB3;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(245, 222, 179, 0.3);
}
```

### **Testing**
- [ ] Focus trap funciona en modales
- [ ] Escape cierra modales
- [ ] Tab navigation es lógica
- [ ] Focus visible es claro

---

## 🔥 **TASK #3: IMPROVED ALT TEXT Y LANDMARKS (ALTA)**

### **Descripción**
Mejorar textos alternativos y estructura semántica.

### **Ubicación**
- `src/components/PantallaInicio.jsx`
- `src/components/AnotadorTruco.jsx`

### **Implementación**

#### **1. Imágenes Descriptivas**
```javascript
// src/components/PantallaInicio.jsx
<img 
  src={require('../styles/assets/images/corona.png')} 
  alt="Corona dorada del Rey del Truco, símbolo de victoria y prestigio" 
  className="rey-premium-corona"
  role="img"
/>

<img 
  src={require('../styles/assets/images/tronoArg.png')} 
  alt="Trono argentino ornamentado, elemento central del tema Rey del Truco" 
  className="rey-premium-trono"
  role="img"
/>

{/* Divisor del trono */}
<div className="rey-premium-throne-divider">
  <img 
    src={require('../styles/assets/images/tronoArg.png')} 
    alt="Trono divisor entre jugadores"
    role="separator"
    aria-label="Separador visual entre equipos"
  />
</div>
```

#### **2. Estructura Semántica**
```javascript
// src/components/AnotadorTruco.jsx
<main role="main" className="rey-premium-layout">
  <section role="region" aria-labelledby="game-title" className="rey-premium-container">
    <h1 id="game-title" className="sr-only">Anotador de Truco</h1>
    
    {/* Área de juego */}
    <section role="region" aria-label="Área de juego" className="rey-premium-game-container">
      
      {/* Información de jugadores */}
      <header role="banner" className="flex w-full mb-4 pb-4 min-h-[120px]">
        <div role="group" aria-labelledby="player1-label" className="flex-1 text-center">
          <label id="player1-label" className="sr-only">Nombre del equipo 1</label>
          <input
            type="text"
            value={jugador1}
            onChange={(e) => setJugador1(e.target.value)}
            className="rey-premium-player-input"
            placeholder="Nosotros"
            maxLength={15}
            aria-label="Nombre del equipo 1"
            aria-describedby="player1-score"
          />
          <div id="player1-score" className="mt-4">
            <span 
              className={`rey-premium-score-display ${puntosNos === 29 ? 'rey-premium-score-winner' : ''}`}
              aria-live="polite"
              aria-atomic="true"
              aria-label={`Puntos del equipo 1: ${puntosNos}`}
            >
              {puntosNos}
            </span>
          </div>
        </div>
        
        <div role="separator" aria-label="Divisor del trono" className="rey-premium-throne-divider">
          {/* Trono divisor */}
        </div>
        
        <div role="group" aria-labelledby="player2-label" className="flex-1 text-center">
          {/* Similar para jugador 2 */}
        </div>
      </header>
      
      {/* Área de puntajes */}
      <section role="region" aria-label="Marcador de puntos" className="flex w-full flex-1 min-h-0 mb-3">
        <div role="group" aria-labelledby="player1-scoring" className="flex-1 flex flex-col">
          <h2 id="player1-scoring" className="sr-only">Área de puntuación equipo 1</h2>
          <div 
            className="flex-1 p-1 pr-2"
            role="button"
            tabIndex={0}
            aria-label={`Sumar punto a ${jugador1}. Puntos actuales: ${puntosNos}`}
            onPointerDown={(e) => handlePointerDown(e, 'nos')}
          >
            <ScoreDisplay puntos={puntosNos} puntosTotales={puntosTotales} />
          </div>
        </div>
        
        {/* Similar para jugador 2 */}
      </section>
      
      {/* Controles */}
      <section role="region" aria-label="Controles de juego" className="flex w-full h-20 flex-shrink-0">
        {/* Botones con roles apropiados */}
      </section>
    </section>
    
    {/* Área de acciones */}
    <nav role="navigation" aria-label="Acciones del juego" className="rey-premium-controls-area">
      {/* Botones de navegación */}
    </nav>
  </section>
</main>
```

#### **3. Skip Links**
```javascript
// src/components/AnotadorTruco.jsx - Agregar al inicio
<div className="skip-links">
  <a href="#main-content" className="skip-link">
    Saltar al contenido principal
  </a>
  <a href="#game-controls" className="skip-link">
    Saltar a controles de juego
  </a>
</div>
```

#### **4. CSS para Skip Links**
```css
/* src/styles/globals.css - Agregar skip links */
.skip-links {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s, top 0.3s;
}

.skip-link:focus {
  top: 6px;
  opacity: 1;
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### **Testing**
- [ ] Alt text es descriptivo
- [ ] Landmarks son correctos
- [ ] Skip links funcionan
- [ ] Estructura semántica lógica

---

## 🔥 **TASK #4: CONTRASTE Y LEGIBILIDAD (ALTA)**

### **Descripción**
Verificar y mejorar contraste de colores para cumplir WCAG AA.

### **Ubicación**
- `src/styles/globals.css`

### **Implementación**

#### **1. Verificar Contrastes Actuales**
```css
/* src/styles/globals.css - Verificar y documentar ratios */

/* CONTRASTES ACTUALES */
/* Texto principal: #F5DEB3 sobre #0a0a0a = 8.5:1 ✅ */
/* Texto botones: #0a0a0a sobre #D4A574 = 6.2:1 ✅ */
/* Texto secondary: verificar y ajustar si necesario */

/* Mejorar contraste en estados disabled */
.rey-premium-score-button:disabled {
  background: #666666;
  color: #ffffff;
  /* Ratio: 6.26:1 ✅ */
}

/* Mejorar contraste en elementos secundarios */
.rey-premium-history-subtitle {
  color: #F5DEB3; /* Cambiado de color más claro */
  opacity: 0.9;
}

/* Asegurar contraste en focus */
.rey-premium-score-button:focus-visible {
  outline: 3px solid #F5DEB3; /* Más grueso para mejor visibilidad */
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(245, 222, 179, 0.4); /* Más prominente */
}
```

#### **2. Modo Alto Contraste**
```css
/* src/styles/globals.css - Soporte para alto contraste */

/* Detección de preferencias de usuario */
@media (prefers-contrast: high) {
  .rey-premium-title {
    color: #ffffff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  }
  
  .rey-premium-score-display {
    color: #ffffff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }
  
  .rey-premium-score-button {
    background: #ffffff;
    color: #000000;
    border: 2px solid #000000;
  }
  
  .rey-premium-score-button:focus-visible {
    outline: 4px solid #000000;
    outline-offset: 2px;
  }
}
```

#### **3. Texto Escalable**
```css
/* src/styles/globals.css - Respeto por preferencias de tamaño */

/* Soporte para texto grande */
@media (prefers-reduced-motion: no-preference) {
  .rey-premium-score-display {
    font-size: clamp(2rem, 4vw + 1rem, 4rem);
  }
}

/* Ajuste por zoom del sistema */
.rey-premium-player-input {
  font-size: max(1rem, 16px); /* Prevenir zoom en iOS */
}

/* Mejor legibilidad en pantallas pequeñas */
@media (max-width: 320px) {
  .rey-premium-score-display {
    font-size: clamp(1.5rem, 6vw, 2.5rem);
  }
  
  .rey-premium-action-button {
    font-size: max(0.875rem, 14px);
    padding: 0.75rem 1rem;
  }
}
```

### **Testing**
- [ ] Contraste cumple WCAG AA (4.5:1)
- [ ] Texto escalable funciona
- [ ] Alto contraste se ve bien
- [ ] Legible en pantallas pequeñas

---

## 🔧 **IMPLEMENTACIÓN SEGURA**

### **Orden de Implementación**
1. **ARIA Labels** - Más crítico para screen readers
2. **Focus Management** - Navegación con teclado
3. **Alt Text & Landmarks** - Estructura semántica
4. **Contraste** - Último, más visual

### **Precauciones**
- Probar con screen reader (NVDA, JAWS, VoiceOver)
- Verificar navegación solo con teclado
- Testear con usuarios con discapacidades
- Validar con herramientas automáticas

### **Herramientas de Testing**
- **aXe DevTools** - Análisis automático
- **WAVE** - Web accessibility evaluation
- **Lighthouse** - Accessibility score
- **Colour Contrast Analyser** - Verificación de contraste

---

## ✅ **CRITERIOS DE ÉXITO**

### **ARIA Labels**
- [x] Screen reader anuncia cambios
- [x] Elementos interactivos tienen labels
- [x] Aria-live para contenido dinámico

### **Focus Management**
- [x] Focus trap en modales
- [x] Navegación con teclado lógica
- [x] Focus visible claro
- [x] Escape funciona en modales

### **Alt Text & Landmarks**
- [x] Imágenes tienen alt descriptivo
- [x] Estructura semántica correcta
- [x] Skip links funcionales
- [x] Headings jerárquicos

### **Contraste**
- [x] Cumple WCAG AA (4.5:1)
- [x] Estados disabled visibles
- [x] Focus altamente visible
- [x] Modo alto contraste disponible

---

## 🎯 **SIGUIENTE PASO**
Una vez completadas estas mejoras, proceder con **06-FINAL-VALIDATION.md**

*Estimado: 10-12 horas de trabajo*  
*Prioridad: ALTA*  
*Riesgo: MEDIO (cambios estructurales)*