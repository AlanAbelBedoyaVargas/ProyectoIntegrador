const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuario');
const planRoutes1 = require('./routes/plan1');
//const perfilRoutes = require('./routes/perfil');
const authRoutes = require('./routes/auth');
const nivelesRoutes = require('./routes/nivelesActividad');
const nutricionistaRoutes = require('./routes/nutricionista');
const planRoutes=  require('./routes/plan');
const alimentoRoutes = require('./routes/alimento')
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para manejar CORS

app.use(cors());

// Configurar rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/planes', planRoutes1);
//app.use('/api/perfiles', perfilRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/niveles', nivelesRoutes);
app.use('/api/nutricionistas', nutricionistaRoutes);
app.use('/api/plan', planRoutes);
app.use('/api/alimentos', alimentoRoutes);


const PORT = 3008;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
