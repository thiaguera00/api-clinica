const express = require('express');
const consultaController = require('../controllers/consultaController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Consulta
 *   description: Rotas de Consulta
 */

/**
 * @swagger
 * /api/consultas/registrar:
 *   post:
 *     summary: Registrar uma nova Consulta
 *     tags: [Consulta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data_consulta:
 *                 type: string
 *                 format: date-time
 *               id_paciente:
 *                 type: integer
 *               id_medico:
 *                 type: integer
 *               id_sala:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Consulta criada com sucesso
 *       500:
 *         description: Erro ao criar consulta
 */
router.post('/registrar', consultaController.registrar);

/**
 * @swagger
 * /api/consultas/listar:
 *   get:
 *     summary: Listar todas as Consultas
 *     tags: [Consulta]
 *     responses:
 *       200:
 *         description: Lista de consultas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   data_consulta:
 *                     type: string
 *                     format: date-time
 *                   id_paciente:
 *                     type: integer
 *                   id_medico:
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
 *                   Medico:
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
 *         description: Erro ao listar consultas
 */
router.get('/listar', consultaController.listar);

/**
 * @swagger
 * /api/consultas/atualizar/{id}:
 *   put:
 *     summary: Atualizar informações de uma Consulta
 *     tags: [Consulta]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da Consulta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data_consulta:
 *                 type: string
 *                 format: date-time
 *               id_paciente:
 *                 type: integer
 *               id_medico:
 *                 type: integer
 *               id_sala:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Consulta atualizada com sucesso
 *       404:
 *         description: Consulta não encontrada
 *       500:
 *         description: Erro ao atualizar consulta
 */
router.put('/atualizar/:id', consultaController.update);

/**
 * @swagger
 * /api/consultas/deletar/{id}:
 *   delete:
 *     summary: Deletar uma Consulta por ID
 *     tags: [Consulta]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da Consulta
 *     responses:
 *       200:
 *         description: Consulta excluída com sucesso
 *       404:
 *         description: Consulta não encontrada
 *       500:
 *         description: Erro ao excluir consulta
 */
router.delete('/deletar/:id', consultaController.delete);

module.exports = router;
