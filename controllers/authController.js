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


// Función para iniciar sesión de un usuario existente
exports.loginUser = async (req, res) => {
    //Obtener email y password del cuerpo de la petición
    const { email, password } = req.body;

    try {
        //Verificar si se dieron el email y password
        if (!email || !password) {
            return res.status(400).json({ message: 'Por favor, proporciona email y contraseña.' });
        }

        // Buscar al usuario en la base de datos 
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            // Si no se encuentra el usuario, enviar un error
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // 4. Comparar la contraseña proporcionada con la contraseña hasheada, usar el metodo comparePassword
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            // Si las contraseñas no coinciden, error genérico
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // 5. Si las credenciales son correctas, generar un token JWT
        const payload = {
            userId: user._id,
            nombre: user.nombre
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            // El token dura 1 hora
            { expiresIn: '1h' }
        );

        //Enviar el token y la información del usuario 
        res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            token: token,
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Error en loginUser:", error);
        res.status(500).json({ message: 'Error interno del servidor al intentar iniciar sesión.' });
    }
};

// Función para obtener los datos del usuario actualmente autenticado
exports.getCurrentUser = async (req, res) => {
    try {

        //Buscar al usuario en la base de datos usando el userId del token
        const user = await User.findById(req.user.userId).select('-password');

        if (!user) {
            // Esto no debería suceder si el token es válido y el usuario no ha sido eliminado,
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        //Enviar los datos del usuario
        res.status(200).json(user);

    } catch (error) {
        console.error("Error en getCurrentUser:", error);
        res.status(500).json({ message: 'Error interno del servidor al obtener datos del usuario.' });
    }
};

// Al final de controllers/authController.js
console.log('--- authController.js ---');
console.log('Contenido de module.exports:', module.exports);
console.log('Contenido de exports:', exports);