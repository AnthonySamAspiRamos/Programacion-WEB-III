import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './componentes/AuthPage/AuthPage.jsx';
import GestorDeGastos from './GestorDeGastos.jsx';
import "./index.css";

function App() {  
  const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    return user !== null && user !== '{}';
  };

  return (
    <Router>
      <Routes>
       <Route 
          path="/auth" 
          element={ 
            isAuthenticated() ? <Navigate to="/Home" replace /> : <AuthPage />
          } 
        />
        
        <Route 
          path="/Home" 
          element={
            isAuthenticated() ? <GestorDeGastos /> : <Navigate to="/auth" replace />
          } 
        />
        
         <Route 
          path="/" 
          element={
            isAuthenticated() ? <Navigate to="/Home" replace /> : <Navigate to="/auth" replace />
          } 
        />
        
        <Route 
          path="*" 
          element={
            isAuthenticated() ? <Navigate to="/Home" replace /> : <Navigate to="/auth" replace />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;