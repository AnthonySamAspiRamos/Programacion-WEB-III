import { db } from '../config/db.js'; 

export const obtenerTodos = async () => {    
    const sql = `
        SELECT 
            g.id, 
            g.cantidad, 
            g.descripcion, 
            g.categorias_id,
            g.fecha,                
            c.nombre AS nombre_categoria
        FROM gastos g
        LEFT JOIN categorias c ON g.categorias_id = c.id
        ORDER BY g.fecha DESC      
    `;
    const [resultados] = await db.query(sql);
       
    return resultados;
};

export const insertarGasto = async (gastoData) => {
     const { cantidad, descripcion, categorias_id, fecha } = gastoData;
     const [resultado] = await db.query(
        'INSERT INTO gastos (cantidad, descripcion, categorias_id, fecha) VALUES (?, ?, ?, ?)',
        [cantidad, descripcion, categorias_id, fecha] // <-- ¡Añadido!
    );
     return { id: resultado.insertId, ...gastoData };
};

export const actualizarGasto = async (id, gastoData) => {
    const { cantidad, descripcion, fecha, categorias_id } = gastoData; 
    
    const [resultado] = await db.query(
        `UPDATE gastos 
         SET 
             cantidad = ?, 
             descripcion = ?, 
             categorias_id = ?,
             fecha = ?,
             fecha_act = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [
            cantidad, 
            descripcion, 
            categorias_id, 
            fecha, 
            id
        ]
    );

    return resultado.affectedRows; 
};

export const eliminarGasto = async (id) => {
    await db.query('DELETE FROM gastos WHERE id = ?', [id]);
    return id;
};