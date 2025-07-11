// src/components/AnotadorTruco.jsx
import { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import useSwipeBack from '../hooks/useSwipeBack';
import ScoreDisplay from './ScoreDisplay';
import PantallaInicio from './PantallaInicio';
import MobileNavHeader from './MobileNavHeader';

const AnotadorTruco = () => {
  const [pantallaActual, setPantallaActual] = useState('inicio'); // 'inicio' | 'juego' | 'historial'
  const [mostrarModalFalta, setMostrarModalFalta] = useState(false);
  
  // Función para calcular puntos de falta envido
  const calcularPuntosFalta = (equipoGanador) => {
    if (equipoGanador === 'nos') {
      return puntosTotales - puntosEllos;
    } else {
      return puntosTotales - puntosNos;
    }
  };
  
  // Función para verificar si gana el partido
  const ganaPartido = (equipoGanador) => {
    const puntosActuales = equipoGanador === 'nos' ? puntosNos : puntosEllos;
    const puntosAGanar = calcularPuntosFalta(equipoGanador);
    return puntosActuales + puntosAGanar >= puntosTotales;
  };

  // Función para iniciar partida desde pantalla de inicio
  const iniciarPartida = (configuracion) => {
    nuevoPartido(configuracion);
    setPantallaActual('juego');
  };
  const {
    puntosNos,
    puntosEllos,
    ganador,
    jugador1,
    jugador2,
    historial,
    puntosTotales,
    setJugador1,
    setJugador2,
    sumarPunto,
    restarPunto,
    nuevoPartido,
    faltaEnvido,
    limpiarGanador
  } = useGameState();

  const renderPantallaJuego = () => (
    <div className="rey-premium-layout">
      <div className="rey-premium-container">
        {/* Contenedor principal del juego */}
        <div className="rey-premium-game-container">
          
          {/* Contenedor principal con divisor del trono */}
          <div className="flex w-full flex-1">
            {/* Sección del jugador 1 */}
            <div className="flex-1 flex flex-col">
              {/* Nombres y puntos - Jugador 1 */}
              <div className="text-center mb-4 pb-4 min-h-[120px] flex flex-col justify-center">
                <input
                  type="text"
                  value={jugador1}
                  onChange={(e) => setJugador1(e.target.value)}
                  className={`rey-premium-player-input ${
                    puntosNos === 29 
                      ? 'rey-premium-input-winner'
                      : ''
                  }`}
                  placeholder="Nosotros"
                  maxLength={15}
                />
                <div className="mt-4">
                  <span className={`rey-premium-score-display ${
                    puntosNos === 29 
                      ? 'rey-premium-score-winner'
                      : ''
                  }`}>
                    {puntosNos}
                  </span>
                </div>
              </div>
              
              {/* Rayitas - Jugador 1 */}
              <div className="flex-1 p-1 pr-2">
                <div 
                  className="h-full flex items-center justify-center overflow-hidden cursor-pointer select-none" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!ganador) {
                      sumarPunto('nos');
                    }
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!ganador) {
                      sumarPunto('nos');
                    }
                  }}
                  style={{ touchAction: 'manipulation' }}
                >
                  <ScoreDisplay puntos={puntosNos} puntosTotales={puntosTotales} />
                </div>
              </div>
            </div>
            
            {/* Divisor del Trono - Reemplaza ambas líneas divisorias */}
            <div className="rey-premium-throne-divider">
              <img 
                src={require('../styles/assets/images/tronoArg.png')} 
                alt="Divisor Trono" 
              />
            </div>
            
            {/* Sección del jugador 2 */}
            <div className="flex-1 flex flex-col">
              {/* Nombres y puntos - Jugador 2 */}
              <div className="text-center mb-4 pb-4 min-h-[120px] flex flex-col justify-center">
                <input
                  type="text"
                  value={jugador2}
                  onChange={(e) => setJugador2(e.target.value)}
                  className={`rey-premium-player-input ${
                    puntosEllos === 29 
                      ? 'rey-premium-input-winner'
                      : ''
                  }`}
                  placeholder="Ellos"
                  maxLength={15}
                />
                <div className="mt-4">
                  <span className={`rey-premium-score-display ${
                    puntosEllos === 29 
                      ? 'rey-premium-score-winner'
                      : ''
                  }`}>
                    {puntosEllos}
                  </span>
                </div>
              </div>
              
              {/* Rayitas - Jugador 2 */}
              <div className="flex-1 p-1 pl-2">
                <div 
                  className="h-full flex items-center justify-center overflow-hidden cursor-pointer select-none" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!ganador) {
                      sumarPunto('ellos');
                    }
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!ganador) {
                      sumarPunto('ellos');
                    }
                  }}
                  style={{ touchAction: 'manipulation' }}
                >
                  <ScoreDisplay puntos={puntosEllos} puntosTotales={puntosTotales} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Controles alineados con cada sección de jugador - ALTURA FIJA AL FINAL */}
          <div className="flex w-full h-20 flex-shrink-0">
            {/* Botón Menos Jugador 1 - Centrado en su sección */}
            <div className="flex-1 flex justify-center items-center">
              <button
                onClick={() => restarPunto('nos')}
                disabled={!!ganador}
                className={`rey-premium-score-button rey-premium-score-button-minus ${!!ganador ? 'disabled' : ''}`}
              >
                −
              </button>
            </div>
            
            {/* Espacio del trono - Sin botones */}
            <div className="w-140px"></div>
            
            {/* Botón Menos Jugador 2 - Centrado en su sección */}
            <div className="flex-1 flex justify-center items-center">
              <button
                onClick={() => restarPunto('ellos')}
                disabled={!!ganador}
                className={`rey-premium-score-button rey-premium-score-button-minus ${!!ganador ? 'disabled' : ''}`}
              >
                −
              </button>
            </div>
          </div>
        </div>
        
        {/* Área de controles */}
        <div className="rey-premium-controls-area">
          {/* Botones principales - BIEN VISIBLES */}
          <div className="flex justify-center gap-2 flex-wrap">
            <button
              onClick={() => setMostrarModalFalta(true)}
              disabled={!!ganador}
              className="rey-premium-action-button rey-premium-action-button-danger"
            >
              FALTA ENVIDO
            </button>
            
            <button
              onClick={() => setPantallaActual('inicio')}
              className="rey-premium-action-button rey-premium-action-button-primary"
            >
              MENÚ PRINCIPAL
            </button>
            
            {historial.length > 0 && (
              <button
                onClick={() => setPantallaActual('historial')}
                className="rey-premium-action-button"
              >
                VER HISTORIAL
              </button>
            )}
            
          </div>
        </div>
      </div>
      
      {/* Modal de victoria - PREMIUM */}
      {ganador && (
        <div className="rey-premium-modal-backdrop">
          <div className="rey-premium-modal-container">
            {/* Botón de cerrar */}
            <button
              onClick={() => {
                restarPunto(ganador);
                limpiarGanador();
              }}
              className="rey-premium-modal-close"
            >
              ✕
            </button>
            
            <div className="rey-premium-modal-icon">🏆</div>
            
            <h2 className="rey-premium-modal-title">
              ¡Ganó {ganador === 'nos' ? jugador1 : jugador2}!
            </h2>
            
            <p className="rey-premium-modal-text">
              {puntosTotales} puntos, ¡qué partidazo che!
            </p>
            
            <div className="rey-premium-modal-buttons">
              <button
                onClick={() => {
                  nuevoPartido();
                  setPantallaActual('juego');
                }}
                className="rey-premium-modal-button rey-premium-modal-button-primary"
              >
                OTRA VUELTA
              </button>
              <button
                onClick={() => setPantallaActual('inicio')}
                className="rey-premium-modal-button rey-premium-modal-button-secondary"
              >
                MENÚ PRINCIPAL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Falta Envido - PREMIUM */}
      {mostrarModalFalta && (
        <div className="rey-premium-modal-backdrop">
          <div className="rey-premium-modal-container">
            <div className="rey-premium-modal-icon">🃏</div>
            
            <h2 className="rey-premium-modal-title">
              ¿Quién ganó la falta?
            </h2>
            
            <div className="rey-premium-modal-buttons">
              <button
                onClick={() => {
                  faltaEnvido('nos');
                  setMostrarModalFalta(false);
                }}
                className="rey-premium-modal-button rey-premium-modal-button-primary"
              >
                <div className="flex flex-col items-center">
                  <span className="text-xl mb-1">{jugador1}</span>
                  <span className="text-sm opacity-80">
                    {ganaPartido('nos') ? '¡PARTIDO!' : `+${calcularPuntosFalta('nos')} puntos`}
                  </span>
                </div>
              </button>
              
              <button
                onClick={() => {
                  faltaEnvido('ellos');
                  setMostrarModalFalta(false);
                }}
                className="rey-premium-modal-button rey-premium-modal-button-primary"
              >
                <div className="flex flex-col items-center">
                  <span className="text-xl mb-1">{jugador2}</span>
                  <span className="text-sm opacity-80">
                    {ganaPartido('ellos') ? '¡PARTIDO!' : `+${calcularPuntosFalta('ellos')} puntos`}
                  </span>
                </div>
              </button>
              
              <button
                onClick={() => setMostrarModalFalta(false)}
                className="rey-premium-modal-button rey-premium-modal-button-secondary"
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  );

  // Hook para swipe-back gesture (iOS native behavior) - solo activo en historial
  useSwipeBack(() => setPantallaActual('juego'), pantallaActual === 'historial');

  const renderPantallaHistorial = () => {
    
    return (
    <div className="rey-premium-layout">
      
      {/* Header Rey del Truco */}
      <div className="rey-premium-history-header">
        <button
          onClick={() => setPantallaActual('juego')}
          className="rey-premium-back-button"
        >
          <span>←</span>
          <span>VOLVER</span>
        </button>
        
        <h1 className="rey-premium-history-title">Historial</h1>
        <p className="rey-premium-history-subtitle">Movimientos del partido</p>
      </div>

      {/* Contenido del historial */}
      <div className="flex-1">
        {historial.length === 0 ? (
          <div className="rey-premium-history-container">
            <div className="rey-premium-empty-state">
              <div className="rey-premium-empty-icon">📜</div>
              <p className="rey-premium-empty-text">
                No hay movimientos registrados aún
              </p>
            </div>
          </div>
        ) : (
          <div className="rey-premium-history-container">
            <div className="space-y-3">
              {historial.slice(0, 50).map((entrada, index) => (
                <div
                  key={entrada.id}
                  className="rey-premium-history-entry"
                >
                  <div className="rey-premium-entry-main">
                    {/* Sección de acción */}
                    <div className="rey-premium-entry-action">
                      {entrada.accion === 'Falta Envido' ? (
                        <>
                          <span className="rey-premium-entry-icon">🃏</span>
                          <span className="rey-premium-entry-type falta-envido">
                            Falta Envido
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="rey-premium-entry-icon">
                            {entrada.accion === '+' ? '⚡' : '↩️'}
                          </span>
                          <span className={`rey-premium-entry-type ${
                            entrada.accion === '+' ? 'punto-positivo' : 'punto-negativo'
                          }`}>
                            {entrada.accion === '+' ? '+1 punto' : '-1 punto'}
                          </span>
                        </>
                      )}
                    </div>
                    
                    {/* Detalles del jugador */}
                    <div className="rey-premium-entry-details">
                      <div className="rey-premium-entry-player">
                        {entrada.equipo === 'nos' ? jugador1 : jugador2}
                      </div>
                      <div className="rey-premium-entry-score">
                        {entrada.puntoAnterior} → {entrada.puntoNuevo} puntos
                      </div>
                    </div>
                    
                    {/* Meta información */}
                    <div className="rey-premium-entry-meta">
                      <div className="rey-premium-entry-time">
                        {entrada.hora.substring(0, 5)}
                      </div>
                      <div className="rey-premium-entry-number">
                        Mov #{historial.length - index}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    );
  };

  // Renderizar pantalla según estado
  if (pantallaActual === 'inicio') {
    return (
      <PantallaInicio 
        key={`inicio-${pantallaActual}`} // Force re-mount cuando se navega a inicio
        onIniciarPartida={iniciarPartida}
        onContinuarPartida={() => setPantallaActual('juego')}
        haySavedGame={historial.length > 0 && !ganador}
      />
    );
  }
  
  return pantallaActual === 'historial' ? renderPantallaHistorial() : renderPantallaJuego();
};

export default AnotadorTruco;