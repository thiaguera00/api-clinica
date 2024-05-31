const express = require('express');
const medicoController = require('../controllers/medicoController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Medicos
 *   description: API para gerenciar médicos
 */

/**
 * @swagger
 * /api/medico/registro:
 *   post:
 *     summary: Registrar um novo médico
 *     tags: [Medicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               crm:
 *                 type: string
 *               especialidade:
 *                 type: object
 *                 properties:
 *                   descricao:
 *                     type: string
 *               departamento:
 *                 type: object
 *                 properties:
 *                   nome:
 *                     type: string
 *     responses:
 *       201:
 *         description: Médico registrado com sucesso
 *       500:
 *         description: Erro ao criar Médico
 */
router.post('/registro', medicoController.registro);

/**
 * @swagger
 * /api/medico/filtrar/{id}:
 *   get:
 *     summary: Retorna um Medico pelo ID
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do Medico a ser retornado
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Medico encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nome:
 *                   type: string
 *                 crm:
 *                   type: string
 *                 departamento:
 *                   type: object
 *                   properties:
 *                     id:
 *                      type: string
 *                     nome:
 *                       type: string
 *                 especialidade:
 *                   type: object
 *                   properties:
 *                     id:
 *                      type: string
 *                     nome:
 *                       type: string
 * 
 *       404:
 *         description: Medico não encontrado
 *       500:
 *         description: Erro ao buscar Medico
 */
router.get('/filtrar/:id', medicoController.filtrar);

/**
 * @swagger
 * /api/medico/listar:
 *   get:
 *     summary: Retorna uma lista de Medico 
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Lista de medicos
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Listagem de medicos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nome:
 *                   type: string
 *                 crm:
 *                   type: string
 *                 departamento:
 *                   type: object
 *                   properties:
 *                     id:
 *                      type: string
 *                     nome:
 *                       type: string
 *                 especialidade:
 *                   type: object
 *                   properties:
 *                     id:
 *                      type: string
 *                     nome:
 *                       type: string
 * 
 *       404:
 *         description: Medico não encontrado
 *       500:
 *         description: Erro ao listar medicos
 */
router.get('/listar', medicoController.listar);

/**
 * @swagger
 * /api/medico/atualizar/{id}:
 *   put:
 *     summary: Atualizar informações de um médico
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               crm:
 *                 type: string
 *               especialidade:
 *                 type: object
 *                 properties:
 *                   descricao:
 *                     type: string
 *               departamento:
 *                 type: object
 *                 properties:
 *                   nome:
 *                     type: string
 *     responses:
 *       200:
 *         description: Médico atualizado com sucesso
 *       404:
 *         description: Médico não encontrado
 *       500:
 *         description: Erro ao atualizar Médico
 */
router.put('/atualizar/:id', medicoController.atualizar);

/**
 * @swagger
 * /api/medico/deletar/{id}:
 *   delete:
 *     summary: Deletar um médico por ID
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do médico
 *     responses:
 *       200:
 *         description: Médico excluído com sucesso
 *       404:
 *         description: Médico não encontrado
 *       500:
 *         description: Erro ao excluir Médico
 */
router.delete('/deletar/:id', medicoController.deletar);



module.exports = router;
