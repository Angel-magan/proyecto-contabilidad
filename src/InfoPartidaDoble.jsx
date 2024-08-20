import { Link } from "react-router-dom";

import "../src/styles/InfoPartidaDoble.css";

const InfoPartidaDoble = () => {
  return (
    <>
      <div className="info-container p-5 mb-5 container">
        <h2 className="info-title mb-5">
          Conoce lo más importante acerca de la Partida Doble
        </h2>

        <section className="info-section">
          <h3>¿Qué es la Partida Doble?</h3>
          <p>
            La partida doble es un principio fundamental en la contabilidad que
            establece que cada transacción afecta al menos dos cuentas: una de
            entrada o salida de recursos y otra de financiación. Esto garantiza
            que el balance general de la empresa siempre esté en equilibrio.
          </p>
        </section>

        <section className="info-section">
          <h3>¿Cómo utilizar el Simulador?</h3>
          <ol>
            <li>
              <strong>Agregar Fecha:</strong> Selecciona la fecha en la que se
              realiza la transacción.
            </li>
            <li>
              <strong>Seleccionar Categoría:</strong> Elige la cuenta principal
              de la transacción, como Activo, Pasivo, Capital Contable, etc.
            </li>
            <li>
              <strong>Ingresar Concepto:</strong> Escribe una breve descripción
              de la transacción.
            </li>
            <li>
              <strong>Seleccionar Tipo:</strong> Indica si el registro va en el
              Debe o en el Haber.
            </li>
            <li>
              <strong>Ingresar Monto:</strong> Especifica el monto de la
              transacción.
            </li>
            <li>
              <strong>Agregar Cuenta:</strong> Haz clic en --Agregar Cuenta--
              para incluir la cuenta en el asiento.
            </li>
            <li>
              <strong>Cerrar Asiento:</strong> Una vez que todas las cuentas
              estén agregadas y equilibradas, haz clic en --Cerrar Asiento--.
            </li>
          </ol>
        </section>

        <section className="info-section">
          <h3>Ejemplo Básico de Partida Doble</h3>
          <p>Si compras una laptop por $580 con cheque:</p>
          <ul>
            <li>
              <strong>Debe:</strong> Banco $580
            </li>
            <li>
              <strong>Debe:</strong> IVA crédito fiscal $75.4
            </li>
            <li>
              <strong>Haber:</strong> Equipo de cómputo $655.4 (el precio + iva)
            </li>
          </ul>
          <p>
            En este caso, estás aumentando tus activos (Equipo de cómputo) y
            disminuyendo tu efectivo (Caja).
          </p>
        </section>

        <h3>¡Prueba nuestro simulador!</h3>
        <Link to="/simulador" className="boton">
          Probar simulador
        </Link>
      </div>
    </>
  );
};

export default InfoPartidaDoble;
