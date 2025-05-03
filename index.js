const express = require('express');
const usuarioRoutes = require('./routes/usuario');
const planRoutes = require('./routes/plan');
const perfilRoutes = require('./routes/perfil');
const authRoutes = require('./routes/auth');
const nivelesRoutes = require('./routes/nivelesActividad');
const nutricionistaRoutes = require('./routes/nutricionista');
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Configurar rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/planes', planRoutes);
app.use('/api/perfiles', perfilRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/niveles', nivelesRoutes);
app.use('/api/nutricionistas', nutricionistaRoutes);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
