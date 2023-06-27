const express = require('express');
const path = require('path');
const routes = require('./src/routes/routes')

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'src')));

// Load routes
app.use('/', routes);


// Start server
app.listen(port, () => {
  console.log(`Express running on port ${port}`);
});
