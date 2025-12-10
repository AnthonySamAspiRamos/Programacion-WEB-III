import {obtTodo, inserta, actualiza, elimina} from
'../modelos/categoriaModelo.js';
export const muestraCategoria = async (req, res) => {
    try {
        const resultado = await obtTodo();
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const insertaCategoria = async (req, res) => {
    try {
        const resultado = await inserta(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 

export const actualizaCategoria = async (req, res) => {
    try {
        const resultado = await actualiza(req.params.id, req.body);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const eliminarCategoria = async (req, res) => {
    try {
        await elimina(req.params.id);
        res.json({ message: 'Categoria eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
