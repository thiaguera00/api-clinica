const express = require('express');
const sequelize = require('./database'); 
const usuarioRoutes = require('./app/routes/usuarioRoutes');
const pacienteRoutes = require('./app/routes/pacienteRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


const app = express();

app.use(express.json());

app.use('/api/usuario', usuarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados foi estabelecida com sucesso.');
    return sequelize.sync({ alter: true }); 
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

  // Rota de Health Check
  app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'API Documentation',
          version: '1.0.0',
          description: 'API Information'
      },
      servers: [
          {
              url: 'http://localhost:3000',
              description: 'Local server'
          }
      ]
  },
  apis: ['./app/routes/*.js'] 
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));