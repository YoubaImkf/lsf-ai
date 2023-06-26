const express = require('express');
const path = require('path');
const routes = require('./src/routes/routes')

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'src')));

// Load routes
app.use('/', routes);

// Load the Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("./src/service-worker.js").then(function(registration) {
      console.log("Service Worker registered with scope:", registration.scope);
    }).catch(function(error) {
      console.log("Service Worker registration failed:", error);
    });
  });
}

// Start server
app.listen(port, () => {
  console.log(`Express running on port ${port}`);
});
