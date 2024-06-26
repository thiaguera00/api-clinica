const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Paciente = require('./Paciente');

const Pagamento = sequelize.define('Pagamento', {
    id: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        references: {
            model: Paciente,
            key: 'id'
        }
    }
}, {
    tableName: 'pagamento',
    timestamps: false,
});

Pagamento.belongsTo(Paciente, {foreignKey: 'id_paciente'});

module.exports = Pagamento;