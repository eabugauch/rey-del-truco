// src/components/PantallaInicio.jsx
import { useState } from 'react';

const PantallaInicio = ({ onIniciarPartida, onContinuarPartida, haySavedGame, temaActual, setTemaActual }) => {
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
    <div className="animate-scaleIn">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">⚡</div>
        <h2 className="text-3xl handwritten-natural ink-blue mb-4 transform rotate-1">
          Inicio Rápido
        </h2>
        <p className="text-lg handwritten-normal ink-blue opacity-80">
          Partida tradicional a 30 puntos
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-blue-200/30">
          <div className="flex justify-between items-center">
            <span className="handwritten-bold ink-blue">Jugadores:</span>
            <span className="handwritten-normal">Nosotros vs Ellos</span>
          </div>
        </div>
        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-blue-200/30">
          <div className="flex justify-between items-center">
            <span className="handwritten-bold ink-blue">Puntos:</span>
            <span className="handwritten-normal">30 puntos</span>
          </div>
        </div>
        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-blue-200/30">
          <div className="flex justify-between items-center">
            <span className="handwritten-bold ink-blue">Malas:</span>
            <span className="handwritten-normal">0-15 puntos</span>
          </div>
        </div>
        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-blue-200/30">
          <div className="flex justify-between items-center">
            <span className="handwritten-bold ink-blue">Buenas:</span>
            <span className="handwritten-normal">16-30 puntos</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setModoSeleccionado(null)}
          className="flex-1 py-3 px-4 rounded-lg transition-all duration-150 transform -rotate-0.5 handwritten-bold organic-button touch-manipulation"
          style={{
            backgroundColor: '#5D4037',
            color: 'white',
            fontWeight: '600',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            border: '1px solid #5D4037'
          }}
        >
          ← Volver
        </button>
        <button
          onClick={iniciarRapido}
          className="flex-2 py-3 px-6 rounded-lg transition-all duration-150 transform rotate-0.5 handwritten-bold organic-button touch-manipulation"
          style={{
            backgroundColor: '#FF6B35',
            color: 'white',
            fontWeight: '600',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            border: '1px solid #FF6B35'
          }}
        >
          ¡A Jugar! 🎮
        </button>
      </div>
    </div>
  );

  const renderModoPersonalizado = () => (
    <div className="animate-scaleIn">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">⚙️</div>
        <h2 className="text-3xl handwritten-natural ink-blue mb-4 transform -rotate-1">
          Modo Personalizado
        </h2>
        <p className="text-lg handwritten-normal ink-blue opacity-80">
          Configurá tu partida ideal
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {/* Nombres de jugadores */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-base font-bold handwritten-bold ink-blue transform rotate-0.5 flex-shrink-0 w-20">
              Jugador 1
            </label>
            <input
              type="text"
              value={configuracion.jugador1}
              onChange={(e) => setConfiguracion({...configuracion, jugador1: e.target.value})}
              className="flex-1 text-lg handwritten-input handwritten-normal ink-blue bg-transparent border-none border-b-2 border-blue-300 focus:border-blue-500 outline-none py-2 px-1 transform rotate-0.5"
              maxLength={15}
              placeholder="Nosotros"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-base font-bold handwritten-bold ink-blue transform -rotate-0.5 flex-shrink-0 w-20">
              Jugador 2
            </label>
            <input
              type="text"
              value={configuracion.jugador2}
              onChange={(e) => setConfiguracion({...configuracion, jugador2: e.target.value})}
              className="flex-1 text-lg handwritten-input handwritten-normal ink-blue bg-transparent border-none border-b-2 border-blue-300 focus:border-blue-500 outline-none py-2 px-1 transform -rotate-0.5"
              maxLength={15}
              placeholder="Ellos"
            />
          </div>
        </div>

        {/* Puntos totales */}
        <div>
          <label className="block text-sm font-bold handwritten-bold ink-blue mb-3 transform rotate-0.5">
            Puntos de la partida:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[16, 24, 30].map(puntos => (
              <button
                key={puntos}
                onClick={() => setConfiguracion({...configuracion, puntosTotales: puntos})}
                className={`py-3 px-4 rounded-lg transition-all duration-150 transform handwritten-bold organic-button touch-manipulation ${
                  configuracion.puntosTotales === puntos
                    ? 'scale-105 rotate-1'
                    : 'bg-white/30 hover:bg-white/40 ink-blue rotate-0.5'
                }`}
                style={configuracion.puntosTotales === puntos ? {
                  backgroundColor: '#FF6B35',
                  color: 'white',
                  fontWeight: '600',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                  border: '1px solid #FF6B35'
                } : {}}
              >
                <div className="text-lg">{puntos}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setModoSeleccionado(null)}
          className="flex-1 py-3 px-4 rounded-lg transition-all duration-150 transform -rotate-0.5 handwritten-bold organic-button touch-manipulation"
          style={{
            backgroundColor: '#5D4037',
            color: 'white',
            fontWeight: '600',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            border: '1px solid #5D4037'
          }}
        >
          ← Volver
        </button>
        <button
          onClick={iniciarPersonalizado}
          className="flex-2 py-3 px-6 rounded-lg transition-all duration-150 transform rotate-0.5 handwritten-bold organic-button touch-manipulation"
          style={{
            backgroundColor: '#FF6B35',
            color: 'white',
            fontWeight: '600',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            border: '1px solid #FF6B35'
          }}
        >
          Iniciar Partida 🚀
        </button>
      </div>
    </div>
  );

  const renderMenuPrincipal = () => (
    <div className="animate-fadeIn">
      {/* Header con título y tema */}
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl handwritten-title ink-blue mb-2 transform -rotate-1 animate-float title-hero">
          Anotador de Truco
        </h1>
        <p className="text-lg handwritten-normal ink-blue opacity-80 transform rotate-0.5">
          El mejor contador de puntos digital
        </p>
      </div>

      {/* Toggle de tema discreto - esquina superior derecha */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => {
            const temas = ['calido', 'oscuro'];
            const indiceActual = temas.indexOf(temaActual);
            const siguienteTema = temas[(indiceActual + 1) % temas.length];
            setTemaActual(siguienteTema);
          }}
          className="w-10 h-10 bg-white/15 hover:bg-white/25 active:bg-white/35 backdrop-blur-md border border-white/20 text-lg rounded-full transition-all duration-200 organic-button touch-manipulation flex items-center justify-center opacity-70 hover:opacity-100"
          title={`Cambiar tema (actual: ${temaActual})`}
        >
          {temaActual === 'calido' ? '🌅' : '🌙'}
        </button>
      </div>


      {/* Botón Continuar Partida (solo si hay partida guardada) */}
      {haySavedGame && (
        <div className="mb-6">
          <button
            onClick={onContinuarPartida}
            className="w-full py-4 px-6 rounded-xl text-xl transition-all duration-150 transform rotate-0.5 handwritten-bold organic-button touch-manipulation shadow-lg animate-pulse"
            style={{
              backgroundColor: '#FF6B35',
              color: 'white',
              fontWeight: '600',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
              border: '1px solid #FF6B35'
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">🔄</span>
              <div>
                <div>Continuar Partida</div>
                <div className="text-sm opacity-80">Retomar juego guardado</div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Botones principales */}
      <div className="space-y-4">
        <button
          onClick={() => setModoSeleccionado('rapido')}
          className="w-full py-4 px-6 rounded-xl text-xl transition-all duration-150 transform rotate-0.5 handwritten-bold organic-button touch-manipulation shadow-lg"
          style={{
            backgroundColor: '#FF6B35',
            color: 'white',
            fontWeight: '600',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            border: '1px solid #FF6B35'
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <div>Inicio Rápido</div>
              <div className="text-sm opacity-80">Partida tradicional a 30</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setModoSeleccionado('personalizado')}
          className="w-full py-4 px-6 rounded-xl text-xl transition-all duration-150 transform -rotate-0.5 handwritten-bold organic-button touch-manipulation shadow-lg"
          style={{
            backgroundColor: '#5D4037',
            color: 'white',
            fontWeight: '600',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            border: '1px solid #5D4037'
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">⚙️</span>
            <div>
              <div>Modo Personalizado</div>
              <div className="text-sm opacity-80">Configurá nombres y puntos</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className={`mobile-viewport notebook-background paper-texture flex items-center justify-center p-4 theme-${temaActual}`}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-blue-200 p-8 max-w-md w-full card-floating relative">
        {modoSeleccionado === 'rapido' && renderModoRapido()}
        {modoSeleccionado === 'personalizado' && renderModoPersonalizado()}
        {!modoSeleccionado && renderMenuPrincipal()}
      </div>

    </div>
  );
};

export default PantallaInicio;