const { Paciente, Usuario, Nutricionista, Niveles_actividad, Alergia, Restricciones_alimentaria, Intolerancia } = require('../models');

// Función de ayuda para incluir asociaciones comunes
const getPacienteIncludes = () => [
    {
        model: Usuario,
        as: 'paciente_usuario',
        attributes: ['nombre', 'apellido', 'email'] // Solo traer datos relevantes del usuario
    },
    {
        model: Nutricionista,
        as: 'paciente_nutricionista',
        include: [{ // Incluir también el usuario del nutricionista
            model: Usuario,
            as: 'nutricionista_usuario',
            attributes: ['nombre', 'apellido']
        }]
    },
    { model: Niveles_actividad, as: 'paciente_actividad' },
    { model: Alergia, as: 'alergias', through: { attributes: [] } }, // through evita traer datos de la tabla pívot
    { model: Restricciones_alimentaria, as: 'retriccions', through: { attributes: [] } },
    { model: Intolerancia, as: 'intolerancias', through: { attributes: [] } },
];


// Crear un nuevo paciente
const createPaciente = async (req, res) => {
    try {
        const { 
            id_usuario, id_nutricionista, fecha_nacimiento, sexo, peso_kg, altura_cm, 
            objetivo, condicion_medica, id_actividad,
            alergias, retriccions, intolerancias // Estos vienen como arrays de IDs: [1, 2, 3]
        } = req.body;

        // 1. Crear el paciente con sus datos principales
        const nuevoPaciente = await Paciente.create({
            id_usuario, id_nutricionista, fecha_nacimiento, sexo, peso_kg, altura_cm,
            objetivo, condicion_medica, id_actividad
        });

        // 2. Asociar las relaciones Many-to-Many si se proporcionaron
        if (alergias && alergias.length > 0) {
            await nuevoPaciente.setAlergias(alergias);
        }
        if (retriccions && retriccions.length > 0) {
            await nuevoPaciente.setRetriccions(retriccions);
        }
        if (intolerancias && intolerancias.length > 0) {
            await nuevoPaciente.setIntolerancias(intolerancias);
        }

        // 3. Devolver el paciente creado con todas sus asociaciones
        const pacienteCompleto = await Paciente.findByPk(nuevoPaciente.id, {
            include: getPacienteIncludes()
        });

        res.status(201).json(pacienteCompleto);
    } catch (err) {
        console.error(err);
        // Manejo de errores de Sequelize (ej. foreign key no encontrada)
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ error: 'ID de usuario o nutricionista no válido.' });
        }
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Datos inválidos', details: err.errors.map(e => e.message) });
        }
        res.status(500).json({ error: 'No se pudo crear el paciente.' });
    }
};

// Obtener todos los pacientes
const getPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.findAll({
            include: getPacienteIncludes()
        });
        res.json(pacientes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudieron obtener los pacientes.' });
    }
};

// Obtener un paciente por ID
const getPacienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.findByPk(id, {
            include: getPacienteIncludes()
        });

        if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado.' });
        }

        res.json(paciente);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo obtener el paciente.' });
    }
};

// Actualizar un paciente por ID
const updatePaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const { alergias, retriccions, intolerancias, ...datosPaciente } = req.body;

        const paciente = await Paciente.findByPk(id);

        if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado.' });
        }

        // 1. Actualizar los datos directos del paciente
        await paciente.update(datosPaciente);

        // 2. Actualizar las asociaciones (esto reemplaza las anteriores)
        if (alergias) { // Si viene el array (incluso vacío), se actualiza
            await paciente.setAlergias(alergias);
        }
        if (retriccions) {
            await paciente.setRetriccions(retriccions);
        }
        if (intolerancias) {
            await paciente.setIntolerancias(intolerancias);
        }

        // 3. Devolver el paciente actualizado con sus asociaciones
        const pacienteActualizado = await Paciente.findByPk(id, {
            include: getPacienteIncludes()
        });

        res.json({ message: 'Paciente actualizado correctamente', paciente: pacienteActualizado });
    } catch (err) {
        console.error(err);
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Datos inválidos', details: err.errors.map(e => e.message) });
        }
        res.status(500).json({ error: 'No se pudo actualizar el paciente.' });
    }
};

// Eliminar un paciente por ID
const deletePaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.findByPk(id);

        if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado.' });
        }

        await paciente.destroy(); // Esto también elimina las relaciones en las tablas pívot

        res.json({ message: 'Paciente eliminado correctamente.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo eliminar el paciente.' });
    }
};

module.exports = {
    createPaciente,
    getPacientes,
    getPacienteById,
    updatePaciente,
    deletePaciente
};