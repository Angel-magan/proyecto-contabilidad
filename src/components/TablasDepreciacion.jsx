import PropTypes from "prop-types";
import "../styles/TablasDepreciacion.css";

const TablasDepreciacion = ({ data, tipo }) => {
  return (
    <div className="table-container">
      <h3 className="title">Tabla de Depreciación {tipo}</h3>
      <table className="table">
        <thead>
          <tr className="table-primary">
            {tipo === "Anual" && (
              <>
                <th>Año</th>
                <th>Valor en Libros</th>
                <th>Depreciación Anual</th>
                <th>Depreciación Acumulada</th>
              </>
            )}
            {tipo === "Mensual" && (
              <>
                <th>Año</th>
                <th>Mes</th>
                <th>Valor en Libros</th>
                <th>Depreciación Mensual</th>
                <th>Depreciación Acumulada</th>
              </>
            )}
            {tipo === "Diaria" && (
              <>
                <th>Día</th>
                <th>Valor en Libros</th>
                <th>Depreciación Diaria</th>
                <th>Depreciación Acumulada</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {tipo === "Anual" && (
                <>
                  <td>{row.año}</td>
                  <td>${row.valorEnLibros}</td>
                  <td>${row.depreciacionAnual}</td>
                  <td>${row.depreciacionAcumulada}</td>
                </>
              )}
              {tipo === "Mensual" && (
                <>
                  <td>{row.año}</td>
                  <td>{row.mes}</td>
                  <td>${row.valorEnLibros}</td>
                  <td>${row.depreciacionMensual}</td>
                  <td>${row.depreciacionAcumulada}</td>
                </>
              )}
              {tipo === "Diaria" && (
                <>
                  <td>{row.dia}</td>
                  <td>${row.valorEnLibros}</td>
                  <td>${row.depreciacionDiaria}</td>
                  <td>${row.depreciacionAcumulada}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TablasDepreciacion.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      año: PropTypes.number,
      mes: PropTypes.number,
      dia: PropTypes.number,
      depreciacionAnual: PropTypes.string,
      depreciacionMensual: PropTypes.string,
      depreciacionDiaria: PropTypes.string,
      depreciacionAcumulada: PropTypes.string,
      valorEnLibros: PropTypes.string,
    })
  ).isRequired,
  tipo: PropTypes.oneOf(["Anual", "Mensual", "Diaria"]).isRequired,
};

export default TablasDepreciacion;
