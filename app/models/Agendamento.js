const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Paciente = require('./Paciente');
const Medico = require('./Medico');

const Agendamento = sequelize.define('Agendamento', {
    id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
    },
    data_agendamento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_paciente: {
        type: 'integer',
        references: {
            model: Paciente,
            key: 'id'
        }
    },
    id_medico: {
        type: 'integer',
        references: {
            model: Medico,
            key: 'id'
        }
    }
}, {
    tableName: 'agendamento',
    timestamps: false,
});

Agendamento.belongsTo(Paciente, {foreignKey: 'id'});
Agendamento.belongsTo(Medico, {foreignKey: 'id'});

module.exports = Agendamento;