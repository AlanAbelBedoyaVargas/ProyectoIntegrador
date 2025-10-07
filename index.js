const express = require('express');
const cors = require('cors');

// Importando rutas definidas de otros archivos

// Usuarios
const authRoutes = require('./routes/auth');
const usuarioRoutes = require('./routes/usuario');
const nutricionistaRoutes = require('./routes/nutricionista');
const pacientesRoutes = require('./routes/pacientes');
const planRoutes1 = require('./routes/plan1');
//const perfilRoutes = require('./routes/perfil');
const nivelesRoutes = require('./routes/nivelesActividad');
const planRoutes=  require('./routes/plan');
const alimentoRoutes = require('./routes/alimento')

//Creación de la app
const app = express();

// Middleware para interpretar JSON
app.use(express.json());
// Middleware para manejar CORS
app.use(cors());

// Configuración de rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/nutricionistas', nutricionistaRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/planes', planRoutes1);
app.use('/api/niveles', nivelesRoutes);
app.use('/api/plan', planRoutes);
app.use('/api/alimentos', alimentoRoutes);


const PORT = 3008;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
