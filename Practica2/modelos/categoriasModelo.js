import {db} from "../config/db.js";

export const obtCat = async () => {
    const [resultado] = await db.query('SELECT * FROM categorias');
    return resultado;
};

export const adiCat = async (categoria) => {
    const {nombre, descripcion} = categoria;
    const [resultado] = await db.query(`INSERT INTO categorias(nombre, descripcion) VALUES (?,?)`, [nombre, descripcion]);
    return { id: resultado.insertId, ...categoria };
};
export const obtCatAndProd = async (id) => { 
    const [cate] = await db.query(`SELECT * FROM categorias WHERE id=?`,[id]);
    const [prod] = await db.query(`SELECT * FROM productos WHERE categoria_id=?`,[id]);

    const resultado = {
        ...cate[0],
        productos: prod
    }    
    return resultado;
};

export const actCat = async (id, categoria) => {
    const {nombre, descripcion} = categoria;
    await db.query(`UPDATE categorias SET nombre=?, descripcion=? WHERE id=?`,[nombre, descripcion, id]);
    return{id, ...categoria};
};

export const delCatAndProd = async(id) => {
    await db.query(`DELETE FROM categorias WHERE id=?`,[id]);
    await db.query(`DELETE FROM productos WHERE categoria_id=?`,[id]);
    return id;
} 
