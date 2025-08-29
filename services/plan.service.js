const { Plan, Comidas_plan, Alimentos_comida, Alimento, sequelize } = require('../models');

const createFullPlan = async (planData, id_nutricionista) => {
    const t = await sequelize.transaction();
    try {
        const { comidas, ...datosDelPlan } = planData;
        const nuevoPlan = await Plan.create({
            ...datosDelPlan,
            id_nutricionista: id_nutricionista,
        }, { transaction: t });

        for (const comidaData of comidas) {
            const nuevaComidaPlan = await Comidas_plan.create({
                id_plan: nuevoPlan.id,
                dia_semana: comidaData.dia_semana,
                tipo_comida: comidaData.tipo_comida
            }, { transaction: t });
            for (const alimentoData of comidaData.alimentos) {
                const infoAlimento = await Alimento.findByPk(alimentoData.id_alimento, { transaction: t });
                if (!infoAlimento) {
                    throw new Error(`El alimento con ID ${alimentoData.id_alimento} no fue encontrado.`);
                }
                const factor = alimentoData.cantidad_g / 100.0;
                await Alimentos_comida.create({
                    id_comida_plan: nuevaComidaPlan.id,
                    id_alimento: alimentoData.id_alimento,
                    cantidad_g: alimentoData.cantidad_g,
                    calorias_calculadas: (infoAlimento.calorias_100g * factor).toFixed(2),
                    proteinas_calculadas: (infoAlimento.proteinas_g * factor).toFixed(2),
                    carbohidratos_calculados: (infoAlimento.carbohidratos_g * factor).toFixed(2),
                    grasas_calculadas: (infoAlimento.grasas_g * factor).toFixed(2),
                }, { transaction: t });
            }
        }
        await t.commit();
        const planCompletoCreado = await Plan.findByPk(nuevoPlan.id, {
            include: [
                {
                    model: Comidas_plan,
                    as: 'plan_comidasplan',
                    include: [
                        {
                            model: Alimentos_comida,
                            as: 'comidasplan_alimentoscomida',
                            include: [{ model: Alimento, as: 'alimentoscomida_alimento' }]
                        }
                    ]
                }
            ]
        });

        return planCompletoCreado; // ¡El plato está listo para servir!

    } catch (error) {
        console.error("Fallo en la transacción. Revirtiendo cambios:", error.message);
        await t.rollback();
        throw error;
    }
};
module.exports = {
    createFullPlan
};