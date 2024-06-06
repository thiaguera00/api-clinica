const express = require('express');
const sequelize = require('./database'); 
const cors = require('cors');
const usuarioRoutes = require('./app/routes/usuarioRoutes');
const pacienteRoutes = require('./app/routes/pacienteRoutes');
const medicoRoutes = require('./app/routes/medicoRoutes');
const consultaRoutes = require('./app/routes/consultaRoutes');
const tratamentoRoutes = require('./app/routes/tratamentoRoutes');
const medicamentoRoutes = require('./app/routes/medicamentoRoutes');
const hospitalizacaoRoutes = require('./app/routes/hospitalizacaoRoutes');
const examesRoutes = require('./app/routes/exameRoutes');
const resultadoRoutes = require('./app/routes/resultadoRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:4000', // Permite acesso da origem http://localhost:4000
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

app.use(express.json());

app.use('/api/usuario', usuarioRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/medico', medicoRoutes);
app.use('/api/consulta', consultaRoutes);
app.use('/api/tratamento', tratamentoRoutes);
app.use('/api/medicamento', medicamentoRoutes);
app.use('/api/hospitalizacao', hospitalizacaoRoutes);
app.use('/api/exames', examesRoutes);
app.use('/api/resultado', resultadoRoutes);

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
app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'Documentação API clínica',
          version: '1.0.0',
          description: 'informações API'
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
