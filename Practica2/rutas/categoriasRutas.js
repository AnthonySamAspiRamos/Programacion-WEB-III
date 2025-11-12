import express from "express";
import { muestraCategorias, adicionarCategoria, muestraCatAndProd, actualizaCategoria, borrarCatAndProd } from '../controladores/categoriasControlador.js';
import { agregarProducto, muestraProdAndNomCat,muestraProdAndNomCatForId, ActualizarProducto, ActualizaProductoStock } from "../controladores/productoControlador.js";

const rutas = express.Router();

// 1: Crea un endpoint POST /categorias que permita registrar una nueva categoría 
// enviando nombre y descripcion en el body de la petición.
rutas.post(`/categorias/agregar`, adicionarCategoria);

// 2. Crea un endpoint GET /categorias que devuelva todas las categorías
// registradas en la base de datos.
rutas.get(`/categorias`, muestraCategorias);

// 3. Crea un endpoint GET /categorias/:id que devuelva la categoría con el ID
// especificado y además, incluya todos los productos que pertenecen a esa
// categoría.
rutas.get(`/categorias/:id`, muestraCatAndProd);

// 4. Crea un endpoint PUT /categorias/:id que permita actualizar todos los datos
// de la categoría con el ID especificado.
rutas.put(`/categorias/act/:id`, actualizaCategoria);

// 5. Crea un endpoint DELETE /categorias/:id que elimine la categoría indicada
// y, al mismo tiempo, elimine automáticamente todos los productos que
// pertenecen a esa categoría.
rutas.delete(`/categorias/:id`, borrarCatAndProd);

// 6. Crea un endpoint POST /productos que permita registrar un nuevo producto
// enviando nombre, precio, stock y categoria_id para asociarlo a una
// categoría existente.
rutas.post(`/productos/agregar`, agregarProducto);

// 7. Crea un endpoint GET /productos que devuelva todos los productos y muestre
// el nombre de la categoría a la que pertenece cada uno.
rutas.get(`/productos`, muestraProdAndNomCat);

// 8. Crea un endpoint GET /productos/:id que devuelva la información de un
// producto por su ID, incluyendo el nombre de la categoría asociada.
rutas.get(`/productos/:id`, muestraProdAndNomCatForId);

// 9. Crea un endpoint PUT /productos/:id que permita actualizar todos los datos
// de un producto, incluyendo la opción de cambiar la categoría a la que
// pertenece mediante categoria_id.
rutas.put(`/productos/:id`, ActualizarProducto);

// 10. Crea un endpoint PATCH /productos/:id/stock que permita incrementar o
// decrementar el stock de un producto enviando al body la cantidad que se
// desea sumar o restar.
rutas.patch(`/productos/:id/stock`, ActualizaProductoStock);





export default rutas;