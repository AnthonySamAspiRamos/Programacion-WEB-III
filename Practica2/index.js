import express from "express";
import categoriasRutas from "./rutas/categoriasRutas.js";

const app = express();

app.use('/', categoriasRutas);


const puerto = 3001;
app.listen(puerto,
    () => { console.log(`Servidor en http://localhost:${puerto}`);
});
