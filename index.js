const express = require('express');
const usuarioRoutes = require('./routes/usuario');
const planRoutes = require('./routes/plan');

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Configurar rutas
app.use('/api', usuarioRoutes);
app.use('/api', planRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
