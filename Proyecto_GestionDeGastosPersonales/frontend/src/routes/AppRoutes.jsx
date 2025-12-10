import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../modules/dashboard/Dashboard';
import Clientes from '../modules/clientes/Clientes';
import Store from '../modules/store/Store'
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes/>} />
      <Route path='/store' element={<Store/>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;