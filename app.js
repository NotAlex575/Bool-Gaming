const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer')
const app = express();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.error(" Errore connessione SMTP:", error);
  } else {
    console.log("Server SMTP pronto per inviare email");
  }
});

app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email mancante" });
  }

  try {
    // Invia l'email
    const info = await transporter.sendMail({
      from: '"Il mio sito" no-reply@tuodominio.com', // mittente
      to: email,                                      // destinatario
      subject: "Benvenuto!",
      html: `<h1>Ciao ${email}!</h1><p>Grazie per esserti iscritto al nostro sito 🎉</p>`,
    });

    console.log("📤 Email inviata:", info.messageId);
    res.json({ success: true, message: "Email inviata!" });
  } catch (err) {
    console.error("❌ Errore invio email:", err);
    res.status(500).json({ success: false, message: "Errore server" });
  }
});

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

app.use('/', routers)

app.use(notFound)
app.use(error)

const path = require('path');

app.listen(port, () => {
  console.log(`server in ascolto nella porta ${port}`);
});