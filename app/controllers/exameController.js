const Exame = require('../models/Exame');
const Paciente = require('../models/Paciente');
const Medico = require('../models/Medico');

const exameController = {
    adicionar: async (req, res) => {
        try {
            const { tipo, data_exame, id_paciente, id_medico } = req.body;
            const novoExame = await Exame.create({
                tipo,
                data_exame,
                id_paciente,
                id_medico
            });
            res.status(201).json(novoExame);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar o exame' });
        }
    },

    listar: async (req, res) => {
        try {
            const exames = await Exame.findAll({
                include: [
                    { model: Paciente, attributes: ['id', 'nome'] },
                    { model: Medico, attributes: ['id', 'nome'] }
                ]
            });
            res.status(200).json(exames);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar os exames' });
        }
    },

    editar: async (req, res) => {
        try {
            const { id } = req.params;
            const { tipo, data_exame, id_paciente, id_medico } = req.body;
            const exame = await Exame.findByPk(id);

            if (!exame) {
                return res.status(404).json({ error: 'Exame não encontrado' });
            }

            exame.tipo = tipo;
            exame.data_exame = data_exame;
            exame.id_paciente = id_paciente;
            exame.id_medico = id_medico;
            await exame.save();

            res.status(200).json(exame);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar o exame' });
        }
    },

    remover: async (req, res) => {
        try {
            const { id } = req.params;
            const exame = await Exame.findByPk(id);

            if (!exame) {
                return res.status(404).json({ error: 'Exame não encontrado' });
            }

            await exame.destroy();
            res.status(200).json({ message: 'Exame removido com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao remover o exame' });
        }
    }
};

module.exports = exameController;
