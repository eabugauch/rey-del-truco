// src/components/PantallaInicio.jsx
import { useState } from 'react';

const PantallaInicio = ({ onIniciarPartida, onContinuarPartida, haySavedGame }) => {
  const [modoSeleccionado, setModoSeleccionado] = useState(null); // null | 'rapido' | 'personalizado'
  const [configuracion, setConfiguracion] = useState({
    jugador1: 'Nosotros',
    jugador2: 'Ellos',
    puntosTotales: 30
  });

  const iniciarRapido = () => {
    onIniciarPartida({
      jugador1: 'Nosotros',
      jugador2: 'Ellos',
      puntosTotales: 30
    });
  };

  const iniciarPersonalizado = () => {
    onIniciarPartida(configuracion);
  };

  const renderModoRapido = () => (
    <div className="rey-premium-layout">
      <div className="rey-premium-container form-container">
        {/* Header Premium */}
        <div className="rey-premium-header-compact">
          <h2 className="rey-premium-title-secondary">
            BATALLA <span className="text-golden">RELÁMPAGO</span>
          </h2>
          <p className="rey-premium-subtitle">
            Partida clásica a 30 puntos para verdaderos guerreros
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="rey-premium-info-card">
            <div className="flex justify-between items-center">
              <span className="rey-premium-label">Jugadores:</span>
              <span className="rey-premium-value">Nosotros vs Ellos</span>
            </div>
          </div>
          <div className="rey-premium-info-card">
            <div className="flex justify-between items-center">
              <span className="rey-premium-label">Puntos:</span>
              <span className="rey-premium-value">30 puntos</span>
            </div>
          </div>
          <div className="rey-premium-info-card">
            <div className="flex justify-between items-center">
              <span className="rey-premium-label">Malas:</span>
              <span className="rey-premium-value">0-15 puntos</span>
            </div>
          </div>
          <div className="rey-premium-info-card">
            <div className="flex justify-between items-center">
              <span className="rey-premium-label">Buenas:</span>
              <span className="rey-premium-value">16-30 puntos</span>
            </div>
          </div>
        </div>

        <div className="rey-premium-form-buttons">
          <button
            onClick={() => setModoSeleccionado(null)}
            className="rey-premium-button rey-premium-button-secondary flex-1"
          >
            ← VOLVER
          </button>
          <button
            onClick={iniciarRapido}
            className="rey-premium-button rey-premium-button-primary flex-2"
          >
            ¡A JUGAR! 🎮
          </button>
        </div>
      </div>
    </div>
  );

  const renderModoPersonalizado = () => (
    <div className="rey-premium-layout">
      <div className="rey-premium-container form-container">
        {/* Header Compacto */}
        <div className="rey-premium-header-minimal">
          <h2 className="rey-premium-title-compact">
            CONFIGURÁ TUS <span className="text-golden">EQUIPOS</span>
          </h2>
        </div>

        <div className="rey-premium-form-content">
          {/* Equipos con VS centrado */}
          <div className="rey-premium-teams-container">
            <input
              type="text"
              value={configuracion.jugador1}
              onChange={(e) => setConfiguracion({...configuracion, jugador1: e.target.value})}
              className="rey-premium-input-compact"
              maxLength={15}
              placeholder="Tu equipo"
            />
            
            <div className="rey-premium-vs-badge">VS</div>
            
            <input
              type="text"
              value={configuracion.jugador2}
              onChange={(e) => setConfiguracion({...configuracion, jugador2: e.target.value})}
              className="rey-premium-input-compact"
              maxLength={15}
              placeholder="Rivales"
            />
          </div>

          {/* Selector de puntos compacto */}
          <div className="rey-premium-points-selector">
            <h3 className="points-title-styled">¿A <span className="text-golden">CUÁNTOS</span> JUGAMOS?</h3>
            <div className="points-options">
              {[
                { value: 16, icon: '⚡', label: 'RÁPIDA' },
                { value: 24, icon: '⚔️', label: 'CLÁSICA' },
                { value: 30, icon: '🏆', label: 'ÉPICA' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setConfiguracion({...configuracion, puntosTotales: option.value})}
                  className={`point-option ${configuracion.puntosTotales === option.value ? 'selected' : ''}`}
                >
                  <span className="point-value">{option.value}</span>
                  <span className="point-icon">{option.icon}</span>
                  <span className="point-label">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rey-premium-form-buttons">
          <button
            onClick={() => setModoSeleccionado(null)}
            className="rey-premium-button rey-premium-button-secondary flex-1"
          >
            ← VOLVER
          </button>
          <button
            onClick={iniciarPersonalizado}
            className="rey-premium-button rey-premium-button-primary flex-2"
          >
            ¡LARGUEMOS!
          </button>
        </div>
      </div>
    </div>
  );




  const renderMenuPrincipal = () => (
    <div className="rey-premium-layout epic-entrance-layout">
      {/* 🌫️ FASE 2: Fondo Bokeh con profundidad */}
      <div className="bokeh-background depth-layer-background"></div>
      
      {/* Contenedor para partículas doradas cinematográficas */}
      <div className="particles-container">
        {/* Partículas grandes - Estrellas principales */}
        {Array.from({length: 5}).map((_, i) => (
          <div key={`large-${i}`} className="golden-particle-large" />
        ))}
        
        {/* Partículas medianas - Polvo dorado */}
        {Array.from({length: 5}).map((_, i) => (
          <div key={`medium-${i}`} className="golden-particle-medium" />
        ))}
        
        {/* Partículas pequeñas - Sparkles */}
        {Array.from({length: 5}).map((_, i) => (
          <div key={`small-${i}`} className="golden-particle-small" />
        ))}
        
        {/* Partículas micro - Ambiente */}
        {Array.from({length: 5}).map((_, i) => (
          <div key={`micro-${i}`} className="golden-particle-micro" />
        ))}
      </div>
      
      <div className={`rey-premium-container epic-entrance-container ${haySavedGame ? 'has-continue-button' : ''}`}>
        
        {/* Header Section con capas 3D */}
        <div className="flex flex-col items-center epic-entrance-sequence">
          {/* 🎭 FASE 2: Título Premium con profundidad */}
          <div className="depth-layer-2">
            <div className="rey-premium-logo-container fade-in-delayed delay-2 focus-sharp">
              <div className="rey-premium-logo-line-1">
                <img 
                  src={require('../styles/assets/images/rey.png')} 
                  alt="REY" 
                  className="logo-image logo-rey" 
                />
                <img 
                  src={require('../styles/assets/images/del.png')} 
                  alt="DEL" 
                  className="logo-image logo-del" 
                />
              </div>
              <div className="rey-premium-logo-line-2">
                <img 
                  src={require('../styles/assets/images/truco.png')} 
                  alt="TRUCO" 
                  className="logo-image logo-truco" 
                />
              </div>
            </div>
          </div>
          
          {/* 🎭 FASE 2: Trono Argentino con perspectiva 3D */}
          <div className="depth-layer-3">
            <img 
              src={require('../styles/assets/images/tronoArg.png')} 
              alt="Trono Argentino" 
              className="rey-premium-trono trono-emergence focus-medium gpu-accelerated"
            />
          </div>
        </div>

        {/* 🎭 FASE 2: Botones Premium con profundidad */}
        <div className="depth-layer-1">
          <div className={`rey-premium-buttons fade-in-delayed delay-5 focus-sharp ${haySavedGame ? 'has-continue' : ''}`}>
            {haySavedGame && (
              <button
                onClick={onContinuarPartida}
                className="rey-premium-button continue-game"
              >
                CONTINUAR
              </button>
            )}
            
            <button
              onClick={() => setModoSeleccionado('personalizado')}
              className="rey-premium-button"
            >
              ANOTADOR
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!modoSeleccionado ? (
        renderMenuPrincipal()
      ) : (
        <>
          {modoSeleccionado === 'rapido' && renderModoRapido()}
          {modoSeleccionado === 'personalizado' && renderModoPersonalizado()}
        </>
      )}
    </>
  );
};

export default PantallaInicio;