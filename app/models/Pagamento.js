const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Paciente = require('./Paciente');

const Pagamento = sequelize.define('Pagamento', {
    id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    data_pagamento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_paciente: {
        type: 'integer',
        references: {
            model: Paciente,
            key: 'id'
        }
    }
}, {
    tableName: 'pagamento',
    timestamps: false,
});

Pagamento.belongsTo(Paciente, {foreignKey: 'id'});

module.exports = Pagamento;