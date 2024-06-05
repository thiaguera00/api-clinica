const express = require('express');
const router = express.Router();
const exameController = require('../controllers/exameController');

/**
 * @swagger
 * tags:
 *   name: Exame
 *   description: Rotas para exames
 */

/**
 * @swagger
 * /api/exames/registrar:
 *   post:
 *     summary: Adicionar um novo Exame
 *     tags: [Exame]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *               data_exame:
 *                 type: string
 *                 format: date-time
 *               id_paciente:
 *                 type: integer
 *               id_medico:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Exame criado com sucesso
 *       500:
 *         description: Erro ao criar exame
 */
router.post('/registrar', exameController.adicionar);

/**
 * @swagger
 * /api/exames/listar:
 *   get:
 *     summary: Listar todos os Exames
 *     tags: [Exame]
 *     responses:
 *       200:
 *         description: Lista de exames retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   tipo:
 *                     type: string
 *                   data_exame:
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
 *         description: Erro ao listar exames
 */
router.get('/listar', exameController.listar);

/**
 * @swagger
 * /api/exames/atualizar/{id}:
 *   put:
 *     summary: Atualizar informações de um Exame
 *     tags: [Exame]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do Exame
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *               data_exame:
 *                 type: string
 *                 format: date-time
 *               id_paciente:
 *                 type: integer
 *               id_medico:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Exame atualizado com sucesso
 *       404:
 *         description: Exame não encontrado
 *       500:
 *         description: Erro ao atualizar exame
 */
router.put('/atualizar/:id', exameController.editar);

/**
 * @swagger
 * /api/exames/deletar/{id}:
 *   delete:
 *     summary: Deletar um Exame por ID
 *     tags: [Exame]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do Exame
 *     responses:
 *       200:
 *         description: Exame excluído com sucesso
 *       404:
 *         description: Exame não encontrado
 *       500:
 *         description: Erro ao excluir exame
 */
router.delete('/deletar/:id', exameController.remover);

module.exports = router;
