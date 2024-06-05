const express = require('express');
const router = express.Router();
const tratamentoController = require('../controllers/tratamentoController');

/**
 * @swagger
 * tags:
 *   name: Tratamento
 *   description: Rotas de tratamento
 */

/**
 * @swagger
 * /api/tratamentos/registrar:
 *   post:
 *     summary: Adicionar um novo Tratamento
 *     tags: [Tratamento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *               id_consulta:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tratamento criado com sucesso
 *       500:
 *         description: Erro ao criar tratamento
 */
router.post('/registrar', tratamentoController.adicionar);

/**
 * @swagger
 * /api/tratamentos/listar:
 *   get:
 *     summary: Listar todos os Tratamentos
 *     tags: [Tratamento]
 *     responses:
 *       200:
 *         description: Lista de tratamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   descricao:
 *                     type: string
 *                   id_consulta:
 *                     type: integer
 *                   Consulta:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       data_consulta:
 *                         type: string
 *                         format: date
 *       500:
 *         description: Erro ao listar tratamentos
 */
router.get('/listar', tratamentoController.listar);

/**
 * @swagger
 * /api/tratamentos/atualizar/{id}:
 *   put:
 *     summary: Atualizar informações de um Tratamento
 *     tags: [Tratamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do Tratamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *               id_consulta:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tratamento atualizado com sucesso
 *       404:
 *         description: Tratamento não encontrado
 *       500:
 *         description: Erro ao atualizar tratamento
 */
router.put('/atualizar/:id', tratamentoController.editar);

/**
 * @swagger
 * /api/tratamentos/deletar/{id}:
 *   delete:
 *     summary: Deletar um Tratamento por ID
 *     tags: [Tratamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do Tratamento
 *     responses:
 *       200:
 *         description: Tratamento excluído com sucesso
 *       404:
 *         description: Tratamento não encontrado
 *       500:
 *         description: Erro ao excluir tratamento
 */
router.delete('/deletar/:id', tratamentoController.remover);

module.exports = router;
