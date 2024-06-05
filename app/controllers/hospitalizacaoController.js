const Hospitalizacao = require('../models/Hospitalizacao');
const Paciente = require('../models/Paciente');
const Sala = require('../models/Sala');

const hospitalizacaoController = {
    adicionar: async (req, res) => {
        const { data_internacao, data_alta, id_paciente, id_sala } = req.body;

        if (!data_internacao || !id_paciente || !id_sala) {
            return res.status(400).json({ error: 'Data de internação, paciente e sala são obrigatórios' });
        }

        try {
            const paciente = await Paciente.findByPk(id_paciente);
            const sala = await Sala.findByPk(id_sala);

            if (!paciente) {
                return res.status(404).json({ error: 'Paciente não encontrado' });
            }

            if (!sala) {
                return res.status(404).json({ error: 'Sala não encontrada' });
            }

            const hospitalizacao = await Hospitalizacao.create({ data_internacao, data_alta, id_paciente, id_sala });
            return res.status(201).json(hospitalizacao);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao adicionar hospitalização' });
        }
    },
    editar: async (req, res) => {
        const { id } = req.params;
        const { data_internacao, data_alta, id_paciente, id_sala } = req.body;

        if (!data_internacao || !id_paciente || !id_sala) {
            return res.status(400).json({ error: 'Data de internação, paciente e sala são obrigatórios' });
        }

        try {
            const hospitalizacao = await Hospitalizacao.findByPk(id);

            if (!hospitalizacao) {
                return res.status(404).json({ error: 'Hospitalização não encontrada' });
            }

            hospitalizacao.data_internacao = data_internacao;
            hospitalizacao.data_alta = data_alta;
            hospitalizacao.id_paciente = id_paciente;
            hospitalizacao.id_sala = id_sala;

            await hospitalizacao.save();
            return res.status(200).json(hospitalizacao);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao editar hospitalização' });
        }
    },
    remover: async (req, res) => {
        const { id } = req.params;

        try {
            const hospitalizacao = await Hospitalizacao.findByPk(id);

            if (!hospitalizacao) {
                return res.status(404).json({ error: 'Hospitalização não encontrada' });
            }

            await hospitalizacao.destroy();
            return res.status(200).json({ message: 'Hospitalização removida com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao remover hospitalização' });
        }
    },
    listar: async (req, res) => {
        try {
            const hospitalizacoes = await Hospitalizacao.findAll({
                include: [
                    {
                        model: Paciente,
                        attributes: ['id', 'nome'],
                    },
                    {
                        model: Sala,
                        attributes: ['id', 'numero'],
                    }
                ]
            });

            return res.status(200).json(hospitalizacoes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar hospitalizações' });
        }
    }
};

module.exports = hospitalizacaoController;
