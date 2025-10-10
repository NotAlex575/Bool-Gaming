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
  const id = req.params.id;
  const { title, types, pegi, release_date, image, price, description, trailer_url } = req.body;

  const sql = `
    UPDATE videogames 
    SET title = ?, types = ?, pegi = ?, release_date = ?, image = ?, price = ?, description = ?, trailer_url = ? 
    WHERE id = ?`;

  const data = [title, types, pegi, release_date, image, price, description, trailer_url, id];

  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Videogioco non trovato" });
    }
    res.json({ result: "Videogioco aggiornato correttamente" });
  });
};


const indexUser = (req, res) => {

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
// payment 
const indexPayment = (req, res) => {

  const sql = 'SELECT * FROM payment';
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    res.json(results);
  });
}

const showPayment = (req, res) => {

  const id = req.params.id;

  const sql = 'SELECT * FROM payment WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore della query: " + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Pagamento non trovato" });
    }
    res.json(results[0])
  });
}

const storePayment = (req, res) => {

  const { id_oder, payment_method, import: amount, payment_date } = req.body

  const sql = 'INSERT INTO payment (id_oder, payment_method, amount, payment_date ) VALUES (?, ?, ?, ?)';

  const data = [id_oder, payment_method, amount, payment_date]

  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella query: ' + err });
    }
    res.status(201).json({ result: 'Pagamento inserito' });
  })
};

const destroyPayment = (req, res) => {

  const id = req.params.id;

  const sql = 'DELETE FROM payment WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella query: ' + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Pagamento non trovato' });
    }
    res.json({ result: 'Pagamento tolto' });
  });
}

const updatePayment = (req, res) => {

  const id = req.params.id
  const { id_oder, payment_method, import: amount, payment_date } = req.body

  const sql = `UPDATE payment SET id_oder = ?, payment_method = ?, amount = ?, payment_date = ? WHERE id = ?`;

  const data = [id_oder, payment_method, amount, payment_date, id];

  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Pagamento non trovato" });
    }
    res.json({ result: "Pagamento aggiornato" });
  });
};
// oder_detail
const indexOrderDetail = (req, res) => {

  const sql = 'SELECT * FROM order_detail';
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    res.json(results);
  });
}

const showOrderDetail = (req, res) => {

  const id = req.params.id;

  const sql = 'SELECT * FROM order_detail WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore della query: " + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Pagamento non trovato" });
    }
    res.json(results[0])
  });
}

const storeOrderDetail = (req, res) => {

  const { id_oder, id_videogames, quantity, unitly_price, product_name, price } = req.body

  const sql = 'INSERT INTO order_detail (id_oder, id_videogames, quantity, unitly_price, product_name, price) VALUES (?, ?, ?, ?, ?, ?)';

  const data = [id_oder, id_videogames, quantity, unitly_price, product_name, price]

  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella query: ' + err });
    }
    res.status(201).json({ result: 'Pagamento inserito' });
  })
};

const destroyOrderDetail = (req, res) => {

  const id = req.params.id;

  const sql = 'DELETE FROM order_detail WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella query: ' + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Pagamento non trovato' });
    }
    res.json({ result: 'Pagamento tolto' });
  });
}

const updateOrderDetail = (req, res) => {

  const id = req.params.id

  const { id_oder, id_videogames, quantity, unitly_price, product_name, price } = req.body

  const sql = `UPDATE order_detail SET id_oder = ?, id_videogames = ?, quantity = ?, unitly_price = ?, product_name = ?, price = ? WHERE id = ?`;
  const data = [id_oder, id_videogames, quantity, unitly_price, product_name, price, id];

  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Pagamento non trovato" });
    }
    res.json({ result: "Pagamento aggiornato" });
  });
};

// oder
const indexOrders = (req, res) => {

  const sql = 'SELECT * FROM orders';
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    res.json(results);
  });
}

const showOrders = (req, res) => {

  const id = req.params.id;

  const sql = 'SELECT * FROM orders WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore della query: " + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Pagamento non trovato" });
    }
    res.json(results[0])
  });
}

const storeOrders = (req, res) => {

  const { id_user, date, state, total } = req.body

  const sql = 'INSERT INTO orders (id_user, date, state, total) VALUES (?, ?, ?, ?)';

  const data = [id_user, date, state, total]

  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella query: ' + err });
    }
    res.status(201).json({ result: 'Pagamento inserito' });
  })
};

