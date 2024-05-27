const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Familia = sequelize.define('familia', {
    id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING('50'),
        allowNull: true
    }
});

module.exports = Familia;