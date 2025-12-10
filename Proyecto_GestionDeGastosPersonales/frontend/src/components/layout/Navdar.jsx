import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Image } from "react-bootstrap";
import { colors } from '../../styles/colors';
import { useNavigate, Link } from 'react-router-dom';

function NavScrollExample() {
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate('/profile'); 
  };

  const handleSettings = () => {
    navigate('/settings'); 
  };

  const handleLogout = () => {
    if (onLogout && typeof onLogout === 'function') {
      onLogout();
    }
    navigate('/auth');
  };

  return (    
   <Navbar expand="lg" style={{
        width: '100%',
        height: 70,
        backgroundColor: colors.blueColor,
        padding: 0,
        margin: 0
        }}>
  <Navbar.Brand href="#" style={{
      fontFamily: "'Pacifico', cursive",
      fontSize: "3rem",
      color: "#f7f7f7df",
      textShadow: "2px 2px 4px rgba(179, 255, 251, 0.3)",
      margin: 0,
      padding: "0 10px" 
  }}>Gestion De Gastos</Navbar.Brand>

  <Nav className="ms-auto" style={{ marginRight: 10, paddingRight: 0 ,marginTop:20}}>
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
      <NavDropdown.Item href="#profile">Mi Perfil</NavDropdown.Item>
      <NavDropdown.Item href="#settings">Configuración</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#logout">Cerrar Sesión</NavDropdown.Item>
    </NavDropdown>
  </Nav>        
</Navbar>

  );
}

export default NavScrollExample;