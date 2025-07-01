// src/hooks/useGamePersistence.js
import { useEffect } from 'react';

const STORAGE_KEY = 'anotador-truco-partida';

export const useGamePersistence = (gameState) => {
  // Guardar estado automáticamente cuando cambie
  useEffect(() => {
    if (gameState && gameState.puntosNos >= 0 && gameState.puntosEllos >= 0) {
      const partidaData = {
        puntosNos: gameState.puntosNos,
        puntosEllos: gameState.puntosEllos,
        jugador1: gameState.jugador1,
        jugador2: gameState.jugador2,
        puntosTotales: gameState.puntosTotales,
        historial: gameState.historial,
        timestamp: Date.now(),
        ganador: gameState.ganador
      };
      
      // Solo guardar si hay una partida en progreso (no terminada)
      if (!gameState.ganador && (gameState.puntosNos > 0 || gameState.puntosEllos > 0 || gameState.historial.length > 0)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(partidaData));
      }
    }
  }, [gameState]);

  // Funciones para manejar la persistencia
  const getSavedGame = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        // Verificar que los datos son válidos y la partida no es muy antigua (24 horas)
        const isRecent = Date.now() - data.timestamp < 24 * 60 * 60 * 1000;
        if (data.puntosNos >= 0 && data.puntosEllos >= 0 && isRecent && !data.ganador) {
          return data;
        }
      }
    } catch (error) {
      console.log('Error al cargar partida guardada:', error);
    }
    return null;
  };

  const clearSavedGame = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  const hasSavedGame = () => {
    return getSavedGame() !== null;
  };

  return {
    getSavedGame,
    clearSavedGame,
    hasSavedGame
  };
};