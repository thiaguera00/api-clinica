const {DataTypes} = require('sequelize')
const sequelize = require('../../database');
const Medico = require('./Medico');
const Sala = require('./Sala');
const Paciente = require('./Paciente');

const Consulta = sequelize.define('Consulta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    data_consulta: {
       type: DataTypes.DATE,
       allowNull: false, 
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        references: {
            model: Paciente,
            key: 'id'
        }
    },
    id_medico: {
        type: DataTypes.INTEGER,
        references: {
            model: Medico,
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
    tableName: 'consulta',
    timestamps: false,
});

Consulta.belongsTo(Paciente, {foreignKey: 'id_paciente'});
Consulta.belongsTo(Medico, {foreignKey: 'id_medico'});
Consulta.belongsTo(Sala, {foreignKey: 'id_sala'});

module.exports = Consulta;