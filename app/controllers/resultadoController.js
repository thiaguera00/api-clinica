const Resultado = require('../models/Resultado');
const Exame = require('../models/Exame');

const resultadoController = {
    adicionar: async (req, res) => {
        try {
            const { descricao, id_exame } = req.body;
            const novoResultado = await Resultado.create({
                descricao,
                id_exame
            });
            res.status(201).json(novoResultado);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar o resultado' });
        }
    },

    listar: async (req, res) => {
        try {
            const resultados = await Resultado.findAll({
                include: [
                    { model: Exame, attributes: ['id', 'tipo', 'data_exame'] }
                ]
            });
            res.status(200).json(resultados);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar os resultados' });
        }
    },

    editar: async (req, res) => {
        try {
            const { id } = req.params;
            const { descricao, id_exame } = req.body;
            const resultado = await Resultado.findByPk(id);

            if (!resultado) {
                return res.status(404).json({ error: 'Resultado não encontrado' });
            }

            resultado.descricao = descricao;
            resultado.id_exame = id_exame;
            await resultado.save();

            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar o resultado' });
        }
    },

    remover: async (req, res) => {
        try {
            const { id } = req.params;
            const resultado = await Resultado.findByPk(id);

            if (!resultado) {
                return res.status(404).json({ error: 'Resultado não encontrado' });
            }

            await resultado.destroy();
            res.status(200).json({ message: 'Resultado removido com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao remover o resultado' });
        }
    }
};

module.exports = resultadoController;
