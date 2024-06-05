const express = require('express');
const router = express.Router();
const hospitalizacaoController = require('../controllers/hospitalizacaoController');

/**
 * @swagger
 * tags:
 *   name: Hospitalizacao
 *   description: Rotas para hospitalização
 */

/**
 * @swagger
 * /api/hospitalizacao/registrar:
 *   post:
 *     summary: Registrar uma nova Hospitalização
 *     tags: [Hospitalizacao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data_internacao:
 *                 type: string
 *                 format: date
 *               data_alta:
 *                 type: string
 *                 format: date
 *               id_paciente:
 *                 type: integer
 *               id_sala:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Hospitalização criada com sucesso
 *       500:
 *         description: Erro ao criar Hospitalização
 */
router.post('/registrar', hospitalizacaoController.adicionar);

/**
 * @swagger
 * /api/hospitalizacao/atualizar/{id}:
 *   put:
 *     summary: Atualizar informações de uma Hospitalização
 *     tags: [Hospitalizacao]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da Hospitalização
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data_internacao:
 *                 type: string
 *                 format: date
 *               data_alta:
 *                 type: string
 *                 format: date
 *               id_paciente:
 *                 type: integer
 *               id_sala:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Hospitalização atualizada com sucesso
 *       404:
 *         description: Hospitalização não encontrada
 *       500:
 *         description: Erro ao atualizar Hospitalização
 */
router.put('/atualizar/:id', hospitalizacaoController.editar);

/**
 * @swagger
 * /api/hospitalizacao/deletar/{id}:
 *   delete:
 *     summary: Deletar uma Hospitalização por ID
 *     tags: [Hospitalizacao]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da Hospitalização
 *     responses:
 *       200:
 *         description: Hospitalização excluída com sucesso
 *       404:
 *         description: Hospitalização não encontrada
 *       500:
 *         description: Erro ao excluir Hospitalização
 */
router.delete('/deletar/:id', hospitalizacaoController.remover);

/**
 * @swagger
 * /api/hospitalizacao/listar:
 *   get:
 *     summary: Retorna a lista de todas as hospitalizações
 *     tags: [Hospitalizacao]
 *     responses:
 *       200:
 *         description: Lista de hospitalizações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   data_internacao:
 *                     type: string
 *                     format: date
 *                   data_alta:
 *                     type: string
 *                     format: date
 *                   id_paciente:
 *                     type: integer
 *                   id_sala:
 *                     type: integer
 *                   Paciente:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                   Sala:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       numero:
 *                         type: integer
 *       500:
 *         description: Erro ao listar hospitalizações
 */
router.get('/listar', hospitalizacaoController.listar);

module.exports = router;
