const { DataTypes, BelongsTo, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('../../database');
const Paciente = require('./Paciente');
const Sala = require('./Sala');

const Hospitalizacao = sequelize.define('Hospitalizacao', {
    id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
    },
    data_internacao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    data_alta: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_paciente: {
        type: 'integer',
        references: {
            model: Paciente,
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
    tableName: 'hospitalizacao',
    timestamps: false,
});

Hospitalizacao.belongsTo(Paciente, {foreignKey: 'id'});
Hospitalizacao.belongsTo(Sala, {foreignKey: 'id'});

module.exports = Hospitalizacao;