const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Familia = sequelize.define('Familia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING('50'),
        allowNull: true
    }
}, {
    tableName:'familia',
    timestamps: false,
});

module.exports = Familia;