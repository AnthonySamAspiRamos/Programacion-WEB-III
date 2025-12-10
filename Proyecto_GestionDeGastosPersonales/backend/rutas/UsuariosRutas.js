import express from "express";
import { actualizarUsuario, agregarUsuario, eliminarUsuario, mostrarUsuario, mostrarUsuarios } from "../controladores/UsuariosControlador.js";

const rutas = express.Router();

// Las rutas internas ahora usan '/' porque el prefijo '/api/gastos' se agregará en index.js
rutas.get(`/`, mostrarUsuarios);
rutas.get('/:id', mostrarUsuario);
rutas.post('/adi', agregarUsuario);
rutas.put('/:id', actualizarUsuario);
rutas.delete('/:id', eliminarUsuario);

export default rutas;