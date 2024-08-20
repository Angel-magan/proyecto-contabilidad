import { useState, useEffect } from "react";

const DatosEmpresa = () => {
  //Datos de la empresa
  const [direccionEmpresa, setDireccionEmpresa] = useState(() => {
    const savedDireccionEmpresa = localStorage.getItem("direccionEmpresa");
    return savedDireccionEmpresa ? JSON.parse(savedDireccionEmpresa) : "";
  });
  const [nif, setNif] = useState(() => {
    const savedNif = localStorage.getItem("nif");
    return savedNif ? JSON.parse(savedNif) : "";
  });
  const [contacto, setContacto] = useState(() => {
    const savedContacto = localStorage.getItem("contacto");
    return savedContacto ? JSON.parse(savedContacto) : "";
  });

  useEffect(() => {
    //Datos de la empresa ********
    localStorage.setItem("direccionEmpresa", JSON.stringify(direccionEmpresa));
    localStorage.setItem("nif", JSON.stringify(nif));
    localStorage.setItem("contacto", JSON.stringify(contacto));
  }, [direccionEmpresa, nif, contacto]);
  const handleGuardarClick = () => {
    // Limpiar los inputs
    setDireccionEmpresa("");
    setNif("");
    setContacto("");
  };
  return (
    <div className="container mb-3">
      <h3>Información de la empresa</h3>
      <p className="text-dark m-1">Dirección de la empresa:</p>
      <input
        className="form-control"
        type="text"
        value={direccionEmpresa}
        onChange={(e) => setDireccionEmpresa(e.target.value)}
      />
      <p className="text-dark m-1">NIF:</p>
      <input
        className="form-control"
        type="text"
        value={nif}
        onChange={(e) => setNif(e.target.value)}
      />
      <p className="text-dark m-1">Teléfono de contacto:</p>
      <input
        className="form-control"
        type="text"
        value={contacto}
        onChange={(e) => setContacto(e.target.value)}
      />
      <div className="text-center">
        <button className="boton" onClick={handleGuardarClick}>
          Guardar
        </button>
      </div>
    </div>
  );
};

export default DatosEmpresa;
