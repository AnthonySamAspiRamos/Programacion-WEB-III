import apiClient from './axios.service';

// --- READ: Obtener todos los gastos (GET /gastos)
export const getGastos = async () => {
    try {
        const response = await apiClient.get('/gastos');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// --- CREATE: Crear un nuevo gasto (POST /gastos)
export const createGasto = async (nuevoGasto) => {
    // nuevoGasto debe contener: { cantidad, descripcion, categorias_id }
    try {
        const response = await apiClient.post('/gastos', nuevoGasto);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// --- UPDATE: Actualizar un gasto (PUT /gastos/:id)
export const updateGasto = async (id, datosActualizados) => {
    // datosActualizados debe contener: { cantidad, descripcion, categorias_id (opcional) }
    try {
        const response = await apiClient.put(`/gastos/${id}`, datosActualizados);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// --- DELETE: Eliminar un gasto (DELETE /gastos/:id)
export const deleteGasto = async (id) => {
    try {
        const response = await apiClient.delete(`/gastos/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};