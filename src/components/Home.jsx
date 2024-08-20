import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container principal p-5 info-solicitada mt-5">
        <h1 className="info-title">
          Bienvenido/a a la web de <u>TecnoComercial</u>{" "}
        </h1>
        <p className="fs-5">
          Una empresa dedicada a la venta de todo tipo de productos
          tecnológicos.
        </p>
        <h3 className="fw-bold">¿Qué puedes encontrar en la web?</h3>
        <ul className="fs-5">
          <li>Sección para calcular la depreciación de activos.</li>
          <li>Preguntas frecuentes sobre la depreciación.</li>
          <li>Información acerca de la partida doble.</li>
          <li>Simulador de partida doble.</li>
        </ul>
        <section>
          <h3>Agregar la Información de la empresa</h3>
          <Link to="/datosEmpresa" className="boton boton-agregar mt-0">
            Aqui
          </Link>
        </section>
      </div>
    </>
  );
};

export default Home;
