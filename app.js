const express = require('express');
const sequelize = require('./database'); 

const app = express();

app.use(express.json());

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados foi estabelecida com sucesso.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Sincronização com o banco de dados concluída.');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });