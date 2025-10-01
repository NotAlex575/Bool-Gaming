const connection = require('../data/dataBase')

const index = (req, res) => {
  const videogameQuery = 'SELECT * FROM videogames';
  const detailsQuery = 'SELECT * FROM detail WHERE videogame_id = ?';

  connection.query(videogameQuery, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    connection.query(videogameQuery, (err, detailsQuery) => {
      if (err) {
        return res.status(500).json({ error: "Errore nella query: " + err });
      }
    })
    res.json({
      videogame: results,
      details: detailsResults
    })
  });
}

const show = (req, res) => {

  const id = req.params.id;

  const videogameQuery = 'SELECT * FROM videogames WHERE id = ?';
  const detailsQuery = 'SELECT * FROM detail WHERE videogame_id = ?';

  connection.query(videogameQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore della query: " + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Post non trovato" });
    }
    connection.query(detailsQuery, [id], (err, detailsResults) => {
      if (err) {
        return res.status(500).json({ error: "Errore della query: " + err });
      }
      res.json({
        videogame: results[0],
        details: detailsResults
      });
    })
  });
}

module.exports = {
  index,
  show
}