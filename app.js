const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

const routers = require('./routers/routers');
const notFound = require('./middlewares/routesNotFound');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server attivo');
});

app.use('/videogames', routers)

app.use(notFound)

app.listen(port, () => {
  console.log(`server in ascolto nella porta ${port}`);
});