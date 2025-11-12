import { adiProd, obtProdAndNomCat, obtProdAndNomCatForId, SetProducto, SetProductosStock } from "../modelos/productosModelo.js";

export const agregarProducto = async (req, res) =>{
    try{
        const resultado = await adiProd(req.body);
        res.json(resultado);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

export const muestraProdAndNomCat = async (req, res) => {
    try{
        const resultado = await obtProdAndNomCat();
        res.json(resultado);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export const muestraProdAndNomCatForId = async (req,res) => {
    try{
        const resultado = await obtProdAndNomCatForId(req.params.id);
        res.json(resultado);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export const ActualizarProducto = async (req,res) => {
    try {
        const resultado = await SetProducto(req.body, req.params.id);
        res.json(resultado);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export const ActualizaProductoStock = async (req, res) => {
    try{ 
        const res = await SetProductosStock(req.body.stock, req.params.id);
        res.json(res)
    }catch(error){
        res.status(500).json({error: error.message});
    }
}