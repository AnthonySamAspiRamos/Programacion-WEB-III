import express from 'express';
import { 
    mostrarGastos, 
    agregarGasto, 
    actualizarGastoExistente, 
    eliminarGastoPorId 
} from '../controladores/gastosControlador.js';

const router = express.Router();

// Las rutas internas ahora usan '/' porque el prefijo '/api/gastos' se agregará en index.js
router.get('/', mostrarGastos); 
router.post('/', agregarGasto); 
router.put('/:id', actualizarGastoExistente);
router.delete('/:id', eliminarGastoPorId);

export default router;