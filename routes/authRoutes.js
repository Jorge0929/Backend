const express = require('express');
// Instancia del Router de Express
const router = express.Router(); 
// Importamos nuestro controlador
const authController = require('../controllers/authController');

//ruta para el registro de usuarios
router.post('/register', authController.registerUser);

// ruta para el login de usuarios
router.post('/login', authController.loginUser);
// Exportar el router para usarlo en server.js
module.exports = router;