const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Receita = require('./Receita');

const Medicamento = sequelize.define('Medicamento', {
    id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING('100'),
        allowNull: false,
    },
    id_receita: {
        type: 'integer',
        references: {
            model: Receita,
            key: 'id'
        }
    }
}, {
    tableName: 'medicamento',
    timestamps: false,
});

Medicamento.belongsTo(Receita, {foreignKey: 'id'});

module.exports = Medicamento;