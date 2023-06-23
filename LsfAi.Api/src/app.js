const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const usersRouter = require('./routes/usersRoute.js')
const signRouter = require('./routes/signRoute.js')

// Middleware for parsing data into JSON
app.use(bodyParser.json());

// User routes
app.use('/users', usersRouter);

// Sign routes
app.use('/signs', signRouter);


// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
