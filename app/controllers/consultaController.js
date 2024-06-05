const Consulta = require('../models/Consulta');
const Paciente = require('../models/Paciente');
const Medico = require('../models/Medico');
const Sala = require('../models/Sala');

const consultaController = {
    registrar: async (req, res) => {
        const { data_consulta, id_paciente, id_medico, numero_sala, id_departamento } = req.body;

        if (!data_consulta || !id_paciente || !id_medico || !numero_sala || !id_departamento) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        try {
            const paciente = await Paciente.findByPk(id_paciente);
            const medico = await Medico.findByPk(id_medico);

            if (!paciente) {
                return res.status(404).json({ error: 'Paciente não encontrado' });
            }
            if (!medico) {
                return res.status(404).json({ error: 'Médico não encontrado' });
            }

            let sala = await Sala.findOne({ where: { numero: numero_sala, id_departamento } });

            if (!sala) {
                sala = await Sala.create({
                    numero: numero_sala,
                    id_departamento
                });
            }

            const novaConsulta = await Consulta.create({
                data_consulta,
                id_paciente,
                id_medico,
                id_sala: sala.id
            });

            return res.status(201).json(novaConsulta);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao registrar consulta' });
        }
    },

    listar: async (req, res) => {
        try {
            const consultas = await Consulta.findAll({
                include: [
                    {
                        model: Paciente,
                        attributes: ['id', 'nome', 'data_nascimento', 'sexo'],
                        as: 'Paciente'
                    },
                    {
                        model: Medico,
                        attributes: ['id', 'nome', 'crm'],
                        as: 'Medico'
                    },
                    {
                        model: Sala,
                        attributes: ['id', 'numero', 'id_departamento'],
                        as: 'Sala'
                    }
                ]
            });

            return res.status(200).json(consultas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar consultas' });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { data_consulta, id_paciente, id_medico, numero_sala, id_departamento } = req.body;

        if (!data_consulta || !id_paciente || !id_medico || !numero_sala || !id_departamento) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        try {
            const consulta = await Consulta.findByPk(id);

            if (!consulta) {
                return res.status(404).json({ error: 'Consulta não encontrada' });
            }

            const paciente = await Paciente.findByPk(id_paciente);
            const medico = await Medico.findByPk(id_medico);

            if (!paciente) {
                return res.status(404).json({ error: 'Paciente não encontrado' });
            }
            if (!medico) {
                return res.status(404).json({ error: 'Médico não encontrado' });
            }

            let sala = await Sala.findOne({ where: { numero: numero_sala, id_departamento } });

            if (!sala) {
                sala = await Sala.create({
                    numero: numero_sala,
                    id_departamento
                });
            }

            consulta.data_consulta = data_consulta;
            consulta.id_paciente = id_paciente;
            consulta.id_medico = id_medico;
            consulta.id_sala = sala.id;

            await consulta.save();

            return res.status(200).json(consulta);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar consulta' });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;

        try {
            const consulta = await Consulta.findByPk(id);

            if (!consulta) {
                return res.status(404).json({ error: 'Consulta não encontrada' });
            }

            await consulta.destroy();

            return res.status(200).json({ message: 'Consulta deletada com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar consulta' });
        }
    }
};

module.exports = consultaController;
