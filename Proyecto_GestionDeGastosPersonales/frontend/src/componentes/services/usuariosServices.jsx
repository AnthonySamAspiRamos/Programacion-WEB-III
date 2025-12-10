import axios from 'axios';

const API_URL = 'http://localhost:3001/api/usuarios';

// Para login - obtener todos y filtrar
export const loginUsuario = async (credenciales) => {
    try {
        // Obtener todos los usuarios
        const respuesta = await axios.get(API_URL);
        const usuarios = respuesta.data;
        
        // Buscar usuario por correo y contraseña
        const usuarioEncontrado = usuarios.find(
            usuario => usuario.correo === credenciales.correo && 
                      usuario.contrasenia === credenciales.contrasenia
        );
        
        if (usuarioEncontrado) {
            return {
                ok: true,
                usuario: usuarioEncontrado,
                msg: "Login exitoso"
            };
        } else {
            return {
                ok: false,
                msg: "Credenciales incorrectas"
            };
        }
    } catch (error) {
        console.error("Error en login:", error);
        return {
            ok: false,
            msg: "Error de conexión con el servidor"
        };
    }
};

// Para registro
export const registerUsuario = async (usuario) => {
    try {
        console.log (usuario)
        const respuesta = await axios.post(`${API_URL}/adi`, usuario);
        return respuesta.data;
    } catch (error) {
        console.error("Error en registro:", error);
        return {
            ok: false,
            msg: "Error al registrar usuario"
        };
    }
};

// Obtener todos los usuarios
export const getUsuarios = async () => {
    const respuesta = await axios.get(API_URL);
    return respuesta.data;
};

// Obtener usuario por ID
export const getUsuario = async (id) => {
    const respuesta = await axios.get(`${API_URL}/${id}`);
    return respuesta.data;
};