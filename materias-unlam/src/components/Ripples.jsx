import React from "react";
import "../Ripples.css";

const Ripples = () => {
  // Configuración: número de ondas
  const rippleCount = 5;

  // Generamos un array vacio para mapearlo
  const ripplesArray = [...Array(rippleCount)];

  return (
    <div className="ripple-container">
      {ripplesArray.map((_, index) => (
        <div
          key={index}
          className="ripple-circle"
          style={{
            // Calculamos el retraso dinámicamente.
            // Si la animación dura 6s y hay 5 ondas: 6/5 = 1.2s de diferencia entre cada una
            animationDelay: `${index * 1.2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Ripples;
