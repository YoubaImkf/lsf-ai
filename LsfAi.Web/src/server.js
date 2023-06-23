const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));


//Currently routes are in the server file, but they should be in a separate file route folder, like the backend but
//it does'nt work because it doesn't find the css files :'(

//route for exercise sign reproduction
app.get('/reproduction', (req, res) => {
  res.sendFile(path.join(__dirname, './views/frontOffice/exercises/reproduction.html'));
});

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
