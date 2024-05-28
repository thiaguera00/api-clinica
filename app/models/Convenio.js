const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Convenio = sequelize.define('Convenio', {
    id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING('100'),
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING('50'),
        allowNull: false,
    }

});

module.exports = Convenio;