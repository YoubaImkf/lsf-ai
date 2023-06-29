const express = require('express');
const app = express();
const usersRouter = require('./src/routes/usersRoute.js')
const signRouter = require('./src/routes/signRoute.js')
const progressionRouter = require('./src/routes/progressionRoute.js')
<<<<<<< HEAD
const exercisesRouter = require('./src/routes/exerciseRoute.js')
=======
const exerciseContentsRouter = require('./src/routes/exerciseContentsRoute.js')
>>>>>>> 3a147083770d2cd4a885f28ffc852b65c7a3daac

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

<<<<<<< HEAD
// Progression routes
app.use('/exercises', exercisesRouter);
=======
app.use('/exerciseContents', exerciseContentsRouter)
>>>>>>> 3a147083770d2cd4a885f28ffc852b65c7a3daac


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
