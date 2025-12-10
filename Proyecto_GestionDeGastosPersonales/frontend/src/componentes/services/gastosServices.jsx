import axios from 'axios';

const API_URL = 'http://localhost:3001/api/gastos';

export const getGastos = async (idUsuario = null) => {
    try {
        const respuesta = await axios.get(API_URL);
        let gastos = respuesta.data;
        
        // Filtrar por usuario si se especifica
        if (idUsuario) {
            gastos = gastos.filter(gasto => gasto.id_usuario == idUsuario);
        }
        
        return gastos;
    } catch (error) {
        console.error("Error obteniendo gastos:", error);
        return [];
    }
};

export const createGasto = async (gasto) => {
    try {
        // Obtener usuario actual del localStorage
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Añadir id_usuario al gasto
        const gastoConUsuario = {
            ...gasto,
            id_usuario: userData.Id,
            fecha_alta: new Date().toISOString(),
            fecha_act: new Date().toISOString()
        };
        
        const respuesta = await axios.post(API_URL, gastoConUsuario);
        return respuesta.data;
    } catch (error) {
        console.error("Error creando gasto:", error);
        throw error;
    }
};

export const updateGasto = async (id, gasto) => {
    const respuesta = await axios.put(`${API_URL}/${id}`, gasto);
    return respuesta.data;
};

export const deleteGasto = async (id) => {
    const respuesta = await axios.delete(`${API_URL}/${id}`);
    return respuesta.data;
};