const connection = require('../data/dataBase')

const index = (req, res) => {
  const sql = 'SELECT * FROM videogames';
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    res.json(results);
  });
}

const show = (req, res) => {

  const id = req.params.id;

  const sql = 'SELECT * FROM videogames WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore della query: " + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Post non trovato" });
    }
    res.json(results[0])
  });
}

const store = (req, res) => {

  const { title, types, pegi, release_date, image, price, description, slug, trailer_url } = req.body

  const sql = 'INSERT INTO videogames (title, types, pegi, release_date, image, price, description, slug, trailer_url) VALUES (?, ?, ?, ?, ?, ?, ? , ? , ?)';

  const data = [title, types, pegi, release_date, image, price, description, slug, trailer_url]

  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella query: ' + err });
    }
    res.status(201).json({ result: 'Videogioco inserito' });
  })
};

const destroy = (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM videogames WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella query: ' + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Videogioco non trovato' });
    }
    res.json({ result: 'Videogioco eliminato' });
  });
}

const update = (req, res) => {

  const id = req.params.id
  const { title, types, pegi, release_date, image, price, description, slug, trailer_url } = req.body

  const sql = `UPDATE videogames SET title = ?, types = ?, pegi = ?, release_date = ?, image = ?, price = ?, description = ?, slug = ?, trailer_url = ? WHERE id = ?`;

  const data = [title, types, pegi, release_date, image, price, description, slug, trailer_url, id];

  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Videogioco non trovato" });
    }
    res.json({ result: "Videogioco aggiornato" });
  });
};



module.exports = {
  index,
  show,
  store,
  destroy,
  update
}