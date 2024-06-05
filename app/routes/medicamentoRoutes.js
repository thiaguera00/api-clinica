const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');

/**
 * @swagger
 * tags:
 *   name: Medicamento
 *   description: Rotas para medicamentos
 */

/**
 * @swagger
 * /api/medicamentos/registrar:
 *   post:
 *     summary: Adicionar um novo Medicamento
 *     tags: [Medicamento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               id_receita:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Medicamento criado com sucesso
 *       500:
 *         description: Erro ao criar medicamento
 */
router.post('/registrar', medicamentoController.adicionar);

/**
 * @swagger
 * /api/medicamentos/listar:
 *   get:
 *     summary: Listar todos os Medicamentos
 *     tags: [Medicamento]
 *     responses:
 *       200:
 *         description: Lista de medicamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   id_receita:
 *                     type: integer
 *                   Receita:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       descricao:
 *                         type: string
 *       500:
 *         description: Erro ao listar medicamentos
 */
router.get('/listar', medicamentoController.listar);

/**
 * @swagger
 * /api/medicamentos/atualizar/{id}:
 *   put:
 *     summary: Atualizar informações de um Medicamento
 *     tags: [Medicamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do Medicamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               id_receita:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Medicamento atualizado com sucesso
 *       404:
 *         description: Medicamento não encontrado
 *       500:
 *         description: Erro ao atualizar medicamento
 */
router.put('/atualizar/:id', medicamentoController.editar);

/**
 * @swagger
 * /api/medicamentos/deletar/{id}:
 *   delete:
 *     summary: Deletar um Medicamento por ID
 *     tags: [Medicamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do Medicamento
 *     responses:
 *       200:
 *         description: Medicamento excluído com sucesso
 *       404:
 *         description: Medicamento não encontrado
 *       500:
 *         description: Erro ao excluir medicamento
 */
router.delete('/deletar/:id', medicamentoController.remover);

module.exports = router;
