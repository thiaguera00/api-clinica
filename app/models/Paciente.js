const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Endereco = require('./Endereco'); 
const Familia = require('./Familia');   
const Convenio = require('./Convenio'); 

const Paciente = sequelize.define('Paciente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  sexo: {
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  id_endereco: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Endereco,
      key: 'id'
    }
  },
  id_familia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Familia,
      key: 'id'
    }
  },
  id_convenio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Convenio,
      key: 'id'
    }
  }
}, {
  tableName: 'Paciente',
  timestamps: false
});


Paciente.belongsTo(Endereco, { foreignKey: 'id_endereco', as: 'endereco' });
Paciente.belongsTo(Familia, { foreignKey: 'id_familia', as: 'familia' });
Paciente.belongsTo(Convenio, { foreignKey: 'id_convenio', as: 'convenio'});

module.exports = Paciente;
