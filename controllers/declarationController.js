// Importar el modelo Declaration
const Declaration = require('../models/Declaration');

//Crear un Nuevo Borrador de Declaración
exports.createDeclaration = async (req, res) => {
    try {
        // Obtener los datos del cuerpo de la petición
        const { añoFiscal, datosPersonales, ingresos, deducciones, resumenEstimado, estado } = req.body;
        const idUsuario = req.user.userId;

        // Validación básica 
        if (!añoFiscal) {
            return res.status(400).json({ message: 'El año fiscal es obligatorio.' });
        }

        // Crear una nueva instancia de la declaración
        const newDeclaration = new Declaration({
            añoFiscal,
            datosPersonales: datosPersonales || {},
            ingresos: ingresos || {},
            deducciones: deducciones || {},
            resumenEstimado: resumenEstimado || {},
            estado: estado || 'en_progreso',
            idUsuario
        });

        // Guardar la nueva declaración en la base de datos
        const savedDeclaration = await newDeclaration.save();

        // Enviar una respuesta de éxito con la declaración guardada
        res.status(201).json({
            message: 'Borrador de declaración guardado exitosamente.',
            declaration: savedDeclaration
        });

    } catch (error) {
        console.error("Error en createDeclaration:", error);
        if (error.name === 'ValidationError') {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({ message: "Error de validación al crear la declaración", errors });
        }
        res.status(500).json({ message: 'Error interno del servidor al guardar la declaración.' });
    }
};

//Obtener Todas las Declaraciones del Usuario
exports.getUserDeclarations = async (req, res) => {
    try {
        const idUsuario = req.user.userId; 

        // Buscamos todas las declaraciones que pertenezcan al usuario logueado
        const declarations = await Declaration.find({ idUsuario: idUsuario }).sort({ createdAt: -1 });

        // En caso de que no halla declaraciones
        if (!declarations || declarations.length === 0) {
            return res.status(200).json([]); 
        }

        // Enviamos la lista de declaraciones
        res.status(200).json(declarations);

    } catch (error) {
        console.error("Error en getUserDeclarations:", error);
        res.status(500).json({ message: 'Error interno del servidor al obtener las declaraciones.' });
    }
};

// Obtener un Borrador de Declaración Específico por ID 
exports.getDeclarationById = async (req, res) => {
    try {
        const idUsuario = req.user.userId;
        const idDeclaracion = req.params.idDeclaracion; 

        const declaration = await Declaration.findOne({ _id: idDeclaracion, idUsuario: idUsuario });

        if (!declaration) {
            return res.status(404).json({ message: 'Declaración no encontrada o no pertenece al usuario.' });
        }

        res.status(200).json(declaration);

    } catch (error) {
        console.error("Error en getDeclarationById:", error);
        if (error.kind === 'ObjectId') { // Error común si el ID no tiene el formato correcto de MongoDB
             return res.status(400).json({ message: 'ID de declaración inválido.' });
        }
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};


// Actualizar un Borrador de Declaración 
exports.updateDeclaration = async (req, res) => {
    try {
        const idUsuario = req.user.userId;
        const idDeclaracion = req.params.idDeclaracion;
        const updates = req.body; // Los campos a actualizar

        // Opciones para la actualización: new: true devuelve el documento actualizado, runValidators ejecuta las validaciones del esquema
        const options = { new: true, runValidators: true };

        const updatedDeclaration = await Declaration.findOneAndUpdate(
            { _id: idDeclaracion, idUsuario: idUsuario }, 
            updates,                                    
            options                                     
        );

        if (!updatedDeclaration) {
            return res.status(404).json({ message: 'Declaración no encontrada para actualizar o no pertenece al usuario.' });
        }

        res.status(200).json({
            message: 'Declaración actualizada exitosamente.',
            declaration: updatedDeclaration
        });

    } catch (error) {
        console.error("Error en updateDeclaration:", error);
        if (error.name === 'ValidationError') {
            let errors = {};
            Object.keys(error.errors).forEach((key) => { errors[key] = error.errors[key].message; });
            return res.status(400).json({ message: "Error de validación al actualizar", errors });
        }
        res.status(500).json({ message: 'Error interno del servidor al actualizar la declaración.' });
    }
};
