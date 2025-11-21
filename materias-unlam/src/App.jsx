import { useState, useEffect } from 'react';
// Asegúrate de importar 'materias' si usaste mi archivo anterior
import { materias } from './data/materias'; 

const App = () => {
  // Estado: { "03621": 2, "03628": 1, ... }
  const [progreso, setProgreso] = useState(() => {
    const guardado = localStorage.getItem('unlam-progreso');
    return guardado ? JSON.parse(guardado) : {};
  });

  useEffect(() => {
    localStorage.setItem('unlam-progreso', JSON.stringify(progreso));
  }, [progreso]);

  const toggleEstado = (id) => {
    setProgreso(prev => {
      const estadoActual = prev[id] || 0;
      // 0: Pendiente -> 1: Cursada -> 2: Aprobada -> 0: Pendiente
      const nuevoEstado = (estadoActual + 1) % 3;
      return { ...prev, [id]: nuevoEstado };
    });
  };

  const estaHabilitada = (materia) => {
    if (materia.correlativas.length === 0) return true;
    return materia.correlativas.every(corrId => {
      const estadoCorrelativa = progreso[corrId] || 0;
      // >= 1 significa que sirve si está "Cursada" o "Aprobada"
      return estadoCorrelativa >= 1; 
    });
  };

  // Definimos los años de la carrera
  const anios = [1, 2, 3, 4, 5, "Transversal"];

  return (
    <div className="bg-[#030712] min-h-screen p-8 text-white font-sans">
      <h1 className="text-3xl font-bold text-center mb-8">
        Plan de Estudios UNLaM
      </h1>

      {/* Primer Map: Recorremos los AÑOS */}
      {anios.map(anio => (
        <div key={anio} className="mb-12">
          
          {/* Título del Año */}
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
              {typeof anio === 'number' ? `Año ${anio}` : anio}
          </h2>

          {/* Grid de Materias de ese año */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Segundo Map: Filtramos las materias de este año específico */}
            {materias
              .filter(m => m.anio === anio) // <--- EL FILTRO CLAVE
              .map(materia => {
                const habilitada = estaHabilitada(materia);
                const estado = progreso[materia.id] || 0;

                // Colores dinámicos según estado
                let bordeColor = 'border-gray-700';
                if (estado === 1) bordeColor = 'border-yellow-500';
                if (estado === 2) bordeColor = 'border-green-500';

                return (
                  <div 
                    key={materia.id} 
                    className={`bg-[#1e1e1e] p-4 rounded-lg border-l-4 shadow-md flex flex-col justify-between transition-all
                      ${bordeColor} 
                      ${habilitada ? 'opacity-100' : 'opacity-60 grayscale'}
                    `}
                  >
                    <div className="mb-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg leading-tight">{materia.nombre}</h3>
                        <span className="text-xs text-white ml-2">{materia.id}</span>
                      </div>
                      
                      {/* Mostrar correlativas si faltan */}
                      {!habilitada && (
                        <p className="text-red-400 text-xs mt-2">
                          🔒 Requiere: {materia.correlativas.join(', ')}
                        </p>
                      )}
                    </div>

                    <button 
                      onClick={() => habilitada && toggleEstado(materia.id)}
                      disabled={!habilitada}
                      className={`w-full py-2 px-3 rounded font-medium text-sm transition-colors
                        ${estado === 0 ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : ''}
                        ${estado === 1 ? 'bg-yellow-600 hover:bg-yellow-500 text-white' : ''}
                        ${estado === 2 ? 'bg-green-600 hover:bg-green-500 text-white' : ''}
                        ${!habilitada ? 'cursor-not-allowed' : ''}
                      `}
                    >
                      {estado === 0 ? 'Pendiente' : estado === 1 ? 'Cursada' : 'Aprobada'}
                    </button>
                  </div>
                );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;