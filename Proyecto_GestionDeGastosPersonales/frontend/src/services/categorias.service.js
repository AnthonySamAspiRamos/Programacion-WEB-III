import apiClient from './axios.service'; // Importa la instancia base


// 1. OBTENER todas las categorías (GET /categorias)
export const getCategorias = async () => {
    try {
        const response = await apiClient.get('/categorias');
        return response.data;
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        throw error; // Propagar el error para que el componente lo maneje
    }
};

// 2. CREAR una nueva categoría (POST /categorias)
export const createCategoria = async (nuevaCategoria) => {
    try {
        const response = await apiClient.post('/categorias', nuevaCategoria);
        return response.data;
    } catch (error) {
        console.error("Error al crear categoría:", error);
        throw error;
    }
};

// 3. ELIMINAR una categoría por ID (DELETE /categorias/:id)
export const deleteCategoria = async (id) => {
    try {
        const response = await apiClient.delete(`/categorias/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar categoría:", error);
        throw error;
    }
};

// --- UPDATE: Actualizar una categoría (PUT /categorias/:id)
export const updateCategoria = async (id, datosActualizados) => {
    try {
        const response = await apiClient.put(`/categorias/${id}`, datosActualizados);
        return response.data;
    } catch (error) {
        throw error;
    }
};