const destroyOrders = (req, res) => {

  const id = req.params.id;

  const sql = 'DELETE FROM orders WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella query: ' + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Pagamento non trovato' });
    }
    res.json({ result: 'Pagamento tolto' });
  });
}

const updateOrders = (req, res) => {

  const id = req.params.id

  const { id_user, date, state, total } = req.body

  const sql = 'UPDATE orders SET id_user = ?, date = ?, state = ?, total = ? WHERE id = ?';

  const data = [id_user, date, state, total, id];

  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Pagamento non trovato" });
    }
    res.json({ result: "Pagamento aggiornato" });
  });
};
// discont_code
const indexDiscountCode = (req, res) => {

  const sql = 'SELECT * FROM discount_code';
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    res.json(results);
  });
}

const showDiscountCode = (req, res) => {

  const id = req.params.id;

  const sql = 'SELECT * FROM discount_code WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore della query: " + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Pagamento non trovato" });
    }
    res.json(results[0])
  });
}

const storeDiscountCode = (req, res) => {

  const { id_oder, code, percentage, start_date, end_date } = req.body

  const sql = 'INSERT INTO discount_code (id_oder, code, percentage, start_date, end_date) VALUES (?, ?, ?, ?, ?)';

  const data = [id_oder, code, percentage, start_date, end_date]

  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella query: ' + err });
    }
    res.status(201).json({ result: 'Pagamento inserito' });
  })
};

const destroyDiscountCode = (req, res) => {

  const id = req.params.id;

  const sql = 'DELETE FROM discount_code WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella query: ' + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Pagamento non trovato' });
    }
    res.json({ result: 'Pagamento tolto' });
  });
}

const updateDiscountCode = (req, res) => {

  const id = req.params.id

  const { id_oder, code, percentage, start_date, end_date } = req.body

  const sql = `UPDATE discount_code SET id_oder = ?, code = ?, percentage = ?, start_date = ?, end_date = ? WHERE id = ?`;

  const data = [id_oder, code, percentage, start_date, end_date, id];

  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Pagamento non trovato" });
    }
    res.json({ result: "Pagamento aggiornato" });
  });
};

const indexCheckout = (req, res) => {

  const sql = 'SELECT * FROM checkout';
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    res.json(results);
  });
}

const showCheckout = (req, res) => {

  const id = req.params.id;

  const sql = 'SELECT * FROM checkout WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore della query: " + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Pagamento non trovato" });
    }
    res.json(results[0])
  });
}

const storeCheckout = (req, res) => {

  const { id_payment, type, detail, list_item } = req.body

  const sql = 'INSERT INTO checkout (id_payment, type, detail, list_item) VALUES (?, ?, ?, ?)';

  const data = [id_payment, type, detail, list_item]

  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella query: ' + err });
    }
    res.status(201).json({ result: 'Pagamento inserito' });
  })
};

const destroyCheckout = (req, res) => {

  const id = req.params.id;

  const sql = 'DELETE FROM checkout WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella query: ' + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Pagamento non trovato' });
    }
    res.json({ result: 'Pagamento tolto' });
  });
}

const updateCheckout = (req, res) => {

  const id = req.params.id

  const { id_payment, type, detail, list_item } = req.body

  const sql = `UPDATE checkout SET id_payment = ?, type = ?, detail = ?, list_item = ? WHERE id = ?`;
  const data = [id_payment, type, detail, list_item, id];

  connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella query: " + err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Pagamento non trovato" });
    }
    res.json({ result: "Pagamento aggiornato" });
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
  indexPayment,
  showPayment,
  storePayment,
  destroyPayment,
  updatePayment,
  indexOrderDetail,
  showOrderDetail,
  storeOrderDetail,
  destroyOrderDetail,
  updateOrderDetail,
  indexOrders,
  showOrders,
  storeOrders,
  destroyOrders,
  updateOrders,
  indexDiscountCode,
  showDiscountCode,
  storeDiscountCode,
  destroyDiscountCode,
  updateDiscountCode,
  indexCheckout,
  showCheckout,
  storeCheckout,
  destroyCheckout,
  updateCheckout
}