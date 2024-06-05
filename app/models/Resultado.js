const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Exame = require('./Exame');

const Resultado = sequelize.define('Resultado', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    id_exame: {
        type: DataTypes.INTEGER,
        references: {
            model: Exame,
            key: 'id'
        }
    }
}, {
    tableName: 'resultado',
    timestamps: false,
});

Resultado.belongsTo(Exame, {foreignKey: 'id_exame'});

module.exports = Resultado;