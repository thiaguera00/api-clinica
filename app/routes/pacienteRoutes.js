const express = require('express');
const pacienteController = require('../controllers/pacienteController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Rotas de pacientes
 */

/**
 * @swagger
 * /api/pacientes/registrar:
 *   post:
 *     summary: Registra um novo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *               sexo:
 *                 type: string
 *               endereco:
 *                 type: object
 *                 properties:
 *                   rua:
 *                     type: string
 *                   bairro:
 *                     type: string
 *                   cidade:
 *                     type: string
 *                   estado:
 *                     type: string
 *               familia:
 *                 type: object
 *                 properties:
 *                   nome:
 *                     type: string
 *               convenio:
 *                 type: object
 *                 properties:
 *                   nome:
 *                     type: string
 *                   tipo:
 *                     type: string
 *     responses:
 *       201:
 *         description: Paciente cadastrado com sucesso
 *       500:
 *         description: Erro ao cadastrar o paciente
 */
router.post('/registrar', pacienteController.registro);

/**
 * @swagger
 * /api/pacientes/listar:
 *   get:
 *     summary: Retorna a lista de todos os pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nome:
 *                     type: string
 *                   data_nascimento:
 *                     type: string
 *                     format: date
 *                   sexo:
 *                     type: string
 *                   endereco:
 *                     type: object
 *                     properties:
 *                       rua:
 *                         type: string
 *                       bairro:
 *                         type: string
 *                       cidade:
 *                         type: string
 *                       estado:
 *                         type: string
 *                   familia:
 *                     type: object
 *                     properties:
 *                       nome:
 *                         type: string
 *                   convenio:
 *                     type: object
 *                     properties:
 *                       nome:
 *                         type: string
 *                       tipo:
 *                         type: string
 *       500:
 *         description: Erro ao listar pacientes
 */
router.get('/listar', pacienteController.listar);

/**
 * @swagger
 * /api/pacientes/filtrar/{id}:
 *   get:
 *     summary: Retorna um paciente pelo ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do paciente a ser retornado
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nome:
 *                   type: string
 *                 data_nascimento:
 *                   type: string
 *                   format: date
 *                 sexo:
 *                   type: string
 *                 endereco:
 *                   type: object
 *                   properties:
 *                     rua:
 *                       type: string
 *                     bairro:
 *                       type: string
 *                     cidade:
 *                       type: string
 *                     estado:
 *                       type: string
 *                 familia:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                 convenio:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                     tipo:
 *                       type: string
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro ao buscar paciente
 */
router.get('/filtrar/:id', pacienteController.filtrar);

/**
 * @swagger
 * /api/pacientes/atualizar/{id}:
 *   put:
 *     summary: Atualiza um paciente pelo ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do paciente a ser atualizado
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *               sexo:
 *                 type: string
 *               endereco:
 *                 type: object
 *                 properties:
 *                   rua:
 *                     type: string
 *                   bairro:
 *                     type: string
 *                   cidade:
 *                     type: string
 *                   estado:
 *                     type: string
 *               familia:
 *                 type: object
 *                 properties:
 *                   nome:
 *                     type: string
 *               convenio:
 *                 type: object
 *                 properties:
 *                   nome:
 *                     type: string
 *                   tipo:
 *                     type: string
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro ao atualizar paciente
 */
router.put('/atualizar/:id', pacienteController.atualizar);

/**
 * @swagger
 * /api/pacientes/deletar/{id}:
 *   delete:
 *     summary: Deleta um paciente pelo ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do paciente a ser deletado
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente deletado com sucesso
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro ao deletar paciente
 */
router.delete('/deletar/:id', pacienteController.deletar);


module.exports = router;
