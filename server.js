// Cargar variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Importar las rutas
const authRoutes = require('./routes/authRoutes.js');
// Inicializar la aplicación 
const app = express();

// Middlewares 
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Conexión a la Base de Datos 
const MONGODB_URI = process.env.MONGODB_URI; 

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('MongoDB Conectada Exitosamente...');
        // Iniciar servidor si la conexión a la BD es exitosa
        startServer();
    })
    .catch(err => {
        console.error('Error de conexión a MongoDB:', err.message);
        process.exit(1); // Deteter la aplicación si no se puede conectar a la BD
    });

app.get('/api', (req, res) => {
    res.json({ message: 'Bienvenido a la API de ContApp!' });
});

app.use('/api/auth', authRoutes);

function startServer() {
    const PORT = process.env.PORT || 4000; // Usa el puerto de .env o 4000 por defecto
    app.listen(PORT, () => {
        console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
    });
}