const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Departamento = require('./Departamento')

const Sala = sequelize.define('Sala', {
    id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
    },
    numero: {
        type: 'integer',
        allowNull: false,
    },
    id_departamento: {
        type: 'integer',
        references: {
            model: Departamento,
            key: 'id'
        }
    },
    id_sala: {
        type: 'integer',
        references: {
            model: Sala,
            key: 'id'
        }
    }
}, {
    tableName: 'sala',
    timestamps: false,
});

Sala.belongsTo(Departamento, {foreignKey: 'id'});

module.exports = Sala;