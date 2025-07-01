// src/components/ScoreDisplay.jsx

const ScoreDisplay = ({ puntos, puntosTotales = 30 }) => {
  
  const renderCuadradito = (puntosEnCuadradito, key) => {
    if (puntosEnCuadradito === 0) {
      return <div key={key} className="w-11 h-11 md:w-13 md:h-13"></div>;
    }

    const esCompleto = puntosEnCuadradito === 5;
    const alArco = puntos === puntosTotales - 1;
    
    // Colores por tema - USANDO VARIABLES CSS UNIFICADAS
    let colorLinea, strokeWidth;
    if (alArco) {
      colorLinea = "var(--current-ink-accent)";
      strokeWidth = "3.5";
    } else {
      colorLinea = "var(--current-ink-color)";
      strokeWidth = "3";
    }
    
    const containerClass = alArco 
      ? "w-11 h-11 md:w-13 md:h-13 animate-pulse drop-shadow-lg" 
      : "w-11 h-11 md:w-13 md:h-13";
    
    return (
      <div key={key} className={containerClass}>
        <svg width="44" height="44" viewBox="0 0 64 64" className="w-11 h-11 md:w-13 md:h-13">
          <defs>
            <filter id="roughPaper">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" result="noise" seed="1" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            </filter>
          </defs>
          {puntosEnCuadradito >= 1 && (
            <path d="M7,9 Q6,14 7,19 T6,28 Q7,33 6,38 T7,47 Q6,52 7,54" 
                  stroke={colorLinea} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" 
                  opacity="0.95" filter="url(#roughPaper)" />
          )}
          {puntosEnCuadradito >= 2 && (
            <path d="M7,7 Q14,6 19,7 T28,6 Q33,7 38,6 T47,7 Q52,6 54,7" 
                  stroke={colorLinea} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" 
                  opacity="0.95" filter="url(#roughPaper)" />
          )}
          {puntosEnCuadradito >= 3 && (
            <path d="M54,7 Q53,14 54,19 T53,28 Q54,33 53,38 T54,47 Q53,52 54,54" 
                  stroke={colorLinea} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" 
                  opacity="0.95" filter="url(#roughPaper)" />
          )}
          {puntosEnCuadradito >= 4 && (
            <path d="M54,54 Q47,53 38,54 T28,53 Q23,54 19,53 T9,54 Q7,53 7,54" 
                  stroke={colorLinea} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" 
                  opacity="0.95" filter="url(#roughPaper)" />
          )}
          {esCompleto && (
            <path d="M12,12 Q21,19 28,28 Q35,37 44,44" 
                  stroke={colorLinea} strokeWidth={strokeWidth} strokeLinecap="round" 
                  opacity="0.95" filter="url(#roughPaper)" />
          )}
        </svg>
      </div>
    );
  };

  const renderRayitasManual = () => {
    const mitadPuntos = Math.floor(puntosTotales / 2);
    const puntosBuenas = Math.min(puntos, mitadPuntos);
    const puntosMalas = Math.max(0, puntos - mitadPuntos);

    const cuadraditosBuenasCompletos = Math.floor(puntosBuenas / 5);
    const puntosSueltosBuenas = puntosBuenas % 5;

    const cuadraditosMalasCompletos = Math.floor(puntosMalas / 5);
    const puntosSueltosMalas = puntosMalas % 5;

    const renderSeccion = (cuadradosCompletos, puntosSueltos, maxCuadrados) => {
      const elementos = [];
      
      for (let i = 0; i < maxCuadrados; i++) {
        if (i < cuadradosCompletos) {
          elementos.push(renderCuadradito(5, `completo-${i}`));
        } else if (i === cuadradosCompletos && puntosSueltos > 0) {
          elementos.push(renderCuadradito(puntosSueltos, `parcial-${i}`));
        } else {
          elementos.push(<div key={`vacio-${i}`} className="w-11 h-11 md:w-13 md:h-13"></div>);
        }
      }
      
      return elementos;
    };

    return (
      <div className="relative flex flex-col items-center h-full py-2">
        {/* Sección buenas (arriba) */}
        <div className="flex flex-col items-center space-y-0.5 mb-2">
          {renderSeccion(cuadraditosBuenasCompletos, puntosSueltosBuenas, 3)}
        </div>
        
        {/* Línea divisoria */}
        <div className="w-18 my-2 md:w-22 md:my-2">
          <svg width="100%" height="7" viewBox="0 0 96 7" className="w-full">
            <defs>
              <filter id="roughLine">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" result="noise" seed="2" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
              </filter>
            </defs>
            <path 
              d="M3,3.5 Q12,2.5 24,3.5 T48,2.5 Q60,3.5 72,2.5 T93,3.5" 
              stroke={
                puntos === puntosTotales - 1 
                  ? "var(--current-ink-accent)" 
                  : "var(--current-ink-color)"
              }
              strokeWidth={puntos === puntosTotales - 1 ? "3.5" : "3"}
              fill="none" 
              strokeLinecap="round" 
              opacity="0.95"
              filter="url(#roughLine)"
            />
          </svg>
        </div>
        
        {/* Sección malas (abajo) */}
        <div className="flex flex-col items-center space-y-0.5 mt-2">
          {renderSeccion(cuadraditosMalasCompletos, puntosSueltosMalas, 3)}
        </div>
        
        {/* Indicador "AL VERDE" - ÉPICO Y DRAMÁTICO - ALTURA FIJA */}
        <div className="h-8 flex items-center justify-center mt-2">
          {puntos === puntosTotales - 1 && (
            <span className="text-sm ink-green-dramatic animate-pulse animate-bounce transform rotate-1 handwritten-bold organic-text drop-shadow-lg">
              ¡AL VERDE!
            </span>
          )}
        </div>
      </div>
    );
  };

  return renderRayitasManual();
};

export default ScoreDisplay;