import * as GastoModelo from '../modelos/gastosModelo.js'; // Importar todas las funciones del modelo


export const mostrarGastos = async (req, res) => {
    try {
       const gastos = await GastoModelo.obtenerTodos(); 
        res.json(gastos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const agregarGasto = async (req, res) => {
    const { cantidad, descripcion, categorias_id, fecha } = req.body; 

    // Validación 
    if (!cantidad || !categorias_id || !fecha) {
        return res.status(400).json({ msg: 'Faltan campos requeridos: cantidad, categorias_id o fecha.' });
    }

    try {
        const nuevoGasto = await GastoModelo.insertarGasto({ 
            cantidad, 
            descripcion, 
            categorias_id, 
            fecha 
        });
        
        res.status(201).json({ msg: 'Gasto creado exitosamente', gasto: nuevoGasto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarGastoExistente = async (req, res) => {
    const { id } = req.params;
    const { cantidad, descripcion, fecha, categorias_id } = req.body; 

    if (!cantidad || !fecha || !categorias_id) {
        return res.status(400).json({ msg: 'Faltan campos obligatorios: cantidad, fecha y categorias_id.' });
    }

    try {
        const affectedRows = await GastoModelo.actualizarGasto(id, { 
            cantidad, 
            descripcion, 
            fecha, 
            categorias_id 
        });

        if (affectedRows === 0) {
            return res.status(404).json({ msg: 'Gasto no encontrado para actualizar.' });
        }
        
        res.json({ msg: 'Gasto actualizado exitosamente', id: id, ...req.body }); 
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const eliminarGastoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        await GastoModelo.eliminarGasto(id);
        res.json({ msg: `Gasto con ID ${id} eliminado correctamente.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};