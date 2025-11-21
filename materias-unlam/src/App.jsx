import { useState, useEffect } from "react";
import { materias } from "./data/materias";
import Titulo from "./components/Titulo";
import Subtitulo from "./components/Subtitulo";
import InputLimitado from "./components/InputLimitado";

const App = () => {
  // Estado: { "03621": 2, "03628": 1, ... }
  // 0: Pendiente, 1: Cursada, 2: Aprobada
  const [progreso, setProgreso] = useState(() => {
    const guardado = localStorage.getItem("unlam-progreso");
    return guardado ? JSON.parse(guardado) : {};
  });

  // Estado de las NOTAS { "03628": 8, "03621": 9 }
  const [notas, setNotas] = useState(() => {
    const guardado = localStorage.getItem("unlam-notas");
    return guardado ? JSON.parse(guardado) : {};
  });

  // Guardamos ambos estados cuando cambian
  useEffect(() => {
    localStorage.setItem("unlam-progreso", JSON.stringify(progreso));
  }, [progreso]);

  useEffect(() => {
    localStorage.setItem("unlam-notas", JSON.stringify(notas));
  }, [notas]);

  // Función para que el Hijo pueda actualizar las notas
  const actualizarNota = (idMateria, nuevaNota) => {
    setNotas((prev) => ({
      ...prev,
      [idMateria]: nuevaNota,
    }));
  };

  const mapaNombres = materias.reduce((acc, materia) => {
    acc[materia.id] = materia.nombre;
    return acc;
  }, {});
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
  const totalMateriasCarrera = materias.length;
  const totalGeneralAprobadas = materias.filter(
    (m) => (progreso[m.id] || 0) === 2
  ).length;

  // CALCULAR PROMEDIO
  // 1. Filtramos solo las notas de materias que están APROBADAS (estado 2)
  // y que tengan una nota válida (distinta de vacío)
  const notasValidas = materias
    .filter((m) => (progreso[m.id] || 0) === 2 && notas[m.id])
    .map((m) => notas[m.id]);

  // 2. Sumamos todo (reduce)
  const sumaNotas = notasValidas.reduce(
    (acumulador, nota) => acumulador + nota,
    0
  );

  // 3. Dividimos por la cantidad
  const promedio =
    notasValidas.length > 0
      ? (sumaNotas / notasValidas.length).toFixed(2)
      : "0.00";

  return (
    <main className="min-h-screen p-8 font-sans">
      <Titulo
        texto="Plan de Estudios UNLaM"
        clases="text-3xl font-bold text-center mb-8"
      />
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
                <Titulo
                  texto={typeof anio === "number" ? `Año ${anio}` : anio}
                  clases="text-2xl font-bold text-white flex items-center gap-3"
                />

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
                      ${habilitada ? "opacity-100" : "opacity-50"}
                    `}
                  >
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <Subtitulo
                          texto={materia.nombre}
                          clases="font-semibold text-lg leading-snug text-gray-100"
                        />
                        <p className="text-xs text-white">{materia.id}</p>
                      </div>

                      {habilitada && estado != 0 && estado != 1 && (
                        <div className="flex items-center gap-2">
                          <p className="text-white text-sm font-medium">
                            Nota:
                          </p>
                          <InputLimitado
                            nota={notas[materia.id] || ""}
                            alCambiar={(n) => actualizarNota(materia.id, n)}
                          />
                        </div>
                      )}

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-between gap-4">
        <Subtitulo
          texto={`Total de materias: ${totalMateriasCarrera}`}
          clases="text-2xl font-bold bg-gray-800 p-3 rounded-lg text-center border-l-4 border-green-600 text-white"
        />
        <Subtitulo
          texto={`Total de materias aprobadas: ${totalGeneralAprobadas}`}
          clases="text-2xl font-bold bg-gray-800 p-3 rounded-lg text-center border-l-4 border-green-600 text-white"
        />
        <Subtitulo
          texto={`Materias restantes: ${
            totalMateriasCarrera - totalGeneralAprobadas
          }`}
          clases="text-2xl font-bold bg-gray-800 p-3 rounded-lg text-center border-l-4 border-green-600 text-white"
        />
        <Subtitulo
          texto={`Porcentaje de la carrera: ${(
            (totalGeneralAprobadas * 100) /
            totalMateriasCarrera
          ).toFixed(2)}%`}
          clases="text-2xl font-bold bg-gray-800 p-3 rounded-lg text-center border-l-4 border-green-600 text-white"
        />
        <Subtitulo
          texto={`Promedio (Grado): ${promedio}`}
          clases="md:col-span-2 text-2xl font-bold bg-gray-800 p-3 rounded-lg text-center border-l-4 border-green-600 text-white"
        />
      </div>
    </main>
  );
};

export default App;
