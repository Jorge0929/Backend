const express = require('express');
// Instancia del Router de Express
const router = express.Router(); 
// Importamos nuestro controlador
const authController = require('../controllers/authController');
// Importar el middleware
const { protect } = require('../middleware/authMiddleware'); 

console.log('Tipo de authController.getCurrentUser:', typeof authController.getCurrentUser);
console.log('Tipo de protect:', typeof protect);

//ruta para el registro de usuarios
router.post('/register', authController.registerUser);

// ruta para el login de usuarios
router.post('/login', authController.loginUser);

//Ruta para verificar el middleware
router.get('/me', protect, authController.getCurrentUser);

// Exportar el router para usarlo en server.js
module.exports = router;