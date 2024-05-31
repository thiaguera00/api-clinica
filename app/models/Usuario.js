const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
}, {
    tableName: 'usuario',
    timestamps: false,
});

module.exports = Usuario;
