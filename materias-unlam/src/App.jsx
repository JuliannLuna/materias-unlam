import { useState, useEffect } from "react";
// Asegúrate de que la ruta sea correcta según donde guardaste el archivo
import { materias } from "./data/materias";

const App = () => {
  // Estado: { "03621": 2, "03628": 1, ... }
  // 0: Pendiente, 1: Cursada, 2: Aprobada
  const [progreso, setProgreso] = useState(() => {
    const guardado = localStorage.getItem("unlam-progreso");
    return guardado ? JSON.parse(guardado) : {};
  });

  // Mapa de nombres para buscar rápido por ID
  const mapaNombres = materias.reduce((acc, materia) => {
    acc[materia.id] = materia.nombre;
    return acc;
  }, {});

  useEffect(() => {
    localStorage.setItem("unlam-progreso", JSON.stringify(progreso));
  }, [progreso]);

  const toggleEstado = (id) => {
    setProgreso((prev) => {
      const estadoActual = prev[id] || 0;
      const nuevoEstado = (estadoActual + 1) % 3;
      return { ...prev, [id]: nuevoEstado };
    });
  };

  const estaHabilitada = (materia) => {
    if (materia.correlativas.length === 0) return true;
    return materia.correlativas.every((corrId) => {
      const estadoCorrelativa = progreso[corrId] || 0;
      return estadoCorrelativa >= 1;
    });
  };

  // Definimos los años de la carrera
  const anios = [1, 2, 3, 4, 5, "Transversal"];

  return (
    <div className="bg-[#030712] min-h-screen p-8 text-white font-sans">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
        Plan de Estudios UNLaM
      </h1>

      {/* Recorremos los AÑOS */}
      {anios.map((anio) => {
        // 1. FILTRAR las materias de este año
        const materiasDelAnio = materias.filter((m) => m.anio === anio);

        // 2. CONTAR TOTAL
        const totalMaterias = materiasDelAnio.length;

        // 3. CONTAR APROBADAS (estado === 2)
        const aprobadas = materiasDelAnio.filter(
          (m) => (progreso[m.id] || 0) === 2
        ).length;

        // --- AQUÍ ESTABA EL ERROR: Faltaba el 'return' ---
        return (
          <div key={anio} className="mb-12">
            {/* Cabecera del Año con Barra de Progreso */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2 border-b border-gray-800 pb-2">
                {/* Título del Año + Contador */}
                <h2 className="text-2xl font-bold text-grey-100 flex items-center gap-3">
                  {typeof anio === "number" ? `Año ${anio}` : anio}
                </h2>
                {/* Badge con el contador (Ej: 4/12) */}
                <span className="text-sm bg-gray-800 text-gray-100 px-3 py-1 rounded-full font-mono">
                  {aprobadas} / {totalMaterias} Aprobadas
                </span>
              </div>
            </div>

            {/* Grid de Materias */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {materiasDelAnio.map((materia) => {
                const habilitada = estaHabilitada(materia);
                const estado = progreso[materia.id] || 0;

                // Colores dinámicos del borde
                let bordeColor = "border-gray-700";
                if (estado === 1) bordeColor = "border-yellow-500";
                if (estado === 2) bordeColor = "border-green-500";

                return (
                  <div
                    key={materia.id}
                    className={`bg-[#1e1e1e] p-4 rounded-lg border-l-4 shadow-lg flex flex-col justify-between transition-all hover:bg-[#252525]
                      ${bordeColor} 
                      ${habilitada ? "opacity-100" : "opacity-50 grayscale"}
                    `}
                  >
                    <div className="mb-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg leading-snug text-gray-100">
                          {materia.nombre}
                        </h3>
                        <p className="text-xs text-white">{materia.id}</p>
                      </div>

                      {/* Lógica para mostrar nombres de correlativas */}
                      {!habilitada && (
                        <p className="text-red-400 text-xs mt-2 font-medium">
                          🔒 Requiere:{" "}
                          {materia.correlativas
                            .map((id) => mapaNombres[id] || id)
                            .join(", ")}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => habilitada && toggleEstado(materia.id)}
                      disabled={!habilitada}
                      className={`w-full py-2 px-3 rounded font-bold text-sm transition-all transform active:scale-95
                        ${
                          estado === 0
                            ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                            : ""
                        }
                        ${
                          estado === 1
                            ? "bg-yellow-600 hover:bg-yellow-500 text-white shadow-[0_0_10px_rgba(202,138,4,0.3)]"
                            : ""
                        }
                        ${
                          estado === 2
                            ? "bg-green-600 hover:bg-green-500 text-white shadow-[0_0_10px_rgba(22,163,74,0.3)]"
                            : ""
                        }
                        ${!habilitada ? "cursor-not-allowed opacity-50" : ""}
                      `}
                    >
                      {!habilitada
                        ? "Bloqueado"
                        : estado === 0
                        ? "Pendiente"
                        : estado === 1
                        ? "Cursada"
                        : "Aprobada"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
