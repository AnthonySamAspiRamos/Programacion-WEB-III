import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image } from "react-bootstrap";
import { colors } from '../../styles/colors';
import { useNavigate } from 'react-router-dom';

function NavScrollExample({ onLogout, userData }) {
  const navigate = useNavigate();

  const handleProfile = () => {   
    alert("Función de perfil en desarrollo");
  };

  const handleSettings = () => {  
    alert("Función de configuración en desarrollo");
  };

  const handleLogoutClick = () => {
    if (onLogout && typeof onLogout === 'function') {
      onLogout();
    }
  };

  return (    
    <Navbar expand="lg" style={{
        width: '100%',
        height: 70,
        backgroundColor: colors.blueColor,
        padding: 0,
        margin: 0
    }}>
      <Navbar.Brand href="/Home" style={{
          fontFamily: "'Pacifico', cursive",
          fontSize: "3rem",
          color: "#f7f7f7df",
          textShadow: "2px 2px 4px rgba(179, 255, 251, 0.3)",
          margin: 0,
          padding: "0 10px"
      }}>Gestión De Gastos</Navbar.Brand>

      <Nav className="ms-auto" style={{ marginRight: 10, paddingRight: 0, marginTop: 20 }}>
        <NavDropdown
          title={
            <Image
              src="/img/avatar.png"
              roundedCircle
              width={45}
              height={45}                
              style={{
                objectFit: "cover",
                cursor: "pointer",
                border: "2px solid #fff",
                margin: 0,
                padding: 0
              }}
            />
          }
          id="nav-dropdown-profile"
          align="end"
        >
          <NavDropdown.Item onClick={handleProfile}>Mi Perfil</NavDropdown.Item>
          <NavDropdown.Item onClick={handleSettings}>Configuración</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogoutClick}>Cerrar Sesión</NavDropdown.Item>
        </NavDropdown>
      </Nav>        
    </Navbar>
  );
}

export default NavScrollExample;