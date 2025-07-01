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
  const [temaActual, setTemaActual] = useState('calido'); // 'calido' | 'oscuro'
  
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
    <div className={`h-screen notebook-background paper-texture flex flex-col overflow-hidden theme-${temaActual}`}>

      {/* Contenido principal - ALTURA CALCULADA CORRECTAMENTE */}
      <div className="flex flex-col h-full p-2 md:p-4">
        
        {/* Card principal - DEJA ESPACIO PARA BOTONES DE ABAJO */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-300 p-3 md:p-4 flex flex-col" style={{height: 'calc(100vh - 140px)'}}>
          
          {/* Contenedor principal con línea vertical continua */}
          <div className="flex w-full flex-1 flex-col">
            {/* Títulos lado a lado con línea vertical - altura optimizada */}
            <div className="flex w-full mb-2 border-b-2 border-gray-300 pb-1 h-[12vh] min-h-[80px] max-h-[100px]">
              <div className="flex-1 text-center">
                <input
                  type="text"
                  value={jugador1}
                  onChange={(e) => setJugador1(e.target.value)}
                  className={`text-2xl md:text-3xl handwritten-bold handwritten-input organic-text transform rotate-1 bg-transparent border-none outline-none text-center w-full player-name-giant ${
                    puntosNos === 29 
                      ? 'animate-bounce animate-pulse drop-shadow-2xl text-enhanced font-black'
                      : ''
                  }`}
                  style={{
                    color: 'var(--current-ink-color)'
                  }}
                  placeholder="Nosotros"
                  maxLength={15}
                />
                <div className="mt-0.5">
                  <span className={`text-4xl md:text-5xl handwritten-bold organic-text transform -rotate-1 inline-block score-primary ${
                    puntosNos === 29 
                      ? 'animate-bounce animate-pulse drop-shadow-2xl text-enhanced font-black'
                      : 'animate-float'
                  }`} style={{
                    color: 'var(--current-ink-color)',
                    '--glow-color': puntosNos === 29 ? '55, 65, 81' : undefined,
                    '--rotation': puntosNos === 29 ? undefined : '-1deg'
                  }}>
                    {puntosNos}
                  </span>
                </div>
              </div>
              
              {/* Línea vertical separando nombres */}
              <div className="w-px bg-gray-400"></div>
              
              <div className="flex-1 text-center">
                <input
                  type="text"
                  value={jugador2}
                  onChange={(e) => setJugador2(e.target.value)}
                  className={`text-2xl md:text-3xl handwritten-bold handwritten-input organic-text transform -rotate-1 bg-transparent border-none outline-none text-center w-full player-name-giant ${
                    puntosEllos === 29 
                      ? 'animate-bounce animate-pulse drop-shadow-2xl text-enhanced font-black'
                      : ''
                  }`}
                  style={{
                    color: 'var(--current-ink-color)'
                  }}
                  placeholder="Ellos"
                  maxLength={15}
                />
                <div className="mt-0.5">
                  <span className={`text-4xl md:text-5xl handwritten-bold organic-text transform rotate-1 inline-block score-primary ${
                    puntosEllos === 29 
                      ? 'animate-bounce animate-pulse drop-shadow-2xl text-enhanced font-black'
                      : 'animate-float'
                  }`} style={{
                    color: 'var(--current-ink-color)',
                    '--glow-color': puntosEllos === 29 ? '55, 65, 81' : undefined,
                    '--rotation': puntosEllos === 29 ? undefined : '1deg'
                  }}>
                    {puntosEllos}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Rayitas lado a lado - TOMA TODO EL ESPACIO RESTANTE */}
            <div className="flex w-full flex-1 min-h-0 mb-3">
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
              
              {/* Línea vertical separando rayitas */}
              <div className="w-px bg-gray-400"></div>
              
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
          
          {/* Controles alineados con cada jugador - ALTURA FIJA AL FINAL */}
          <div className="flex w-full justify-between px-4 h-16 flex-shrink-0">
            <div className="flex space-x-2 items-center">
              <button
                onClick={() => sumarPunto('nos')}
                disabled={!!ganador}
                className={`w-12 h-12 md:w-14 md:h-14 bg-blue-500/80 hover:bg-blue-600/90 active:bg-blue-700/90 disabled:bg-gray-400/60 text-white rounded-full text-lg md:text-xl transition-all duration-150 disabled:scale-100 transform rotate-1 handwritten-bold organic-button touch-manipulation`}
              >
                +
              </button>
              <button
                onClick={() => restarPunto('nos')}
                disabled={!!ganador}
                className={`w-12 h-12 md:w-14 md:h-14 bg-gray-500/80 hover:bg-gray-600/90 active:bg-gray-700/90 disabled:bg-gray-400/60 text-white rounded-full text-lg md:text-xl transition-all duration-150 disabled:scale-100 transform -rotate-1 handwritten-bold organic-button touch-manipulation`}
              >
                −
              </button>
            </div>
            
            <div className="flex space-x-2 items-center">
              <button
                onClick={() => sumarPunto('ellos')}
                disabled={!!ganador}
                className={`w-12 h-12 md:w-14 md:h-14 bg-blue-500/80 hover:bg-blue-600/90 active:bg-blue-700/90 disabled:bg-gray-400/60 text-white rounded-full text-lg md:text-xl transition-all duration-150 disabled:scale-100 transform -rotate-1 handwritten-bold organic-button touch-manipulation`}
              >
                +
              </button>
              <button
                onClick={() => restarPunto('ellos')}
                disabled={!!ganador}
                className={`w-12 h-12 md:w-14 md:h-14 bg-gray-500/80 hover:bg-gray-600/90 active:bg-gray-700/90 disabled:bg-gray-400/60 text-white rounded-full text-lg md:text-xl transition-all duration-150 disabled:scale-100 transform rotate-1 handwritten-bold organic-button touch-manipulation`}
              >
                −
              </button>
            </div>
          </div>
        </div>
        
        {/* Toggle de tema + Botones de acción - ESPACIO GARANTIZADO Y VISIBLE */}
        <div className="flex flex-col gap-3 mt-3 mb-safe px-4 py-3 bg-white/20 backdrop-blur-sm rounded-lg">
          {/* Toggle de tema - Ciclar entre todos */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                const temas = ['calido', 'oscuro'];
                const indiceActual = temas.indexOf(temaActual);
                const siguienteTema = temas[(indiceActual + 1) % temas.length];
                setTemaActual(siguienteTema);
              }}
              className="bg-white/30 hover:bg-white/40 active:bg-white/50 backdrop-blur-md border border-white/40 text-xs px-4 py-2 rounded-full transition-all duration-200 handwritten-normal organic-button touch-manipulation"
            >
              {temaActual === 'calido' && '🌅 Atardecer'}
              {temaActual === 'oscuro' && '🌙 Noche'}
            </button>
          </div>
          
          {/* Botones principales - BIEN VISIBLES */}
          <div className="flex justify-center gap-2 flex-wrap">
            <button
              onClick={() => setMostrarModalFalta(true)}
              disabled={!!ganador}
              className="bg-red-500/90 hover:bg-red-600 active:bg-red-700 disabled:bg-gray-400/60 text-white py-2 px-3 rounded-lg text-sm transition-all duration-150 disabled:scale-100 transform rotate-1 handwritten-bold organic-button touch-manipulation flex-1 min-w-0 max-w-28 btn-falta-envido"
            >
              Falta Envido
            </button>
            
            <button
              onClick={() => setPantallaActual('inicio')}
              className="bg-blue-500/90 hover:bg-blue-600 active:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-all duration-150 transform -rotate-0.5 handwritten-bold organic-button touch-manipulation flex-1 min-w-0 max-w-28"
            >
              Menú Principal
            </button>
            
            {historial.length > 0 && (
              <button
                onClick={() => setPantallaActual('historial')}
                className="bg-gray-500/90 hover:bg-gray-600 active:bg-gray-700 text-white py-2 px-3 rounded-lg text-sm transition-all duration-150 transform rotate-0.5 handwritten-bold organic-button touch-manipulation flex-1 min-w-0 max-w-28"
              >
                Ver Historial
              </button>
            )}
            
          </div>
        </div>
      </div>

      {/* Modal de victoria - PREMIUM */}
      {ganador && (
        <div className="fixed inset-0 modal-backdrop-premium flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-paper rounded-2xl border-4 border-gray-400 p-8 text-center shadow-2xl max-w-sm w-full transform -rotate-1 card-floating animate-scaleIn relative">
            {/* Botón de cerrar */}
            <button
              onClick={() => {
                restarPunto(ganador);
                limpiarGanador();
              }}
              className="absolute top-2 right-2 w-8 h-8 bg-gray-500/80 hover:bg-gray-600/90 active:bg-gray-700/90 text-white rounded-full text-lg font-bold transition-all duration-150 flex items-center justify-center touch-manipulation"
            >
              ✕
            </button>
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-4xl md:text-5xl ink-blue mb-4 transform rotate-1 handwritten-natural organic-text animate-shimmer animate-epic-bounce">
              ¡Ganó {ganador === 'nos' ? jugador1 : jugador2}!
            </h2>
            <p className="text-xl ink-blue mb-8 transform -rotate-1 handwritten-normal organic-text">
              {puntosTotales} puntos, ¡qué partidazo che!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setPantallaActual('inicio')}
                className="flex-1 bg-gray-500/90 hover:bg-gray-600 active:bg-gray-700 text-white py-3 px-4 rounded-xl text-lg transition-all duration-150 shadow-lg active:scale-98 transform -rotate-0.5 handwritten-bold organic-button touch-manipulation"
              >
                Menú
              </button>
              <button
                onClick={() => {
                  nuevoPartido();
                  setPantallaActual('juego');
                }}
                className="flex-2 bg-blue-500/90 hover:bg-blue-600 active:bg-blue-700 text-white py-3 px-6 rounded-xl text-lg transition-all duration-150 shadow-lg active:scale-98 transform rotate-1 handwritten-bold organic-button touch-manipulation"
              >
                Otra vuelta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Falta Envido - PREMIUM */}
      {mostrarModalFalta && (
        <div className="fixed inset-0 modal-backdrop-premium flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-paper rounded-2xl border-4 border-red-400 p-8 text-center shadow-2xl max-w-sm w-full transform -rotate-1 animate-scaleIn card-floating">
            <div className="text-5xl mb-4 animate-pulse">🃏</div>
            <h2 className="text-3xl md:text-4xl ink-blue mb-6 transform rotate-1 handwritten-natural organic-text">
              ¿Quién ganó la falta?
            </h2>
            
            <div className="flex flex-col space-y-4 mb-6">
              <button
                onClick={() => {
                  faltaEnvido('nos');
                  setMostrarModalFalta(false);
                }}
                className="w-full bg-blue-500/90 hover:bg-blue-600 active:bg-blue-700 text-white py-4 px-6 rounded-xl text-xl transition-all duration-150 shadow-lg active:scale-98 transform rotate-1 handwritten-bold organic-button touch-manipulation"
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
                className="w-full bg-gray-700 hover:bg-gray-800 active:bg-gray-900 text-white py-4 px-6 rounded-xl text-xl transition-all duration-150 shadow-lg active:scale-98 transform -rotate-1 handwritten-bold organic-button touch-manipulation"
              >
                <div className="flex flex-col items-center">
                  <span className="text-xl mb-1">{jugador2}</span>
                  <span className="text-sm opacity-80">
                    {ganaPartido('ellos') ? '¡PARTIDO!' : `+${calcularPuntosFalta('ellos')} puntos`}
                  </span>
                </div>
              </button>
            </div>
            
            <button
              onClick={() => setMostrarModalFalta(false)}
              className="w-full bg-gray-500/90 hover:bg-gray-600 active:bg-gray-700 text-white py-3 px-4 rounded-lg text-lg transition-all duration-150 shadow-lg active:scale-98 transform rotate-0.5 handwritten-bold organic-button touch-manipulation"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}



    </div>
  );

  // Hook para swipe-back gesture (iOS native behavior) - solo activo en historial
  useSwipeBack(() => setPantallaActual('juego'), pantallaActual === 'historial');

  const renderPantallaHistorial = () => {
    
    return (
    <div className={`h-screen notebook-background paper-texture flex flex-col overflow-hidden theme-${temaActual}`}>
      
      {/* Header con navegación móvil nativa optimizada */}
      <MobileNavHeader
        onBack={() => setPantallaActual('juego')}
        title="Historial"
        subtitle="Movimientos del partido"
      />

      {/* Contenido del historial */}
      <div className="flex-1 p-4 md:p-6 pb-safe">
        {historial.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl ink-blue handwritten-normal organic-text transform rotate-1 text-center">
              No hay movimientos registrados aún
            </p>
          </div>
        ) : (
          <div className="bg-white/30 backdrop-blur-sm rounded-xl border border-gray-300/30 p-4 md:p-6 h-full overflow-y-auto">
            <div className="space-y-4">
              {historial.slice(0, 50).map((entrada, index) => (
                <div
                  key={entrada.id}
                  className="bg-white/25 rounded-lg p-5 border border-gray-300/25 shadow-sm hover:bg-white/30 transition-all duration-200 transform hover:scale-[1.01]"
                >
                  {/* Layout horizontal mejorado según UX */}
                  <div className="flex items-center justify-between">
                    {/* Sección principal - Acción prominente */}
                    <div className="flex items-center gap-4 flex-1">
                      {/* Ícono y acción - Nivel 1 de jerarquía */}
                      <div className="flex items-center gap-2">
                        {entrada.accion === 'Falta Envido' ? (
                          <>
                            <span className="text-2xl">🃏</span>
                            <span className="text-xl handwritten-bold transform rotate-0.5 text-red-600 falta-envido">
                              Falta Envido
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl handwritten-bold text-yellow-600">
                            {entrada.accion === '+' ? '+1' : '-1'}
                          </span>
                        )}
                      </div>
                      
                      {/* Separador visual */}
                      <div className="w-px h-8 bg-yellow-500 opacity-30"></div>
                      
                      {/* Jugador y puntos - Nivel 2 de jerarquía */}
                      <div className="flex-1">
                        <div className="text-lg handwritten-bold ink-blue organic-text transform -rotate-0.5 mb-1">
                          {entrada.equipo === 'nos' ? jugador1 : jugador2}
                        </div>
                        <div className="text-sm handwritten-normal ink-blue opacity-75">
                          {entrada.puntoAnterior} → {entrada.puntoNuevo} puntos
                        </div>
                      </div>
                    </div>
                    
                    {/* Detalles temporales - Nivel 3 de jerarquía */}
                    <div className="text-right flex-shrink-0 text-sm">
                      <div className="handwritten-normal ink-blue opacity-75 mb-1">
                        {entrada.hora.substring(0, 5)}
                      </div>
                      <div className="handwritten-light opacity-60 text-xs">
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
        onIniciarPartida={iniciarPartida}
        onContinuarPartida={() => setPantallaActual('juego')}
        haySavedGame={historial.length > 0 && !ganador}
        temaActual={temaActual}
        setTemaActual={setTemaActual}
      />
    );
  }
  
  return pantallaActual === 'historial' ? renderPantallaHistorial() : renderPantallaJuego();
};

export default AnotadorTruco;