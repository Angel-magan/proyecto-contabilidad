import { useState } from "react";
import PropTypes from "prop-types";

import "../src/styles/AsientoForm.css";

const AsientoForm = ({ agregarAsiento }) => {
  const [fecha, setFecha] = useState("");
  const [cuentas, setCuentas] = useState([]);
  const [concepto, setConcepto] = useState("");
  const [tipo, setTipo] = useState("Debe");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("Activo");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const agregarCuenta = () => {
    if (concepto && monto && fecha) {
      if (monto < 0) {
        setModalMessage("No puede ingresar un monto negativo");
        setShowModal(true);
      } else {
        const nuevaCuenta = {
          concepto,
          tipo,
          monto: parseFloat(monto) || 0,
          categoria,
          fecha,
        };
        setCuentas([...cuentas, nuevaCuenta]);
        setConcepto("");
        setTipo("Debe");
        setMonto("");
        setCategoria("Activo");
        document.querySelector("ul").className =
          "p-3 mt-3 bg-cuentas bg-opacity-10 border-start-0 rounded-end";
      }
    } else {
      setModalMessage(
        "Debes agregar la fecha, escribir el concepto, monto y seleccionar la categoría antes de agregar la cuenta."
      );
      setShowModal(true);
    }
  };

  const cerrarAsiento = () => {
    const hayDebe = cuentas.some((cuenta) => cuenta.tipo === "Debe");
    const hayHaber = cuentas.some((cuenta) => cuenta.tipo === "Haber");

    if (!hayDebe || !hayHaber) {
      setModalMessage(
        "El asiento debe tener al menos una cuenta en el Debe y una en el Haber."
      );
      setShowModal(true);
      return;
    }

    if (cuentas.length > 0) {
      agregarAsiento({ fecha, cuentas });
      setFecha("");
      setCuentas([]);
      document.querySelector("ul").className = "";
    } else {
      setShowModal(
        "Debe agregar al menos una cuenta antes de cerrar el asiento."
      );
      setShowModal(true);
    }
  };

  return (
    <>
      <h1 className="titulo-principal">Simulador de Partida Doble</h1>
      <div className="info-solicitada p-5 container">
        <div>
          <div className="h4 pb-2 mb-4 border-bottom titulo">
            Agregar Asientos
          </div>
          <div className="row">
            <div className="col-md">
              <p>Seleccione la fecha:</p>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
                max={today}
              />
            </div>
            <div className="col-md">
              <p>Seleccione la cuenta principal:</p>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="Activo" className="p-5">
                  Activo
                </option>
                <option value="Pasivo">Pasivo</option>
                <option value="Capital Contable">Capital Contable</option>
                <option value="Ingreso">Ingreso</option>
                <option value="Costo">Costo</option>
                <option value="Gasto">Gasto</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <p>Ingrese nombre de la cuenta:</p>
              <input
                type="text"
                placeholder="Concepto"
                value={concepto}
                onChange={(e) => setConcepto(e.target.value)}
                required
              />
            </div>
            <div className="col-md">
              <p>Seleccione tipo de registro (Debe o Haber):</p>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="Debe">Debe</option>
                <option value="Haber">Haber</option>
              </select>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md">
              <p>Ingrese el monto:</p>
              <input
                type="number"
                placeholder="Monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                min="0"
                required
              />
            </div>
            <div className="col-md div-boton">
              <button
                className="boton boton-agregar"
                type="button"
                onClick={agregarCuenta}
              >
                Agregar Cuenta
              </button>
            </div>
          </div>
        </div>

        <ul>
          {cuentas.map((cuenta, index) => (
            <li key={index} className="fs-5">
              Fecha: {cuenta.fecha} <br /> {cuenta.concepto} ({cuenta.categoria}
              ) - {cuenta.tipo}: {cuenta.monto.toFixed(2)}
              <hr />
            </li>
          ))}
        </ul>

        <div className="div-boton2">
          <button
            className="boton boton-cerrar-asiento mt-3"
            type="button"
            onClick={cerrarAsiento}
          >
            Cerrar Asiento
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className="modal fade show"
            id="staticBackdrop"
            style={{ display: "block" }}
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-danger text-light">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Error
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">{modalMessage}</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Validación de PropTypes
AsientoForm.propTypes = {
  agregarAsiento: PropTypes.func.isRequired, // Especifica que agregarAsiento es requerido y es una función
};

export default AsientoForm;
