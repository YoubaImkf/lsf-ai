const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userController = require('../src/controllers/userController.js');

// Middleware pour parser les données en JSON
app.use(bodyParser.json());

// Routes pour les utilisateurs
// app.get('/test-connection', userController.testDatabaseConnection);
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Démarrer le serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
