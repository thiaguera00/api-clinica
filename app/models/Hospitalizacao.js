const { DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../../database');
const Paciente = require('./Paciente');
const Sala = require('./Sala');

const Hospitalizacao = sequelize.define('Hospitalizacao', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    data_internacao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    data_alta: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        references: {
            model: Paciente,
            key: 'id'
        }
    },
    id_sala: {
        type: DataTypes.INTEGER,
        references: {
            model: Sala,
            key: 'id'
        }
    }
}, {
    tableName: 'hospitalizacao',
    timestamps: true,
});

Hospitalizacao.belongsTo(Paciente, {foreignKey: 'id_paciente'});
Hospitalizacao.belongsTo(Sala, {foreignKey: 'id_sala'});

module.exports = Hospitalizacao;