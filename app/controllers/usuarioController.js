const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const usuarioController = {
    registro: async (req, res, next) => {
        const { nome, email, senha } = req.body;

        try {
            const hashedSenha = await bcrypt.hash(senha, 10);

            Usuario.create({
                nome,
                email,
                senha: hashedSenha
            });

            res.status(201).json({ message: 'Usuário cadastrado com sucesso'});
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({ error: 'Email já está em uso' });
            } else {
                next(error);
            }
        }
    },

    login: async (req, res, next) => {
        const { email, senha } = req.body;

        try {
            const usuario = await Usuario.findOne({ where: { email } });

            if (!usuario) {
                return res.status(404).send({ message: 'Usuário não existe.' });
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);

            if (!senhaValida) {
                return res.status(401).send({ message: 'Senha incorreta' });
            }

            const token = jwt.sign({ id: usuario.id, email: usuario.email }, 'seuSegredo', { expiresIn: '1h' });

            res.status(200).json({
                message: 'Login bem-sucedido',
                token: token,
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });
        } catch (e) {
            next(e);
        }
    }
};

module.exports = usuarioController;
