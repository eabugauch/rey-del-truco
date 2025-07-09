# 🎬 FASE 1: ENTRADA CINEMATOGRÁFICA - REY DEL TRUCO

## 🎯 **OBJETIVO**
Crear una secuencia de entrada épica que establezca inmediatamente la majestuosidad del Rey del Truco, con elementos que aparezcan de forma escalonada y dramática.

## 🎭 **ELEMENTOS A IMPLEMENTAR**

### 1. **SECUENCIA DE ENTRADA ESCALONADA**
```css
/* Animación principal de entrada */
@keyframes fadeInSequence {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}

.epic-entrance-sequence {
  animation: fadeInSequence 3s ease-out;
}
```

### 2. **CORONA DESCENDENTE**
```css
/* Corona que desciende desde arriba con rotación */
@keyframes coronaDescent {
  0% { 
    transform: translateY(-200px) rotate(-10deg) scale(0.8);
    opacity: 0;
    filter: blur(5px);
  }
  50% {
    transform: translateY(-50px) rotate(-5deg) scale(0.9);
    opacity: 0.7;
    filter: blur(2px);
  }
  100% { 
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 1;
    filter: blur(0px);
  }
}

.corona-descent {
  animation: coronaDescent 2s ease-out 0.5s both;
}
```

### 3. **TÍTULO CON EFECTO TYPEWRITER**
```css
/* Efecto de escritura letra por letra */
@keyframes typewriter {
  0% { width: 0; }
  100% { width: 100%; }
}

@keyframes blinkCursor {
  0%, 50% { border-right: 3px solid #D4AF37; }
  51%, 100% { border-right: 3px solid transparent; }
}

.titulo-typewriter {
  overflow: hidden;
  white-space: nowrap;
  animation: 
    typewriter 2s steps(12) 1s both,
    blinkCursor 1s infinite;
}
```

### 4. **TRONO QUE EMERGE**
```css
/* Trono emerge desde las sombras con glow */
@keyframes tronoEmerge {
  0% { 
    transform: translateY(100px) scale(0.8);
    opacity: 0;
    filter: brightness(0.3) blur(10px);
  }
  30% {
    transform: translateY(50px) scale(0.9);
    opacity: 0.5;
    filter: brightness(0.6) blur(5px);
  }
  70% {
    transform: translateY(10px) scale(0.95);
    opacity: 0.8;
    filter: brightness(0.8) blur(2px);
  }
  100% { 
    transform: translateY(0) scale(1);
    opacity: 1;
    filter: brightness(1) blur(0px);
  }
}

.trono-emergence {
  animation: tronoEmerge 2.5s ease-out 1.5s both;
}
```

### 5. **PARTÍCULAS DORADAS DE FONDO**
```css
/* Partículas flotantes */
@keyframes particleFloat {
  0% { 
    transform: translateY(100vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { 
    transform: translateY(-100px) translateX(50px) rotate(360deg);
    opacity: 0;
  }
}

.golden-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #FFD700, #D4AF37);
  border-radius: 50%;
  animation: particleFloat 8s linear infinite;
}

.golden-particle:nth-child(1) { left: 10%; animation-delay: 0s; }
.golden-particle:nth-child(2) { left: 20%; animation-delay: 1s; }
.golden-particle:nth-child(3) { left: 30%; animation-delay: 2s; }
.golden-particle:nth-child(4) { left: 40%; animation-delay: 3s; }
.golden-particle:nth-child(5) { left: 50%; animation-delay: 4s; }
.golden-particle:nth-child(6) { left: 60%; animation-delay: 5s; }
.golden-particle:nth-child(7) { left: 70%; animation-delay: 6s; }
.golden-particle:nth-child(8) { left: 80%; animation-delay: 7s; }
.golden-particle:nth-child(9) { left: 90%; animation-delay: 8s; }
```

## 🎨 **CLASES CSS A AGREGAR**

### **Layout Principal**
```css
.epic-entrance-layout {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
}

.epic-entrance-container {
  position: relative;
  z-index: 10;
}

.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}
```

### **Efectos de Entrada**
```css
.fade-in-delayed {
  opacity: 0;
  animation: fadeInSequence 1s ease-out forwards;
}

.fade-in-delayed.delay-1 { animation-delay: 0.5s; }
.fade-in-delayed.delay-2 { animation-delay: 1s; }
.fade-in-delayed.delay-3 { animation-delay: 1.5s; }
.fade-in-delayed.delay-4 { animation-delay: 2s; }
.fade-in-delayed.delay-5 { animation-delay: 2.5s; }
```

## 🎯 **ARCHIVOS A MODIFICAR**

### **1. globals.css**
Agregar todas las animaciones y clases CSS definidas arriba

### **2. PantallaInicio.jsx**
```jsx
// Agregar clases a los elementos existentes
<div className="epic-entrance-layout">
  <div className="particles-container">
    {/* Generar partículas */}
    {Array.from({length: 20}).map((_, i) => (
      <div key={i} className="golden-particle" />
    ))}
  </div>
  
  <div className="epic-entrance-container">
    <img 
      src={require('../styles/assets/images/corona.png')} 
      alt="Corona Rey del Truco" 
      className="rey-premium-corona corona-descent"
    />
    
    <h1 className="rey-premium-title titulo-typewriter">
      REY DEL TRUCO
    </h1>
    
    <img 
      src={require('../styles/assets/images/tronoArg.png')} 
      alt="Trono Argentino" 
      className="rey-premium-trono trono-emergence"
    />
    
    <div className="rey-premium-buttons fade-in-delayed delay-5">
      {/* Botones */}
    </div>
  </div>
</div>
```

## ⚡ **PERFORMANCE CONSIDERATIONS**

### **Optimizaciones**
- Usar `transform` y `opacity` para animaciones suaves
- Aplicar `will-change: transform` a elementos animados
- Usar `animation-fill-mode: both` para evitar flashes
- Limitar partículas a 20 elementos máximo

### **Responsive**
- Reducir intensidad de efectos en dispositivos móviles
- Usar `@media (prefers-reduced-motion: reduce)` para accesibilidad

## 🎪 **TESTING CHECKLIST**

- [ ] Secuencia de entrada se ejecuta correctamente
- [ ] Corona desciende con rotación suave
- [ ] Título aparece con efecto typewriter
- [ ] Trono emerge desde las sombras
- [ ] Partículas flotan en el fondo
- [ ] Performance mantiene 60fps
- [ ] Funciona en dispositivos móviles
- [ ] Respeta preferencias de movimiento reducido

## 🚀 **PRÓXIMOS PASOS**

Una vez implementada la Fase 1, proceder con:
- **FASE 2**: Efectos de Profundidad
- **FASE 3**: Interactividad Premium  
- **FASE 4**: Elementos Ornamentales

---

**🎭 RESULTADO ESPERADO**: Una entrada cinematográfica que establezca inmediatamente la majestuosidad del Rey del Truco, creando expectativa y emoción desde el primer segundo.