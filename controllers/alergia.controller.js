// 1. Importamos el modelo con el que vamos a trabajar.
const { Alergia } = require('../models');

// --- FUNCIÓN PARA CREAR UN NUEVO ALIMENTO ---
const createAlergia = async (req, res) => {
  try {
    // 2. Extraemos los datos del cuerpo de la petición.
    // El frontend nos enviará un JSON con la información del nuevo alimento.
    const { nombre, descripcion} = req.body;

    // 3. Validación básica de entrada.
    if (!nombre || !descripcion=== undefined) {
      return res.status(400).json({ error: 'Los campos nombre y descripción no pueden estar vacios' });
    }

    // 4. Usamos el método `create` de Sequelize para insertar el nuevo registro.
    const nuevaAlergia = await Alergia.create({
      nombre,
      descripcion
    });

    // 5. Devolvemos una respuesta de éxito (201 Created) con el objeto del alimento recién creado.
    res.status(201).json(nuevaAlergia);

  } catch (error) {
    // 6. Si algo falla (ej. un error de la base de datos), devolvemos un error 500.
    res.status(500).json({ error: 'No se pudo crear la alergia.', details: error.message });
  }
};


// --- FUNCIÓN PARA OBTENER TODOS LOS ALIMENTOS ---
const getAllAlergias = async (req, res) => {
  try {
    // 7. Usamos el método `findAll` para obtener todos los registros de la tabla 'alimentos'.
    const alergias = await Alergia.findAll();
    
    // 8. Devolvemos la lista de alimentos en formato JSON.
    res.status(200).json(alergias);

  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los alimentos.', details: error.message });
  }
};


// --- FUNCIÓN PARA OBTENER UN ALIMENTO POR SU ID ---
const getAlergiaById = async (req, res) => {
  try {
    // 9. Obtenemos el ID de los parámetros de la ruta (ej. /api/alimentos/123).
    const { id } = req.params;

    // 10. Usamos `findByPk` (Find By Primary Key) para buscar un alimento por su ID.
    const alergia = await Alergia.findByPk(id);

    // 11. Si no se encuentra el alimento, devolvemos un error 404 (Not Found).
    if (!alergia) {
      return res.status(404).json({ error: 'Alergia no encontrada.' });
    }

    // 12. Si se encuentra, lo devolvemos.
    res.status(200).json(alergia);

  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el alergia.', details: error.message });
  }
};


// --- FUNCIÓN PARA ACTUALIZAR UN ALIMENTO ---
const updateAlergia = async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;

    // 13. Buscamos el alimento para asegurarnos de que existe.
    const alergia = await Alergia.findByPk(id);
    if (!alergia) {
      return res.status(404).json({ error: 'Alimento no encontrado para actualizar.' });
    }

    // 14. Usamos el método `update` del objeto encontrado para aplicar los cambios.
    await alergia.update(dataToUpdate);

    // 15. Devolvemos un mensaje de éxito y el objeto del alimento ya actualizado.
    res.status(200).json({ message: 'Alimento actualizado correctamente.', alergia });

  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el alimento.', details: error.message });
  }
};


// --- FUNCIÓN PARA ELIMINAR UN ALIMENTO ---
const deleteAlergia = async (req, res) => {
  try {
    const { id } = req.params;

    const alergia = await Alergia.findByPk(id);
    if (!alergia) {
      return res.status(404).json({ error: 'Alergia no encontrado para eliminar.' });
    }

    // 16. Usamos el método `destroy` para eliminar el registro de la base de datos.
    await alergia.destroy();

    // 17. Devolvemos una respuesta de éxito. Usamos el código 204 (No Content) que es
    // común para operaciones de borrado exitosas que no devuelven contenido.
    res.status(204).send();

  } catch (error) {
    // Aquí podrías tener un error si el alimento está siendo usado en un plan (foreign key constraint).
    // Sequelize lanzará un error que podemos capturar.
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(409).json({ error: 'No se puede eliminar el alimento porque está siendo utilizado en uno o más planes de alimentación.' });
    }
    res.status(500).json({ error: 'No se pudo eliminar el alimento.', details: error.message });
  }
};


// 18. Exportamos todas las funciones para que puedan ser usadas en el archivo de rutas.
module.exports = {
  createAlergia,
  getAllAlergias,
  getAlergiaById,
  updateAlergia,
  deleteAlergia
};