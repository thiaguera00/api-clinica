const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Consulta = require('./Consulta');

const Tratamento = sequelize.define('Tratamento', {
    id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    id_consulta: {
        type: 'integer',
        references: {
            model: Consulta,
            key: 'id'
        }
    }
}, {
    tableName: 'tratamento',
    timestamps: false,
});

Tratamento.belongsTo(Consulta, {foreignKey: 'id'});

module.exports = Tratamento;