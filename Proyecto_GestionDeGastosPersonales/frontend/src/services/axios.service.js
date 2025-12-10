import axios from 'axios';

// 1. Configurar la instancia base
const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api', // Reemplaza con la URL de tu backend
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + localStorage.getItem('token') // Si usas autenticación
    }
});

export default apiClient;

