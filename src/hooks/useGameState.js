// src/hooks/useGameState.js
import { useState, useEffect } from 'react';

export const useGameState = () => {
  const [puntosNos, setPuntosNos] = useState(0);
  const [puntosEllos, setPuntosEllos] = useState(0);
  const [ganador, setGanador] = useState(null);
  const [jugador1, setJugador1] = useState('Nosotros');
  const [jugador2, setJugador2] = useState('Ellos');
  const [partidaActual, setPartidaActual] = useState(null);
  const [puntosTotales, setPuntosTotales] = useState(30);
  const [historial, setHistorial] = useState([]);
  

  useEffect(() => {
    if (puntosNos >= puntosTotales) {
      setGanador('nos');
    } else if (puntosEllos >= puntosTotales) {
      setGanador('ellos');
    }
  }, [puntosNos, puntosEllos, puntosTotales]);

  const agregarAlHistorial = (equipo, accion, puntoAnterior, puntoNuevo) => {
    const ahora = new Date();
    const entrada = {
      id: Date.now(),
      equipo,
      accion,
      puntoAnterior,
      puntoNuevo,
      hora: ahora.toLocaleTimeString('es-AR', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }),
      timestamp: ahora
    };
    setHistorial(prev => [entrada, ...prev]);
  };

  const sumarPunto = (equipo) => {
    if (ganador) return;
    if (equipo === 'nos' && puntosNos < puntosTotales) {
      agregarAlHistorial(equipo, '+', puntosNos, puntosNos + 1);
      setPuntosNos(prev => prev + 1);
    } else if (equipo === 'ellos' && puntosEllos < puntosTotales) {
      agregarAlHistorial(equipo, '+', puntosEllos, puntosEllos + 1);
      setPuntosEllos(prev => prev + 1);
    }
  };

  const restarPunto = (equipo) => {
    if (ganador) return;
    if (equipo === 'nos' && puntosNos > 0) {
      agregarAlHistorial(equipo, '−', puntosNos, puntosNos - 1);
      setPuntosNos(prev => prev - 1);
    } else if (equipo === 'ellos' && puntosEllos > 0) {
      agregarAlHistorial(equipo, '−', puntosEllos, puntosEllos - 1);
      setPuntosEllos(prev => prev - 1);
    }
  };

  const faltaEnvido = (equipoGanador) => {
    if (ganador) return;
    
    let puntosAGanar;
    if (equipoGanador === 'nos') {
      // Si gana nosotros, sumamos los puntos que le faltan a ellos para llegar al total
      puntosAGanar = puntosTotales - puntosEllos;
      agregarAlHistorial(equipoGanador, 'Falta Envido', puntosNos, Math.min(puntosTotales, puntosNos + puntosAGanar));
      setPuntosNos(prev => Math.min(puntosTotales, prev + puntosAGanar));
    } else {
      // Si gana ellos, sumamos los puntos que nos faltan para llegar al total
      puntosAGanar = puntosTotales - puntosNos;
      agregarAlHistorial(equipoGanador, 'Falta Envido', puntosEllos, Math.min(puntosTotales, puntosEllos + puntosAGanar));
      setPuntosEllos(prev => Math.min(puntosTotales, prev + puntosAGanar));
    }
  };

  const nuevoPartido = (configuracion = null) => {
    setPuntosNos(0);
    setPuntosEllos(0);
    setGanador(null);
    setPartidaActual(null);
    setHistorial([]);
    
    if (configuracion) {
      setJugador1(configuracion.jugador1);
      setJugador2(configuracion.jugador2);
      setPuntosTotales(configuracion.puntosTotales);
    }
  };

  const restaurarPartida = (partidaGuardada) => {
    setPuntosNos(partidaGuardada.puntosNos);
    setPuntosEllos(partidaGuardada.puntosEllos);
    setJugador1(partidaGuardada.jugador1);
    setJugador2(partidaGuardada.jugador2);
    setPuntosTotales(partidaGuardada.puntosTotales);
    setHistorial(partidaGuardada.historial || []);
    setGanador(partidaGuardada.ganador || null);
  };

  const limpiarGanador = () => {
    setGanador(null);
  };

  return {
    puntosNos,
    puntosEllos,
    ganador,
    jugador1,
    jugador2,
    partidaActual,
    historial,
    puntosTotales,
    setJugador1,
    setJugador2,
    sumarPunto,
    restarPunto,
    nuevoPartido,
    restaurarPartida,
    faltaEnvido,
    limpiarGanador
  };
};