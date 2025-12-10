
import { Nav, NavDropdown, Image } from "react-bootstrap";
import { colors } from "../../styles/colors";
import { useNavigate, Link } from 'react-router-dom';

function Avatar(){
  return ( 
    <Nav className="ms-auto">
      <NavDropdown
        title="ppp"
        id="nav-dropdown-profile"
        align="end"
      >
        <NavDropdown.Item href="#profile">Mi Perfil</NavDropdown.Item>
        <NavDropdown.Item href="#settings">Configuración</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#logout">Cerrar Sesión</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  ); 
}

export default Avatar;
