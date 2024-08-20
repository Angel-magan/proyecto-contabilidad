//Código usando 1 solo botón (Calcular y Nuevo Calculo*********************
import { useState, useEffect } from "react";

import TablasDepreciacion from "./TablasDepreciacion";
import "../styles/Depreciacion.css";

const Depreciacion = () => {
  const [tipoActivo, setTipoActivo] = useState(() => {
    const savedTipoActivo = localStorage.getItem("tipoActivo");
    return savedTipoActivo ? JSON.parse(savedTipoActivo) : "";
  });
  const [NombreActivo, setNombreActivo] = useState(() => {
    const savedNombreActivo = localStorage.getItem("NombreActivo");
    return savedNombreActivo ? JSON.parse(savedNombreActivo) : "";
  });
  const [valorActivo, setValorActivo] = useState(() => {
    const savedValorActivo = localStorage.getItem("valorActivo");
    return savedValorActivo ? JSON.parse(savedValorActivo) : "";
  });
  const [valorResidual, setValorResidual] = useState(() => {
    const savedValorResidual = localStorage.getItem("valorResidual");
    return savedValorResidual ? JSON.parse(savedValorResidual) : "";
  });
  const [vidaUtil, setVidaUtil] = useState(() => {
    const savedVidaUtil = localStorage.getItem("vidaUtil");
    return savedVidaUtil ? JSON.parse(savedVidaUtil) : "";
  });
  const [depreciacionAnual, setDepreciacionAnual] = useState(() => {
    const savedDepreciacionAnual = localStorage.getItem("depreciacionAnual");
    return savedDepreciacionAnual ? JSON.parse(savedDepreciacionAnual) : [];
  });
  const [depreciacionMensual, setDepreciacionMensual] = useState(() => {
    const savedDepreciacionMensual = localStorage.getItem(
      "depreciacionMensual"
    );
    return savedDepreciacionMensual ? JSON.parse(savedDepreciacionMensual) : [];
  });
  const [depreciacionDiaria, setDepreciacionDiaria] = useState(() => {
    const savedDepreciacionDiaria = localStorage.getItem("depreciacionDiaria");
    return savedDepreciacionDiaria ? JSON.parse(savedDepreciacionDiaria) : [];
  });

  // Añadimos isCalculating al estado persistente
  const [isCalculating, setIsCalculating] = useState(() => {
    const savedIsCalculating = localStorage.getItem("isCalculating");
    return savedIsCalculating ? JSON.parse(savedIsCalculating) : false;
  });

  const [minAnios, setMinAnios] = useState(0);
  const [showAnual, setShowAnual] = useState(false);
  const [showMensual, setShowMensual] = useState(false);
  const [showDiaria, setShowDiaria] = useState(false);
  //Probando capturar datos de la depreciación
  const [DAValue, setDAValue] = useState(null);
  const [DMValue, setDMValue] = useState(null);
  const [DDValue, setDDValue] = useState(null);

  useEffect(() => {
    const savedDAValue = localStorage.getItem("DAValue");
    const savedDMValue = localStorage.getItem("DMValue");
    const savedDDValue = localStorage.getItem("DDValue");

    if (savedDAValue) setDAValue(savedDAValue);
    if (savedDMValue) setDMValue(savedDMValue);
    if (savedDDValue) setDDValue(savedDDValue);

    localStorage.setItem("tipoActivo", JSON.stringify(tipoActivo));
    localStorage.setItem("NombreActivo", JSON.stringify(NombreActivo));
    localStorage.setItem("valorActivo", JSON.stringify(valorActivo));
    localStorage.setItem("valorResidual", JSON.stringify(valorResidual));
    localStorage.setItem("vidaUtil", JSON.stringify(vidaUtil));
    localStorage.setItem(
      "depreciacionAnual",
      JSON.stringify(depreciacionAnual)
    );
    localStorage.setItem(
      "depreciacionMensual",
      JSON.stringify(depreciacionMensual)
    );
    localStorage.setItem(
      "depreciacionDiaria",
      JSON.stringify(depreciacionDiaria)
    );
    localStorage.setItem("isCalculating", JSON.stringify(isCalculating));
  }, [
    tipoActivo,
    NombreActivo,
    valorActivo,
    valorResidual,
    vidaUtil,
    depreciacionAnual,
    depreciacionMensual,
    depreciacionDiaria,
    isCalculating,
  ]);

  const handleTipoActivoChange = (e) => {
    const tipo = e.target.value;
    setTipoActivo(tipo);

    let minAniosTemp;
    switch (tipo) {
      case "Edificaciones":
        minAniosTemp = 20;
        break;
      case "Maquinaria":
        minAniosTemp = 5;
        break;
      case "Vehículos":
        minAniosTemp = 4;
        break;
      case "Otros":
        minAniosTemp = 2;
        break;
      default:
        minAniosTemp = 0;
    }

    setMinAnios(minAniosTemp);
  };

  const handleVidaUtilBlur = () => {
    if (vidaUtil < minAnios) {
      alert(
        `La vida útil debe ser al menos ${minAnios} años para el tipo de activo seleccionado.`
      );
    }
  };

  const CalculoDepreciacion = () => {
    const valorActivoNumerico = parseFloat(valorActivo);
    const valorResidualNumerico = parseFloat(valorResidual);
    if (isCalculating) {
      // Limpiar los datos para un nuevo cálculo
      setTipoActivo("");
      setNombreActivo("");
      setValorActivo("");
      setValorResidual("");
      setVidaUtil("");
      setDepreciacionAnual([]);
      setDepreciacionMensual([]);
      setDepreciacionDiaria([]);
      setShowAnual(false);
      setShowMensual(false);
      setShowDiaria(false);
      setIsCalculating(false);
      //localStorage.clear();
      return;
    }

    if (isNaN(valorActivoNumerico) || valorActivoNumerico <= 0) {
      alert("El valor del activo debe ser un número mayor a 0.");
      return;
    }

    if (isNaN(valorResidualNumerico) || valorResidualNumerico < 0) {
      alert("El valor residual debe ser un número mayor o igual a 0.");
      return;
    }

    if (valorResidualNumerico >= valorActivoNumerico) {
      alert(
        "El valor residual no puede ser mayor o igual que el valor del activo."
      );
      return;
    }

    if (vidaUtil < minAnios) {
      alert(
        `La vida útil debe ser al menos ${minAnios} años para el tipo de activo seleccionado.`
      );
      return;
    }

    const DA = (valorActivo - valorResidual) / vidaUtil;
    const depreciacionPorAño = [];
    let depreciacionAcumuladaAnual = 0;
    let valorEnLibrosAnual = valorActivo;

    for (let i = 1; i <= vidaUtil; i++) {
      depreciacionAcumuladaAnual += DA;
      valorEnLibrosAnual -= DA;
      depreciacionPorAño.push({
        año: i,
        depreciacionAnual: DA.toFixed(2),
        depreciacionAcumulada: depreciacionAcumuladaAnual.toFixed(2),
        valorEnLibros: valorEnLibrosAnual.toFixed(2),
      });
    }

    const DM = DA / 12;
    const depreciacionPorMes = [];
    let depreciacionAcumuladaMensual = 0;
    let valorEnLibrosMensual = valorActivo;

    for (let i = 1; i <= vidaUtil; i++) {
      for (let j = 1; j <= 12; j++) {
        depreciacionAcumuladaMensual += DM;
        valorEnLibrosMensual -= DM;
        depreciacionPorMes.push({
          año: i,
          mes: j,
          depreciacionMensual: DM.toFixed(2),
          depreciacionAcumulada: depreciacionAcumuladaMensual.toFixed(2),
          valorEnLibros: valorEnLibrosMensual.toFixed(2),
        });
      }
    }

    const DD = DA / 360;
    const depreciacionPorDia = [];
    let depreciacionAcumuladaDiaria = 0;
    let valorEnLibrosDiario = valorActivo;

    for (let i = 1; i <= vidaUtil * 360; i++) {
      depreciacionAcumuladaDiaria += DD;
      valorEnLibrosDiario -= DD;
      depreciacionPorDia.push({
        dia: i,
        depreciacionDiaria: DD.toFixed(2),
        depreciacionAcumulada: depreciacionAcumuladaDiaria.toFixed(2),
        valorEnLibros: valorEnLibrosDiario.toFixed(2),
      });
    }

    setDepreciacionAnual(depreciacionPorAño);
    setDepreciacionMensual(depreciacionPorMes);
    setDepreciacionDiaria(depreciacionPorDia);
    setIsCalculating(true);
    // Guardar los valores en los estados
    setDAValue(DA.toFixed(2));
    setDMValue(DM.toFixed(2));
    setDDValue(DD.toFixed(2));

    // Guardar los valores en el localStorage
    localStorage.setItem("DAValue", DA.toFixed(2));
    localStorage.setItem("DMValue", DM.toFixed(2));
    localStorage.setItem("DDValue", DD.toFixed(2));
  };

  const toggleTable = (type) => {
    switch (type) {
      case "anual":
        setShowAnual((prev) => !prev);
        break;
      case "mensual":
        setShowMensual((prev) => !prev);
        break;
      case "diaria":
        setShowDiaria((prev) => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <section className="container-form bg-opacity rounded w-75 text-light text-center p-3 mb-4">
        <h3>Cálculo de Depreciación</h3>
        <p className="text-dark m-1">Tipo de Activo:</p>
        <select
          className="form-control"
          value={tipoActivo}
          onChange={handleTipoActivoChange}
        >
          <option value="">Seleccionar</option>
          <option value="Edificaciones">Edificaciones (5%)</option>
          <option value="Maquinaria">Maquinaria (20%)</option>
          <option value="Vehículos">Vehículos (25%)</option>
          <option value="Otros">Otros Bienes Muebles (50%)</option>
        </select>
        <p className="text-dark m-1">Nombre del Activo:</p>
        <input
          className="form-control"
          type="text"
          value={NombreActivo}
          onChange={(e) => setNombreActivo(e.target.value)}
        />
        <p className="text-dark m-1">Valor del Activo:</p>
        <input
          className="form-control"
          type="number"
          value={valorActivo}
          onChange={(e) => setValorActivo(e.target.value)}
        />
        <p className="text-dark m-1">Valor residual:</p>
        <input
          className="form-control"
          type="number"
          value={valorResidual}
          onChange={(e) => setValorResidual(e.target.value)}
        />
        <p className="text-dark m-1">Vida util (en años):</p>
        <input
          className="form-control"
          type="number"
          value={vidaUtil}
          onBlur={handleVidaUtilBlur}
          onChange={(e) => setVidaUtil(e.target.value)}
        />

        <div>
          <button className="buttonCalcular" onClick={CalculoDepreciacion}>
            {isCalculating ? "Nuevo Cálculo" : "Calcular"}
          </button>
        </div>

        {isCalculating && (
          <>
            {DAValue && (
              <div className="containerTable">
                <h3>Resumen del activo {NombreActivo}</h3>
                <table className="table">
                  <tbody>
                    <tr>
                      <th className="table-primary">Tipo activo</th>
                      <td className=" text-start">{tipoActivo}</td>
                    </tr>
                    <tr>
                      <th className="table-primary">Depreciación Anual</th>
                      <td className="table-secondary text-start">${DAValue}</td>
                    </tr>
                    <tr>
                      <th className="table-primary">Depreciación Mensual</th>
                      <td className=" text-start">${DMValue}</td>
                    </tr>
                    <tr>
                      <th className="table-primary">Depreciación Diaria</th>
                      <td className="table-secondary  text-start">
                        ${DDValue}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <button className="buttonShow" onClick={() => toggleTable("anual")}>
              {showAnual ? "Ocultar" : "Mostrar"} Depreciación Anual
            </button>
            {showAnual && (
              <TablasDepreciacion data={depreciacionAnual} tipo="Anual" />
            )}
            <button
              className="buttonShow"
              onClick={() => toggleTable("mensual")}
            >
              {showMensual ? "Ocultar" : "Mostrar"} Depreciación Mensual
            </button>
            {showMensual && (
              <TablasDepreciacion data={depreciacionMensual} tipo="Mensual" />
            )}
            <button
              className="buttonShow"
              onClick={() => toggleTable("diaria")}
            >
              {showDiaria ? "Ocultar" : "Mostrar"} Depreciación Diaria
            </button>
            {showDiaria && (
              <TablasDepreciacion data={depreciacionDiaria} tipo="Diaria" />
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Depreciacion;
