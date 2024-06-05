const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Departamento = require('./Departamento')

const Sala = sequelize.define('Sala', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_departamento: {
        type: DataTypes.INTEGER,
        references: {
            model: Departamento,
            key: 'id'
        }
    }
}, {
    tableName: 'sala',
    timestamps: false,
});

Sala.belongsTo(Departamento, {foreignKey: 'id_departamento'});

module.exports = Sala;