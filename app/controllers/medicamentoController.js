const Medicamento = require('../models/Medicamento');
const Receita = require('../models/Receita');

const medicamentoController = {
    adicionar: async (req, res) => {
        const { nome, id_receita } = req.body;

        if (!nome || !id_receita) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        try {
            const receita = await Receita.findByPk(id_receita);

            if (!receita) {
                return res.status(404).json({ error: 'Receita não encontrada' });
            }

            const medicamento = await Medicamento.create({ nome, id_receita });
            return res.status(201).json(medicamento);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao adicionar medicamento' });
        }
    },
    editar: async (req, res) => {
        const { id } = req.params;
        const { nome, id_receita } = req.body;

        if (!nome || !id_receita) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        try {
            const medicamento = await Medicamento.findByPk(id);

            if (!medicamento) {
                return res.status(404).json({ error: 'Medicamento não encontrado' });
            }

            medicamento.nome = nome;
            medicamento.id_receita = id_receita;

            await medicamento.save();
            return res.status(200).json(medicamento);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao editar medicamento' });
        }
    },
    remover: async (req, res) => {
        const { id } = req.params;

        try {
            const medicamento = await Medicamento.findByPk(id);

            if (!medicamento) {
                return res.status(404).json({ error: 'Medicamento não encontrado' });
            }

            await medicamento.destroy();
            return res.status(200).json({ message: 'Medicamento removido com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao remover medicamento' });
        }
    },
    listar: async (req, res) => {
        try {
            const medicamentos = await Medicamento.findAll({
                include: [
                    {
                        model: Receita,
                        as: 'receita',
                        attributes: ['id'],
                    }
                ]
            });

            return res.status(200).json(medicamentos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar medicamentos' });
        }
    }
};

module.exports = medicamentoController;
