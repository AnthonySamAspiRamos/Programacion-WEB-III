import express from 'express';
import cors from 'cors';
import categoriasRutas from './rutas/categoriasRutas.js'; 
import gastosRutas from './rutas/gastosRutas.js'; 
import usuariosRutas from './rutas/UsuariosRutas.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());

app.use('/api/categorias', categoriasRutas); 
app.use('/api/gastos', gastosRutas);
app.use('/api/usuarios', usuariosRutas);  

const puerto = 3001;

app.listen(puerto,() => {
    console.log(`Servidor en http://localhost:${puerto}`);
});
