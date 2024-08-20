import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/img/Logo.png";

const NavBarExample = () => {
  return (
    <>
      <Navbar className="navBg" variant="dark" expand="lg">
        <div className="container d-flex justify-content-around">
          <div>
            <Navbar.Brand as={Link} to="/">
              <img src={Logo} className="logo" style={{ width: "80px" }}></img>
            </Navbar.Brand>
          </div>
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Inicio
                </Nav.Link>
                <Nav.Link as={Link} to="/depreciacion" className="ms-3">
                  Calcular Depreciación
                </Nav.Link>

                <Nav.Link as={Link} to="/frecuentes" className="ms-3">
                  Preguntas Frecuentes
                </Nav.Link>
                <Nav.Link as={Link} to="/infoPartidaDoble" className="ms-3">
                  Simulador Partida Doble
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default NavBarExample;
