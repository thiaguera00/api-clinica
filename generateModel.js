const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

function generateModel(modelName, tableName) {
    const templatePath = path.join(__dirname, './app/templates', 'model.ejs');
    const outputPath = path.join(__dirname, './app/models', `${modelName}.js`);

    ejs.renderFile(templatePath, { modelName, tableName }, (err, str) => {
        if (err) {
            console.error('Erro ao gerar o modelo:', err);
            return;
        }

        fs.writeFileSync(outputPath, str, 'utf8');
        console.log(`Modelo ${modelName} criado com sucesso em ${outputPath}`);
    });
}

const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Uso: node generateModel.js <ModelName> <TableName>');
    process.exit(1);
}

const [modelName, tableName] = args;
generateModel(modelName, tableName);