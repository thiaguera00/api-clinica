const Especialidade = require('../models/Especialidade');
const Departamento = require('../models/Departamento');
const Medico = require('../models/Medico');

const medicoController = {
    registro: async (req, res) => {
        try {
            const {nome, crm, especialidade, departamento} = req.body

            const newEspecialidade = await Especialidade.create({
                descricao: especialidade.descricao
            });
    
            const newDepartamento = await Departamento.create({
                nome: departamento.nome
            });
    
            const newMedico = await Medico.create({
                nome: nome,
                crm: crm,
                id_especialidade: newEspecialidade.id,
                id_departamento: newDepartamento.id
            });

            res.status(201).json(newMedico)
        } catch (error) {
            console.error("Error ao salvar dados:", error);
            res.status(500).json({ error: 'Error ao cadastrar Medico.' });
        }
    },

    filtrar: async (req, res) => {
        try {
            const { id } = req.params;
            const medico = await Medico.findOne({
                where: { id: id },
                include: [
                    { model: Especialidade, as: 'especialidade' },
                    { model: Departamento, as: 'departamento' }
                ]
            });

            if (!medico) {
                return res.status(404).json({ error: 'Médico não encontrado.' });
            }

            res.status(200).json(medico);
        } catch (error) {
            console.error("Error ao buscar dados:", error);
            res.status(500).json({ error: 'Error ao buscar Medico.' });
        }
    },

    listar: async(req, res) => {
        try {
            const medicos = await Medico.findAll({
                include: [
                    { model: Especialidade, as: 'especialidade' },
                    { model: Departamento, as: 'departamento' }
                ]
            });

            res.status(200).json(medicos);
        } catch (error) {
            console.error("Error ao listar dados:", error);
            res.status(500).json({ error: 'Error ao listar Medicos.' });
        }
    },

    atualizar: async(req, res) => {
        try {
            const { id } = req.params;
            const { nome, crm, especialidade, departamento } = req.body;

            const medico = await Medico.findByPk(id);
            if (!medico) {
                return res.status(404).json({ error: 'Médico não encontrado.' });
            }

            const updatedEspecialidade = await Especialidade.findByPk(medico.id_especialidade);
            const updatedDepartamento = await Departamento.findByPk(medico.id_departamento);

            if (especialidade && updatedEspecialidade) {
                await updatedEspecialidade.update({ descricao: especialidade.descricao });
            }

            if (departamento && updatedDepartamento) {
                await updatedDepartamento.update({ nome: departamento.nome });
            }

            await medico.update({
                nome: nome || medico.nome,
                crm: crm || medico.crm
            });

            res.status(200).json(medico);
        } catch (error) {
            console.error("Error ao atualizar dados:", error);
            res.status(500).json({ error: 'Error ao atualizar Medico.' });
        }
    },

    deletar: async (req, res) => {
        try {
            const { id } = req.params;

            const medico = await Medico.findByPk(id);
            if (!medico) {
                return res.status(404).json({ error: 'Médico não encontrado.' });
            }
            await medico.destroy();

            await Especialidade.destroy({where: {id: medico.id_especialidade}});

            await Departamento.destroy({where: {id: medico.id_departamento}});
            


            res.status(200).json({ message: 'Médico excluído com sucesso.' });
        } catch (error) {
            console.error("Error ao excluir dados:", error);
            res.status(500).json({ error: 'Error ao excluir Medico.' });
        }
    }
}

module.exports = medicoController;