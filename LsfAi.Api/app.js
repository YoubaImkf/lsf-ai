const express = require('express');
const app = express();
const usersRouter = require('./src/routes/usersRoute.js')
const signRouter = require('./src/routes/signRoute.js')
const progressionRouter = require('./src/routes/progressionRoute.js')
const exerciseContentsRouter = require('./src/routes/exerciseContentsRoute.js')

// Middleware used to enable CORS with various options.
const cors = require('cors');

// Middleware for parsing data into JSON
app.use(express.json())

// Middleware for active CORS
app.use(cors());

// User routes
app.use('/users', usersRouter);

// Sign routes
app.use('/signs', signRouter);

// Progression routes
app.use('/progressions', progressionRouter);

app.use('/exerciseContents', exerciseContentsRouter)


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
