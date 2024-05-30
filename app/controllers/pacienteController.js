const Paciente = require('../models/Paciente');
const Familia = require('../models/Familia');
const Convenio = require('../models/Convenio');
const Endereco = require('../models/Endereco');


const pacienteController = {
    registro: async (req, res) => {
        try {
            const { nome, data_nascimento, sexo, endereco, familia, convenio } = req.body;

            const newEndereco = await Endereco.create({
                rua: endereco.rua,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                estado: endereco.estado
            });

            const newFamilia = await Familia.create({
                nome: familia.nome
            });

            const newConvenio = await Convenio.create({
                nome: convenio.nome,
                tipo: convenio.tipo
            });

            const newPaciente = await Paciente.create({
                nome: nome,
                data_nascimento: data_nascimento,
                sexo: sexo,
                id_endereco: newEndereco.id,
                id_familia: newFamilia.id,
                id_convenio: newConvenio.id
            });

            res.status(201).json(newPaciente);
        } catch (error) {
            console.error("Error creating records:", error);
            res.status(500).json({ error: 'An error occurred while creating the patient.' });
        }
    },

    listar: async (_req, res) => {
        try {
            const pacientes = await Paciente.findAll({
                include: [
                    {
                        model: Endereco,
                        as: 'endereco',
                        attributes: ['rua', 'bairro', 'cidade', 'estado']
                    },
                    {
                        model: Familia,
                        as: 'familia',
                        attributes: ['nome']
                    },
                    {
                        model: Convenio,
                        as: 'convenio',
                        attributes: ['nome', 'tipo']
                    }
                ],
                attributes: ['id', 'nome', 'data_nascimento', 'sexo']
            });
            

            res.status(200).json(pacientes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error });
        }
    },

    filtrar: async (req, res) => {
        try {
            const { id } = req.params;
    
            const paciente = await Paciente.findByPk(id, {
                include: [
                    { model: Endereco, as: 'endereco' },
                    { model: Familia, as: 'familia' },
                    { model: Convenio, as: 'convenio' }
                ]
            });
    
            if (!paciente) {
                return res.status(404).json({ error: 'Paciente não encontrado' });
            }
    
            res.status(200).json(paciente);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar paciente' });
        }
    },

    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, data_nascimento, sexo, endereco, familia, convenio } = req.body;

            const paciente = await Paciente.findByPk(id);

            if (!paciente) {
                return res.status(404).json({ error: 'Paciente não encontrado' });
            }

            await paciente.update({ nome, data_nascimento, sexo });

            if (endereco) {
                const pacienteEndereco = await Endereco.findByPk(paciente.id_endereco);
                if (pacienteEndereco) {
                    await pacienteEndereco.update(endereco);
                } else {
                    const novoEndereco = await Endereco.create(endereco);
                    paciente.id_endereco = novoEndereco.id;
                    await paciente.save();
                }
            }

            if (familia) {
                const pacienteFamilia = await Familia.findByPk(paciente.id_familia);
                if (pacienteFamilia) {
                    await pacienteFamilia.update(familia);
                } else {
                    const novaFamilia = await Familia.create(familia);
                    paciente.id_familia = novaFamilia.id;
                    await paciente.save();
                }
            }

            if (convenio) {
                const pacienteConvenio = await Convenio.findByPk(paciente.id_convenio);
                if (pacienteConvenio) {
                    await pacienteConvenio.update(convenio);
                } else {
                    const novoConvenio = await Convenio.create(convenio);
                    paciente.id_convenio = novoConvenio.id;
                    await paciente.save();
                }
            }
            res.status(200).json(paciente);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao atualizar paciente' });
        }
    },

    deletar: async (req, res) => {
        try {
            const { id } = req.params;

            const paciente = await Paciente.findByPk(id);

            if (!paciente) {
                return res.status(404).json({ error: 'Paciente não encontrado' });
            }
                await paciente.destroy();

                await Endereco.destroy({ where: { id: paciente.id_endereco } });

                await Familia.destroy({ where: { id: paciente.id_familia } });

                await Convenio.destroy({ where: { id: paciente.id_convenio } });

            res.status(200).json({ message: 'Paciente deletado com sucesso' });
        } catch (err) {
            res.status(500).json({ err });
        }
    },
};

module.exports = pacienteController;

