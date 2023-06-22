const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

//route for exercise sign reproduction
app.get('/camera', (req, res) => {
  res.sendFile(path.join(__dirname, './views/frontOffice/exercises/reproduction.html'));
});


// route form

//route for login

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './views/frontOffice/form/login.html'));
});

//Route for register

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, './views/frontOffice/form/register.html'));
});


app.listen(port, () => {
  console.log(`Express running on port ${port}`);
});
