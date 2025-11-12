import {obtCat, adiCat, obtCatAndProd, actCat, delCatAndProd} from "../modelos/categoriasModelo.js";

export const muestraCategorias = async (req, res) => {
    try {
        const resultado = await obtCat();
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 export const adicionarCategoria = async (req, res) => {
    try{
        const resultado = await adiCat(req.body);
        res.json(resultado);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
 };

 export const muestraCatAndProd = async (req, res) => {
    try {
        const resultado = await obtCatAndProd(req.params.id);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 };

 export const actualizaCategoria = async (req, res) => {
    try{
        const resultado = await actCat(req.params.id, req.body);
        res.json(resultado);
    }catch(error){ 
        res.status(500).json({error: error.message});
    }
 };

 export const borrarCatAndProd = async (req, res) => {
    try{
        const resultado = await delCatAndProd(req.params.id);
        res.json(resultado);
    }catch(error){
        res.status(500).json({error: error.message});
    }
 }