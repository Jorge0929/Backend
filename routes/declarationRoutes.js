const express = require('express');
// Crear una instancia del Router de Express
const router = express.Router(); 
// Importamos el controlador de declaraciones
const declarationController = require('../controllers/declarationController');

// Importar el middleware de autenticación
const { protect } = require('../middleware/authMiddleware');

//CREAR un nuevo borrador de declaración
router.post('/', protect, declarationController.createDeclaration);

//OBTENER TODAS las declaraciones del usuario autenticado
router.get('/', protect, declarationController.getUserDeclarations);

//OBTENER UN borrador de declaración específico POR SU ID
router.get('/:idDeclaracion', protect, declarationController.getDeclarationById);

//ACTUALIZAR un borrador de declaración existente POR SU ID
router.put('/:idDeclaracion', protect, declarationController.updateDeclaration);

module.exports = router; 