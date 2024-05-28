const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Tratamento = require('./Tratamento');

const Receita = sequelize.define('Receita', {
    id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
    },
    id_tratamento: {
        type: 'integer',
        references: {
            model: Tratamento,
            key: 'id'
        }
    }
}, {
    tableName: 'receita',
    timestamps: false,
});

Receita.belongsTo(Tratamento, {foreignKey: 'id'});

module.exports = Receita;