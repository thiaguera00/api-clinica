const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Receita = require('./Receita');

const Medicamento = sequelize.define('Medicamento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING('100'),
        allowNull: false,
    },
    id_receita: {
        type: DataTypes.INTEGER,
        references: {
            model: Receita,
            key: 'id'
        }
    }
}, {
    tableName: 'medicamento',
    timestamps: false,
});

Medicamento.belongsTo(Receita, {foreignKey: 'id_receita', as: 'receita'}); 

module.exports = Medicamento;