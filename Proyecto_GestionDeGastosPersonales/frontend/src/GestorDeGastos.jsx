import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navdar from './componentes/layout/Navdar.jsx';
import Aside from './componentes/layout/Aside.jsx';
import Footer from './componentes/layout/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function GestorDeGastos() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/auth');
    };
 
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    return (        
        <div className='gestor-container'>            
            <Navdar onLogout={handleLogout} userData={userData} />          
            <div className='main-content'>
                <Aside />
            </div>      
            <Footer />
        </div>
    );
}

export default GestorDeGastos;