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
        {/* Header Premium con Corona */}
        <div className="rey-premium-header-compact">
          <img 
            src={require('../styles/assets/images/corona.png')} 
            alt="Corona" 
            className="rey-premium-corona-small"
          />
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
          <img 
            src={require('../styles/assets/images/corona.png')} 
            alt="Corona" 
            className="rey-premium-corona-top"
          />
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
    <div className="rey-premium-layout">
      <div className={`rey-premium-container ${haySavedGame ? 'has-continue-button' : ''}`}>
        
        {/* Header Section */}
        <div className="flex flex-col items-center">
          {/* Corona Premium */}
          <img 
            src={require('../styles/assets/images/corona.png')} 
            alt="Corona Rey del Truco" 
            className="rey-premium-corona"
          />
          
          {/* Título Premium con Tilt Warp */}
          <h1 className="rey-premium-title">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.5rem', marginBottom: '-0.2em' }}>
              <span style={{ fontSize: '6rem' }}>REY</span>
              <span style={{ fontSize: '4.2rem' }}>DEL</span>
            </div>
            <span style={{ fontSize: '6rem', display: 'block' }}>TRUCO</span>
          </h1>
          
          {/* Trono Argentino */}
          <img 
            src={require('../styles/assets/images/tronoArg.png')} 
            alt="Trono Argentino" 
            className="rey-premium-trono"
          />
        </div>

        {/* Botones Premium */}
        <div className={`rey-premium-buttons ${haySavedGame ? 'has-continue' : ''}`}>
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