const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authmiddleware');

router.post('/registro', usuarioController.registro);
router.post('/login', usuarioController.login);

module.exports = router;
