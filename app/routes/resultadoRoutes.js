const express = require('express');
const router = express.Router();
const resultadoController = require('../controllers/resultadoController');

/**
 * @swagger
 * tags:
 *   name: Resultado
 *   description: Rotas de resultado de exames
 */

/**
 * @swagger
 * /api/resultados/registrar:
 *   post:
 *     summary: Adicionar um novo Resultado
 *     tags: [Resultado]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *               id_exame:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Resultado criado com sucesso
 *       500:
 *         description: Erro ao criar resultado
 */
router.post('/registrar', resultadoController.adicionar);

/**
 * @swagger
 * /api/resultados/listar:
 *   get:
 *     summary: Listar todos os Resultados
 *     tags: [Resultado]
 *     responses:
 *       200:
 *         description: Lista de resultados retornada com sucesso
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
 *                   id_exame:
 *                     type: integer
 *                   Exame:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       tipo:
 *                         type: string
 *                       data_exame:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Erro ao listar resultados
 */
router.get('/listar', resultadoController.listar);

/**
 * @swagger
 * /api/resultados/atualizar/{id}:
 *   put:
 *     summary: Atualizar informações de um Resultado
 *     tags: [Resultado]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do Resultado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *               id_exame:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Resultado atualizado com sucesso
 *       404:
 *         description: Resultado não encontrado
 *       500:
 *         description: Erro ao atualizar resultado
 */
router.put('/atualizar/:id', resultadoController.editar);

/**
 * @swagger
 * /api/resultados/deletar/{id}:
 *   delete:
 *     summary: Deletar um Resultado por ID
 *     tags: [Resultado]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do Resultado
 *     responses:
 *       200:
 *         description: Resultado excluído com sucesso
 *       404:
 *         description: Resultado não encontrado
 *       500:
 *         description: Erro ao excluir resultado
 */
router.delete('/deletar/:id', resultadoController.remover);

module.exports = router;
