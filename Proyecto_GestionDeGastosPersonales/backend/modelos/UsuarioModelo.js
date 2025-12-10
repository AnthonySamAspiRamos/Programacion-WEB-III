import {db} from "../config/db.js";

export const obtUsuarios = async () => {
    const [resultado] = await db.query('SELECT * FROM usuarios ');
    return resultado;
};
export const obtUsuario = async (id) => {
    const [resultado] = await db.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    return resultado[0];
};
export const insertaUsuario = async (usuario) => {
    const {nombre, ap_Pat, ap_Mat, correo, contrasenia} = usuario;
    const [resultado] = await db.query('INSERT INTO usuarios(nombre, ap_Pat, ap_Mat, correo, contrasenia) VALUES (?,?,?,?,?)',[nombre, ap_Pat, ap_Mat, correo, contrasenia]);
    return {...usuario};
};
export const setUsuario = async (id, usuario) => {
    const {nombre, ap_pat, ap_mat, correo, contrasenia} = usuario
    await db.query('UPDATE usuarios SET nombre=?, ap_pat=?, ap_mat=? ,correo=?, contrasenia=? WHERE id_usuario=?', [nombre, ap_pat, ap_mat, correo, contrasenia, id]);
    return { id, ...usuario };
    };
export const delUsuario = async (id) => {
    await db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    return id;
};