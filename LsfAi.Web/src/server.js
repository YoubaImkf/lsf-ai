const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

// ROUTES
// Reproduction exercise
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/frontOffice/exercises/reproduction.html'));
});

// Dictionary list
app.get('/dictionary', (req, res) => {
  res.sendFile(path.join(__dirname, './views/frontOffice/dictionary/dictionary-list.html'));
});


app.listen(port, () => {
  console.log(`Express running on port ${port}`);
});
