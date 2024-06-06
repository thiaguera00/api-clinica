const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

/**
 * @swagger
 * tags:
 *   name: Agendamento
 *   description: Rotas para agendamento
 */

/**
 * @swagger
 * /api/agendamento/registrar:
 *   post:
 *     summary: Adicionar um novo Agendamento
 *     tags: [Agendamento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data_agendamento:
 *                 type: string
 *                 format: date-time
 *               id_paciente:
 *                 type: integer
 *               id_medico:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *       500:
 *         description: Erro ao criar agendamento
 */
router.post('/registrar', agendamentoController.adicionar);

/**
 * @swagger
 * /api/agendamento/listar:
 *   get:
 *     summary: Listar todos os Agendamentos
 *     tags: [Agendamento]
 *     responses:
 *       200:
 *         description: Lista de agendamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   data_agendamento:
 *                     type: string
 *                     format: date-time
 *                   id_paciente:
 *                     type: integer
 *                   id_medico:
 *                     type: integer
 *                   Paciente:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                   Medico:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *       500:
 *         description: Erro ao listar agendamentos
 */
router.get('/listar', agendamentoController.listar);

/**
 * @swagger
 * /api/agendamento/atualizar/{id}:
 *   put:
 *     summary: Atualizar informações de um Agendamento
 *     tags: [Agendamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do Agendamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data_agendamento:
 *                 type: string
 *                 format: date-time
 *               id_paciente:
 *                 type: integer
 *               id_medico:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *       404:
 *         description: Agendamento não encontrado
 *       500:
 *         description: Erro ao atualizar agendamento
 */
router.put('/atualizar/:id', agendamentoController.editar);

/**
 * @swagger
 * /api/agendamento/deletar/{id}:
 *   delete:
 *     summary: Deletar um Agendamento por ID
 *     tags: [Agendamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do Agendamento
 *     responses:
 *       200:
 *         description: Agendamento excluído com sucesso
 *       404:
 *         description: Agendamento não encontrado
 *       500:
 *         description: Erro ao excluir agendamento
 */
router.delete('/deletar/:id', agendamentoController.remover);

module.exports = router;
