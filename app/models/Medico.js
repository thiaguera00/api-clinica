const {DataTypes} = require('sequelize');
const sequelize = require('../../database');
const Especialidade = require('./Especialidade');
const Departamento = require('./Departamento');

const Medico = sequelize.define('Medico', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING('100'),
        allowNull: false
    },
    crm: {
        type: DataTypes.STRING('20'),
        allowNull: false
    },
    id_especialidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Especialidade,
            key: 'id'
        }
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
    tableName: 'medico',
    timestamps: false
});

Medico.belongsTo(Especialidade, {foreignKey: 'id', as: 'especialidade'});
Medico.belongsTo(Departamento, {foreignKey: 'id', as: 'departamento'});


module.exports = Medico;