const express = require('express');
const connection = require('./data/database');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Server attivo');
});

app.listen(port, () => {
  console.log(`server in ascolto nella porta ${port}`);
});