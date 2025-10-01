const express = require('express');
const cors = require('cors');
const { askProductQuestion } = require('./services/gemini');

const app = express();
const port = process.env.PORT;

const routers = require('./routes/routers');
const notFound = require('./middlewares/routesNotFound');
const error = require('./middlewares/error');


app.use(express.static('public'))

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server attivo');
});

app.post('/ask', async (req, res) => {
  const { productInfo, question } = req.body;

  if (!productInfo || !question) {
    return res.status(400).json({ message: 'productInfo e question richiesti' });
  }

  const answer = await askProductQuestion(productInfo, question);
  res.json({ answer });
});

app.use('/videogames', routers)

app.use(notFound)
app.use(error)

app.listen(port, () => {
  console.log(`server in ascolto nella porta ${port}`);
});