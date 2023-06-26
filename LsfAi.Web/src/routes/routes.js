const express = require('express');
const path = require('path');
const routeJson = require('../../config/routes.json')
const router = express.Router('');

// Définir les routes à partir du fichier routes.json
routeJson.routes.forEach((route) => {
    router.get(route.name, (req, res) => {
      res.sendFile(path.join(__dirname, route.path));
    });
  });
  

module.exports = router;
