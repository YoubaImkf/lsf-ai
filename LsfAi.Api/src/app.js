const express = require('express');
const app = express();
const usersRouter = require('./routes/usersRoute.js')
const cors = require('cors');
// Middleware for parsing data into JSON
app.use(express.json())

// Middleware for active CORS
app.use(cors());

// User routes
app.use('/users', usersRouter);

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const port = 8282;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
