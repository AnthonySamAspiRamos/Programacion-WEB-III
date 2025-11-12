import {db} from "../config/db.js";

export const adiProd = async (producto) =>{
    const {nombre, precio, stock, categoria_id}=producto;
    const [resultado] = await db.query(`INSERT INTO productos(nombre, precio, stock, categoria_id) VALUES (?,?,?,?)`,[nombre, precio, stock, categoria_id]);
    return { id: resultado.insertId, ...producto};
}

export const obtProdAndNomCat = async () => {
    const [res]= await db.query(`SELECT productos.*,categorias.nombre AS nom_Cate FROM productos,categorias WHERE productos.categoria_id = categorias.id`)
    return res;
}

export const obtProdAndNomCatForId = async (id)=> {
    const [res] = await db.query(`SELECT productos.*, categorias.nombre AS nom_cat FROM productos,categorias WHERE productos.id=? AND productos.categoria_id = categorias.id`,[id]);
    return res;
}

export const SetProducto = async (producto, id) =>{
    const {nombre, precio, stock, categoria_id} = producto
    const [res] = await db.query(`UPDATE productos SET nombre=?, precio=?,stock=?,categoria_id=? WHERE id=?`,[nombre, precio, stock, categoria_id, id]);
    return {id: res.insertId,...producto};
}

export const SetProductosStock = async (stock, id) =>{
    const [res] = await db.query(`UPDATE productos SET stock=? WHERE id=?`,[stock,id])
    return {id: res.insertId, ...stock};
}