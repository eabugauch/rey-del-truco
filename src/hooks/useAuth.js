// src/hooks/useAuth.js
import { useState } from 'react';

export const useAuth = () => {
  const [usuario, setUsuario] = useState(null);

  const iniciarSesion = (nombre) => {
    const nuevoUsuario = {
      id: Date.now(),
      nombre: nombre,
      email: `${nombre.toLowerCase().replace(' ', '')}@gmail.com`,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&background=1e40af&color=fff`
    };
    setUsuario(nuevoUsuario);
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  return {
    usuario,
    iniciarSesion,
    cerrarSesion
  };
};