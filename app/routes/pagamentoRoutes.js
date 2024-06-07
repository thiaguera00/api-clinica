const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

/**
 * @swagger
 * tags:
 *   name: Pagamento
 *   description: Rotas para pagamentos
 */

/**
 * @swagger
 * /api/pagamentos/registrar:
 *   post:
 *     summary: Adicionar um novo Pagamento
 *     tags: [Pagamento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *                 format: float
 *               data_pagamento:
 *                 type: string
 *                 format: date-time
 *               id_paciente:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pagamento criado com sucesso
 *       500:
 *         description: Erro ao criar pagamento
 */
router.post('/registrar', pagamentoController.adicionar);

/**
 * @swagger
 * /api/pagamentos/listar:
 *   get:
 *     summary: Listar todos os Pagamentos
 *     tags: [Pagamento]
 *     responses:
 *       200:
 *         description: Lista de pagamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   valor:
 *                     type: number
 *                     format: float
 *                   data_pagamento:
 *                     type: string
 *                     format: date-time
 *                   id_paciente:
 *                     type: integer
 *                   Paciente:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *       500:
 *         description: Erro ao listar pagamentos
 */
router.get('/listar', pagamentoController.listar);

module.exports = router;
