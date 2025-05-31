// Importar User
const User = require('../models/User');
// Importar jsonwebtoken
const jwt = require('jsonwebtoken');   

// Función para registrar un usuario nuevo
exports.registerUser = async (req, res) => {
    // Obtener datos del cuerpo de la petición 
    const { nombre, email, password } = req.body;

    try {
        //Verificar si estan todos los campos
        if (!nombre || !email || !password) {
            return res.status(400).json({ message: 'Por favor, proporciona nombre, email y contraseña.' });
        }

        // Verificar si el email ya está registrado 
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }

        //Crear una nueva instancia del usuario 
        const newUser = new User({
            nombre,
            email: email.toLowerCase(),
            password 
        });

        //Guardar el usuario nuevo
        await newUser.save();

        //Enviar una respuesta de éxito
        res.status(201).json({
            message: 'Usuario registrado exitosamente.',
            // No enviar el objeto de usuario completo
            user: {
                id: newUser._id,
                nombre: newUser.nombre,
                email: newUser.email
            }
        });

    } catch (error) {
        // Manejar errores de validación de Mongoose y del servidor
        if (error.name === 'ValidationError') {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({ message: "Error de validación", errors });
        }
        console.error("Error en registerUser:", error);
        res.status(500).json({ message: 'Error interno del servidor al registrar el usuario.' });
    }
};

// Aquí iran las funciónes del login 
