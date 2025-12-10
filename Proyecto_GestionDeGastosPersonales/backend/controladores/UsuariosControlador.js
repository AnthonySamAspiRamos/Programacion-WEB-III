import { delUsuario, insertaUsuario, obtUsuario, obtUsuarios, setUsuario } from "../modelos/UsuarioModelo.js";


export const mostrarUsuarios = async (req, res) => {
    try{
        const resultado = await obtUsuarios();
        res.json(resultado);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }     
};

export const mostrarUsuario = async (req, res) => {
    try {
    const resultado = await obtUsuario(req.params.id);
    if (!resultado) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const agregarUsuario = async (req, res) => {
    try {
        console.log("INSERTANDO USUARIO", req.body);
        //VALIDACION
        if( req.body.nombre === "" || 
            req.body.ap_Pat === "" ||
            req.body.ap_Mat === "" ||
            req.body.correo === "" ||
            req.body.contrasenia === ""){
            res.json({error: "Los campos deben tener datos"})
        }else{
            const resultado = await insertaUsuario(req.body);
            res.status(201).json(resultado);
        }            
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

export const actualizarUsuario = async (req, res) => {
    try {
        const resultado = await setUsuario(req.params.id, req.body);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        await delUsuario(req.params.id);
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};