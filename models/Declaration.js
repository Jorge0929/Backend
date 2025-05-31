const mongoose = require('mongoose');

const declarationSchema = new mongoose.Schema({
    añoFiscal: {
        type: Number,
        required: [true, 'El año fiscal es obligatorio.'],
        //validación simple
        min: [2000, 'El año fiscal parece ser muy antiguo.'],
        max: [new Date().getFullYear() + 1, 'El año fiscal no puede ser futuro lejano.'] 
    },
    datosPersonales: {
        // Almacenará un objeto con los datos del Paso anterior
        type: Object, 
        default: {}   // Valor por defecto un objeto vacío
    },
    ingresos: {
        type: Object, // Almacenará un objeto con los datos del Paso 2
        default: {}
    },
    deducciones: {
        type: Object, // Almacenará un objeto con los datos del Paso 3
        default: {}
    },
    resumenEstimado: { // Opcional: si quieres guardar el resumen que calculó el frontend
        type: Object,
        default: {}
    },
    estado: {
        type: String,
        enum: ['en_progreso', 'finalizado_en_app', 'presentado_dian'], // Valores permitidos
        default: 'en_progreso' // Estado por defecto al crear un borrador
    },
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId, // Tipo especial para IDs de MongoDB
        required: true,
        ref: 'User' // ¡Muy importante! Esto crea una referencia al modelo 'User'
    }
}, {
    timestamps: true // Añade automáticamente los campos createdAt y updatedAt
});

module.exports = mongoose.model('Declaration', declarationSchema);