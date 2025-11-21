const InputLimitado = ({ nota, alCambiar }) => {
  const manejarCambio = (e) => {
    const valor = e.target.value;

    if (valor === "") {
      alCambiar("");
      return;
    }

    const numeroEntero = parseInt(valor);

    if (!isNaN(numeroEntero) && numeroEntero >= 1 && numeroEntero <= 10) {
      alCambiar(numeroEntero);
    }
  };

  return (
    <input
      type="number" // Teclado numérico en celular
      value={nota} // Input controlado por :) React
      onChange={manejarCambio}
      placeholder="Ej: 5"
      className="pl-2 text-white border border-white rounded-lg border-1 focus:ring-brand focus:outline"
    />
  );
};

export default InputLimitado;
