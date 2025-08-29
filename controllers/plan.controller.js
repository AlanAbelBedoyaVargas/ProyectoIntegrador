// 1. Importamos nuestro servicio. El controlador no sabe de modelos, solo de servicios.
const planService = require('../services/plan.service');

// Esta es la función que nuestra ruta llama.
const createFullPlan = async (req, res) => {
  try {
    // 2. El controlador extrae los datos relevantes de la petición.
    const planData = req.body;
    
    // Suponemos que tienes un middleware de autenticación que añade el usuario logueado al objeto req.
    // Si no lo tienes aún, puedes enviar el id_nutricionista en el body por ahora.
    const id_nutricionista = req.user.id; // Forma ideal
    // const id_nutricionista = 1; // Forma temporal para probar

    // 3. Llama al servicio para que haga todo el trabajo pesado.
    // Le pasa los datos que necesita y espera la respuesta.
    const nuevoPlanCompleto = await planService.createFullPlan(planData, id_nutricionista);
    
    // 4. Si el servicio termina con éxito, envía una respuesta positiva.
    res.status(201).json({
      success: true,
      message: 'Plan de alimentación creado exitosamente.',
      data: nuevoPlanCompleto
    });

  } catch (error) {
    // 5. Si el servicio lanza un error (porque la transacción falló),
    // el controlador lo atrapa aquí y envía una respuesta de error genérica.
    res.status(500).json({ 
      success: false,
      message: 'Error al crear el plan de alimentación.', 
      error: error.message // Enviamos el mensaje de error para debugging
    });
  }
};

// Exportamos la función para que el archivo de rutas la pueda usar.
module.exports = {
  createFullPlan
};