const Tratamento = require('../models/Tratamento');
const Consulta = require('../models/Consulta');
const Receita = require('../models/Receita');

const tratamentoController = {
    adicionar: async (req, res) => {
        const { descricao, id_consulta } = req.body;

        if (!descricao || !id_consulta) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        try {
            const consulta = await Consulta.findByPk(id_consulta);

            if (!consulta) {
                return res.status(404).json({ error: 'Consulta não encontrada' });
            }

            const tratamento = await Tratamento.create({ descricao, id_consulta });

            const receita = await Receita.create({ id_tratamento: tratamento.id });

            return res.status(201).json({
                tratamento,
                receita
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao adicionar tratamento e receita' });
        }
    },
    editar: async (req, res) => {
        const { id } = req.params;
        const { descricao, id_consulta } = req.body;

        if (!descricao || !id_consulta) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        try {
            const tratamento = await Tratamento.findByPk(id);

            if (!tratamento) {
                return res.status(404).json({ error: 'Tratamento não encontrado' });
            }

            tratamento.descricao = descricao;
            tratamento.id_consulta = id_consulta;

            await tratamento.save();
            return res.status(200).json(tratamento);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao editar tratamento' });
        }
    },
    remover: async (req, res) => {
        const { id } = req.params;

        try {
            const tratamento = await Tratamento.findByPk(id);

            if (!tratamento) {
                return res.status(404).json({ error: 'Tratamento não encontrado' });
            }

            await Receita.destroy({ where: { id_tratamento: id } });
            await tratamento.destroy();

            return res.status(200).json({ message: 'Tratamento e receita removidos com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao remover tratamento e receita' });
        }
    },
    listar: async (req, res) => {
        try {
            const tratamentos = await Tratamento.findAll({
                include: [
                    {
                        model: Consulta,
                        as: 'consulta',
                        attributes: ['id', 'data_consulta'],
                    },
                ]
            });

            return res.status(200).json(tratamentos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar tratamentos' });
        }
    }
};

module.exports = tratamentoController;
