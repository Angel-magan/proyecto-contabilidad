import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import AsientoForm from "./AsientoForm";
import Depreciacion from "../src/components/Depreciacion";
import Frecuentes from "../src/components/Frecuentes";
import InfoPartidaDoble from "./InfoPartidaDoble";
import LibroDiario from "./LibroDiario";
import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home";
import Footer from "./Footer";
import DatosEmpresa from "./components/DatosEmpresa";
import "../src/styles/App.css";

const App = () => {
  const [asientos, setAsientos] = useState([]);

  const agregarAsiento = (nuevoAsiento) => {
    setAsientos([...asientos, nuevoAsiento]);
  };

  return (
    <Router>
      <Navbar />
      <div className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/simulador"
            element={
              <>
                <AsientoForm agregarAsiento={agregarAsiento} />
                <LibroDiario asientos={asientos} />
              </>
            }
          />
          <Route path="/infoPartidaDoble" element={<InfoPartidaDoble />} />
          <Route path="/depreciacion" element={<Depreciacion />} />
          <Route path="/frecuentes" element={<Frecuentes />} />
          <Route path="/datosEmpresa" element={<DatosEmpresa />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
