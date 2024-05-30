const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Medico = require('./Medico');
const Paciente = require('./Paciente');

const Exame = sequelize.define('Exame', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: DataTypes.STRING('100'),
        allowNull: false,
    },
    data_exame: {
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
    tableName: 'exame',
    timestamps: false,
});

Exame.belongsTo(Paciente, {foreignKey: 'id'});
Exame.belongsTo(Medico, {foreignKey: 'id'});

module.exports = Exame;