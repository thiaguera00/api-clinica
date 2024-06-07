const Pagamento = require('../models/Pagamento');

const pagamentoController = {
    adicionar: async (req, res) => {
        try {
            const { valor, data_pagamento, id_paciente } = req.body;
            const novoPagamento = await Pagamento.create({ valor, data_pagamento, id_paciente });
            res.status(201).json(novoPagamento);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    listar: async (req, res) => {
        try {
            const pagamentos = await Pagamento.findAll({
                include: [
                    { model: require('../models/Paciente'), as: 'Paciente' }
                ]
            });
            res.status(200).json(pagamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = pagamentoController;
