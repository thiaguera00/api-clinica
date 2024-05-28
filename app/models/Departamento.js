const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Departamento = sequelize.define('Departamento', {
    id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
       type: DataTypes.STRING('100') 
    }
}, {
    tableName: 'departamento',
    timestamps: false,
});

module.exports = Departamento;
