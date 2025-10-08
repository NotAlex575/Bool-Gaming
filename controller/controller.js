const connection = require('../data/database')

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

const slug = (req, res) => {
  const slug = req.params.slug;

  const sql = 'SELECT * FROM videogames WHERE slug = ?';

  connection.query(sql, [slug], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Videogioco non trovato" });
    }
    res.json(results[0]);
  });
};


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

const indexUser = (req, res) => {
  console.log("indexUser chiamata");
  const sql = 'SELECT * FROM user';
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    res.json(results);
  });
}

const showUser = (req, res) => {

  const id = req.params.id;

  const sql = 'SELECT * FROM user WHERE id = ?';

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

const storeUser = (req, res) => {

  const { name, email, adress } = req.body

  const sql = 'INSERT INTO user (name, email, adress ) VALUES (?, ?, ?)';

  const data = [name, email, adress]

  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella query: ' + err });
    }
    res.status(201).json({ result: 'Persona inserita' });
  })
};

const destroyUser = (req, res) => {

  const id = req.params.id;

  const sql = 'DELETE FROM user WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella query: ' + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Persona non trovata' });
    }
    res.json({ result: 'Persona tolta' });
  });
}

const updateUser = (req, res) => {

  const id = req.params.id
  const { name, email, adress } = req.body

  const sql = `UPDATE user SET name = ?, email = ?, adress = ? WHERE id = ?`;

  const data = [name, email, adress, id];

  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Persona non trovata" });
    }
    res.json({ result: "Persona aggiornata" });
  });
};






module.exports = {
  index,
  show,
  store,
  destroy,
  update,
  slug,
  indexUser,
  showUser,
  storeUser,
  destroyUser,
  updateUser,
}