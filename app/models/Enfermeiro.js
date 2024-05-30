const {DataTypes} = require('sequelize');
const sequelize = require('../../database');
const Departamento = require('./Departamento');

const Enfermeiro = sequelize.define('Enfermeiro', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING('100'),
        allowNull: false,
    },
    coren: {
        type: DataTypes.STRING('20'),
        allowNull: false,
    },
    id_departamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Departamento,
            key: 'id'
        }
    }
}, {
    tableName: 'enfermeiro',
    timestamps: false,
});

Enfermeiro.belongsTo(Departamento, {foreignKey: 'id'});

module.exports = Enfermeiro;