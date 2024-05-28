const {DataTypes} = require('sequelize') 
const sequelize = require('../../database')

const Endereco = sequelize.define('Endereco', {
    id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
    },
    rua: {
        type: DataTypes.STRING('100'),
        allowNull: false,
    },
    bairro: {
        type: DataTypes.STRING('50'),
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING('50'),
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING('50'),
        allowNull: false,
    }
}, {
    tableName: 'endereco',
    timestamps: false,
});

module.exports = Endereco;