// src/data/materias.js

export const materias = [
  // --- PRIMER AÑO ---
  { id: "03621", nombre: "Matemática Discreta", anio: 1, correlativas: [] },
  { id: "03622", nombre: "Análisis Matemático I", anio: 1, correlativas: [] },
  { id: "03623", nombre: "Programación Inicial", anio: 1, correlativas: [] },
  { id: "03624", nombre: "Introducción a los Sistemas de Información", anio: 1, correlativas: [] },
  { id: "03625", nombre: "Sistemas de Numeración", anio: 1, correlativas: [] },
  { id: "03626", nombre: "Principios de Calidad de Software", anio: 1, correlativas: [] },
  { id: "03627", nombre: "Álgebra y Geometría Analítica I", anio: 1, correlativas: [] },
  { id: "03628", nombre: "Física I", anio: 1, correlativas: ["03622"] },
  { id: "03629", nombre: "Programación Estructurada Básica", anio: 1, correlativas: ["03623"] },
  { id: "03630", nombre: "Introducción a la Gestión de Requisitos", anio: 1, correlativas: ["03624"] },
  { id: "03631", nombre: "Fundamentos de Sistemas Embebidos", anio: 1, correlativas: ["03625"] },
  { id: "03632", nombre: "Introducción a los Proyectos Informáticos", anio: 1, correlativas: [] },

  // --- SEGUNDO AÑO ---
  
  { id: "03633", nombre: "Análisis Matemático II", anio: 2, correlativas: ["03622"] },
  { id: "03634", nombre: "Física II", anio: 2, correlativas: ["03628"] },
  { id: "03635", nombre: "Tópicos de Programación", anio: 2, correlativas: ["03621", "03629"] },
  { id: "03636", nombre: "Bases de Datos", anio: 2, correlativas: ["03621", "03629"] },
  { id: "03637", nombre: "Análisis de Sistemas", anio: 2, correlativas: ["03630"] },
  { id: "03638", nombre: "Arquitectura de Computadoras", anio: 2, correlativas: ["03631"] },
  { id: "03676", nombre: "Responsabilidad Social Universitaria", anio: 2, correlativas: ["03626"] },
  { id: "03639", nombre: "Análisis Matemático III", anio: 2, correlativas: ["03633"] },
  { id: "03640", nombre: "Algoritmos y Estructuras de Datos", anio: 2, correlativas: ["03635"] },
  { id: "03641", nombre: "Bases de Datos Aplicadas", anio: 2, correlativas: ["03636"] },
  { id: "03642", nombre: "Principios de Diseño de Sistemas", anio: 2, correlativas: ["03626", "03637"] },
  { id: "03643", nombre: "Redes de Computadoras", anio: 2, correlativas: ["03634", "03638"] },
  { id: "03644", nombre: "Gestión de las Organizaciones", anio: 2, correlativas: ["03632"] },
  
  // Materia especial de integración (tiene muchas correlativas según el plan)
  { 
    id: "03680", 
    nombre: "Taller de Integración", 
    anio: 2, 
    correlativas: ["03621","03623","03624","03625","03626","03630","03632","03635","03636","03638"] 
  },

  // --- TERCER AÑO ---
  // { id: "00904", nombre: "Inglés Nivel IV", anio: 3, correlativas: ["00903"] },
  { id: "03645", nombre: "Álgebra y Geometría Analítica II", anio: 3, correlativas: ["03627"] },
  { id: "03646", nombre: "Paradigmas de Programación", anio: 3, correlativas: ["03633", "03640"] },
  { id: "03647", nombre: "Requisitos Avanzados", anio: 3, correlativas: ["03642"] },
  { id: "03648", nombre: "Diseño de Software", anio: 3, correlativas: ["03636", "03642"] },
  { id: "03649", nombre: "Sistemas Operativos", anio: 3, correlativas: ["03638"] },
  { id: "03650", nombre: "Seguridad de la Información", anio: 3, correlativas: ["03635", "03638", "03643"] },
  { id: "03675", nombre: "Práctica Profesional Supervisada", anio: 3, correlativas: ["03642"] },
  { id: "03651", nombre: "Probabilidad y Estadística", anio: 3, correlativas: ["03621", "03639", "03645"] },
  { id: "03652", nombre: "Programación Avanzada", anio: 3, correlativas: ["03646", "03641"] },
  { id: "03653", nombre: "Arquitectura de Sistemas Software", anio: 3, correlativas: ["03648"] },
  { id: "03654", nombre: "Virtualización de Hardware", anio: 3, correlativas: ["03640", "03645", "03649"] },
  { id: "03655", nombre: "Auditoría y Legislación", anio: 3, correlativas: ["03650"] },

  // --- CUARTO AÑO ---
  { id: "03656", nombre: "Estadística Aplicada", anio: 4, correlativas: ["03641", "03651"] },
  { id: "03657", nombre: "Autómatas y Gramáticas", anio: 4, correlativas: ["03646"] },
  { id: "03658", nombre: "Programación Concurrente", anio: 4, correlativas: ["03646", "03654"] },
  { id: "03659", nombre: "Gestión Aplicada al Desarrollo de Software I", anio: 4, correlativas: ["03644", "03647", "03653"] },
  { id: "03660", nombre: "Sistemas Operativos Avanzados", anio: 4, correlativas: ["03654"] },
  { id: "03661", nombre: "Gestión de Proyectos", anio: 4, correlativas: ["03644", "03650", "03651"] },
  { id: "03662", nombre: "Matemática Aplicada", anio: 4, correlativas: ["03651"] },
  { id: "03663", nombre: "Lenguajes y Compiladores", anio: 4, correlativas: ["03657"] },
  { id: "03664", nombre: "Inteligencia Artificial", anio: 4, correlativas: ["03646", "03651"] },
  { id: "03665", nombre: "Gestión Aplicada al Desarrollo de Software II", anio: 4, correlativas: ["03652", "03659"] },
  { id: "03666", nombre: "Seguridad Aplicada y Forensia", anio: 4, correlativas: ["03649", "03652", "03655"] },
  { id: "03667", nombre: "Gestión de la Calidad en Procesos de Sistemas", anio: 4, correlativas: ["03647"] },

  // --- QUINTO AÑO ---
  { id: "03668", nombre: "Inteligencia Artificial Aplicada", anio: 5, correlativas: ["03656", "03664"] },
  { id: "03669", nombre: "Innovación y Emprendedorismo", anio: 5, correlativas: ["03661"] },
  { id: "03670", nombre: "Ciencia de Datos", anio: 5, correlativas: ["03656", "03664"] },
  { id: "03672", nombre: "Electiva I", anio: 5, correlativas: [] }, 
  { id: "03673", nombre: "Electiva II", anio: 5, correlativas: [] },
  { id: "03674", nombre: "Electiva III", anio: 5, correlativas: [] },
  { 
    id: "03671", 
    nombre: "Proyecto Final de Carrera", 
    anio: 5, 
    correlativas: ["03656", "03659", "03660", "03661", "03667"]
  },

  // --- TRANSVERSALES ---
  { id: "00911", nombre: "Computación Nivel I", anio: "Transversal", correlativas: [] },
  { id: "00912", nombre: "Computación Nivel II", anio: "Transversal", correlativas: ["00911"] },
  { id: "00901", nombre: "Inglés Nivel I", anio: "Transversal", correlativas: [] },  
  { id: "00902", nombre: "Inglés Nivel II", anio: "Transversal", correlativas: ["00901"] },  
  { id: "00903", nombre: "Inglés Nivel III", anio: "Transversal", correlativas: ["00902"] },
  { id: "00904", nombre: "Inglés Nivel IV", anio: "Transversal", correlativas: ["00903"] }
];


