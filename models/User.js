const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.'], // Mensaje de error si falta el nombre
        trim: true 
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio.'],
        unique: true, 
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Por favor, introduce un email válido.'] // Validación simple de email
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria.'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres.'] 
    }
}, {
    timestamps: true // Añade automáticamente createdAt y updatedAt
});

// Middleware de Mongoose
userSchema.pre('save', async function(next) {
    // Solo hashear la contraseña si ha sido modificada o es nueva
    if (!this.isModified('password')) {
        return next();
    }
    // salt para el hasheo
    const salt = await bcrypt.genSalt(10);
    // Hashear la contraseña con el salt
    this.password = await bcrypt.hash(this.password, salt);
    next(); 
});

// comparar la contraseña ingresada con la hasheada en la BD
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Exportar el modelo para usarlo en otros archivos
module.exports = mongoose.model('User', userSchema);