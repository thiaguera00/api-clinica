const Agendamento = require('../models/Agendamento');

const agendamentoController = {
    adicionar: async (req, res) => {
        try {
            const { data_agendamento, id_paciente, id_medico } = req.body;
            const novoAgendamento = await Agendamento.create({ data_agendamento, id_paciente, id_medico });
            res.status(201).json(novoAgendamento);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    listar: async (req, res) => {
        try {
            const agendamentos = await Agendamento.findAll({
                include: [
                    { model: require('../models/Paciente'), as: 'Paciente' },
                    { model: require('../models/Medico'), as: 'Medico' }
                ]
            });
            res.status(200).json(agendamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    editar: async (req, res) => {
        try {
            const { id } = req.params;
            const { data_agendamento, id_paciente, id_medico } = req.body;
            const agendamento = await Agendamento.findByPk(id);
            if (agendamento) {
                agendamento.data_agendamento = data_agendamento;
                agendamento.id_paciente = id_paciente;
                agendamento.id_medico = id_medico;
                await agendamento.save();
                res.status(200).json(agendamento);
            } else {
                res.status(404).json({ error: 'Agendamento não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    remover: async (req, res) => {
        try {
            const { id } = req.params;
            const agendamento = await Agendamento.findByPk(id);
            if (agendamento) {
                await agendamento.destroy();
                res.status(200).json({ message: 'Agendamento excluído com sucesso' });
            } else {
                res.status(404).json({ error: 'Agendamento não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = agendamentoController;
