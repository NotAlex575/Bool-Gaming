const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
const Stripe = require('stripe');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) console.error("❌ Errore connessione SMTP:", error);
  else console.log("✅ Server SMTP pronto per inviare email");
});

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email mancante" });
  }

  try {
    const info = await transporter.sendMail({
      from: '"Il mio sito" <no-reply@tuodominio.com>',
      to: email,
      subject: "Benvenuto!",
      html: `<h1>Ciao ${email}!</h1><p>Grazie per esserti iscritto al nostro sito 🎉. <br/>
      Ecco a te un codice sconto! [SAVE10]
      </p>`,
    });

    console.log("📤 Email inviata:", info.messageId);
    res.json({ success: true, message: "Email inviata!" });
  } catch (err) {
    console.error("❌ Errore invio email:", err);
    console.error("Messaggio:", err.message);
    console.error("Stack trace:", err.stack);
    res.status(500).json({
      success: false,
      message: "Errore server",
      error: err.message
    });
  }
});

//stripe

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/create-payment', async (req, res) => {
  try {
    const { items = [], currency = 'eur' } = req.body;

    const subtotal = (items || []).reduce((acc, it) => acc + (it.price || 0) * (it.qty || 1), 0);
    const shipping = subtotal > 49 || subtotal === 0 ? 0 : 2.99;
    const total = Math.max(0, subtotal + shipping);
    const amount = Math.round(total * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { integration_check: 'accept_a_payment' }
    });

    res.json({ clientSecret: paymentIntent.client_secret, amount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


const routers = require('./routes/routers');
const notFound = require('./middlewares/routesNotFound');
const error = require('./middlewares/error');

app.use('/', routers);
app.use(notFound);
app.use(error);

app.get('/', (req, res) => res.send('Server attivo'));

app.listen(port, () => {
  console.log(`🚀 Server in ascolto sulla porta ${port}`);
});
