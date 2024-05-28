const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Especialidade = sequelize.define('Especialidade', {
    id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'especialidade',
    timestamps: false,
});

module.exports = Especialidade;
