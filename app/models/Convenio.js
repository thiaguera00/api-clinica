const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Convenio = sequelize.define('convenio', {
    id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING('100'),
        allowNull: true,
    },
    tipo: {
        type: DataTypes.STRING('100'),
        allowNull: true,
    }

});

module.exports = Convenio;