const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Paciente = require('./Paciente');
const Medico = require('./Medico');

const Agendamento = sequelize.define('Agendamento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    data_agendamento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        references: {
            model: Paciente,
            key: 'id'
        }
    },
    id_medico: {
        type: DataTypes.INTEGER,
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