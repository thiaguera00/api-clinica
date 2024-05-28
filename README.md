# API Clinica

## Stack utilizada

**Back-end:** Node, Express, Sequelize

**Documentação:** Swagger


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/thiaguera00/api-clinica.git
```

Entre no diretório do projeto

```bash
  cd api-clinica
```

Instale as dependências

```bash
  npm install
```

Crie um arquivo na raiz do projeto chamado database.js que seja nessa estrutura:
```javascript
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('api_clinica', 'seu_usuario', 'sua_senha', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
}
```
Inicie o servidor

```bash
  npm run dev
```


## Documentação de Rotas

Este projeto está documentado no swagger! Basta acessar a doc quando rodar o projeto para visualizar as rotas.

`http://localhost:3000/api-docs`
