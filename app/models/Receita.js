const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Tratamento = require('./Tratamento');

const Receita = sequelize.define('Receita', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_tratamento: {
        type: DataTypes.INTEGER,
        references: {
            model: Tratamento,
            key: 'id'
        }
    }
}, {
    tableName: 'receita',
    timestamps: false,
});

Receita.belongsTo(Tratamento, {foreignKey: 'id_tratamento'});

module.exports = Receita;