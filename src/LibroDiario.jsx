import PropTypes from "prop-types";

import "../src/styles/LibroDiario.css";

const LibroDiario = ({ asientos }) => {
  return (
    <>
      <div className="contenedor mt-5 mb-5 p-5 container">
        <div className="h4 pb-2 mb-4 border-bottom titulo2">Libro Diario</div>
        {asientos.map((asiento, index) => {
          const totalDebe = asiento.cuentas
            .filter((cuenta) => cuenta.tipo === "Debe")
            .reduce((sum, cuenta) => sum + cuenta.monto, 0);

          const totalHaber = asiento.cuentas
            .filter((cuenta) => cuenta.tipo === "Haber")
            .reduce((sum, cuenta) => sum + cuenta.monto, 0);

          const comprobacion = totalDebe === totalHaber;

          return (
            <div key={index}>
              <h3 className="text-light">Asiento {index + 1}</h3>
              <div className="table-responsive">
                <table className="table table-striped table-hover fs-5 table-sm table-bordered text-center">
                  <thead className="bg-primary">
                    <tr className="table-dark">
                      <th>Fecha</th>
                      <th>Concepto</th>
                      <th>Debe</th>
                      <th>Haber</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {asiento.cuentas.map((cuenta, i) => (
                      <tr key={i}>
                        <td>{i === 0 ? asiento.fecha : ""}</td>
                        <td>{cuenta.concepto}</td>
                        <td>
                          {cuenta.tipo === "Debe"
                            ? "$" + cuenta.monto.toFixed(2)
                            : ""}
                        </td>
                        <td>
                          {cuenta.tipo === "Haber"
                            ? "$" + cuenta.monto.toFixed(2)
                            : ""}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2">
                        <strong>Total</strong>
                      </td>
                      <td className="table-active table-secondary border">
                        <strong>${totalDebe.toFixed(2)}</strong>
                      </td>
                      <td className="table-active table-secondary border">
                        <strong>${totalHaber.toFixed(2)}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="4">
                        {comprobacion ? (
                          <div className="alert alert-success" role="alert">
                            ¡La partida doble está balanceada!
                          </div>
                        ) : (
                          <div className="alert alert-danger" role="alert">
                            La partida doble no está balanceada.
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// Validación de PropTypes
LibroDiario.propTypes = {
  asientos: PropTypes.array.isRequired, // Especifica que agregarAsiento es requerido y es una función
};

export default LibroDiario;
