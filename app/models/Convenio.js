const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Convenio = sequelize.define('Convenio', {
    id: {
        type: DataTypes.INTEGER,
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

}, {
    tableName: 'convenio',  
    timestamps: false,
});

module.exports = Convenio;