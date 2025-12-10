import express from 'express';
import {muestraCategoria, insertaCategoria, actualizaCategoria,eliminarCategoria} from '../controladores/categoriaControlador.js'

const router = express.Router();
    
// Las rutas internas ahora usan '/' porque el prefijo '/api/categorias' se agregará en index.js
router.get('/', muestraCategoria); 
router.post('/', insertaCategoria);
router.put('/:id', actualizaCategoria);
router.delete('/:id', eliminarCategoria);

export default router;