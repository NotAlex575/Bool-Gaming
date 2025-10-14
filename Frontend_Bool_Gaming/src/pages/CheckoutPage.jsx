// src/pages/CheckoutPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Vite: usa import.meta.env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// --- Component che contiene il form Stripe ---
const StripePaymentForm = ({ cart, name, setName, onSuccess, setShowAlert, total, promoCode }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) return;
    if (!name.trim()) {
      setError('Inserisci il nome del titolare');
      return;
    }

    setLoading(true);
    try {
      // 1) Chiedo al backend di creare il PaymentIntent
      const resp = await fetch('https://bool-gaming-backend-nu.vercel.app/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Errore creazione PaymentIntent');

      const clientSecret = data.clientSecret || data.client_secret;
      // 2) Confermo il pagamento con CardElement
      const card = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: { name },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        return;
      }

      if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      // invia i dati per la ricevuta
      await fetch('https://bool-gaming-backend-nu.vercel.app/send-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          total: total.toFixed(2), // totale già calcolato in CheckoutPage
          items: cart,
          promoCode
        }),
      });

      setShowAlert(true);
      localStorage.removeItem('cart');
      onSuccess && onSuccess();
    } else {
      setError('Pagamento non completato.');
    }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <div className="mb-3">
        <label className="form-label">Nome del titolare</label>
        <input
          type="text"
          className="form-control"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Carta di credito</label>
        <div className="p-2 border">
          {/* CardElement è un unico campo che riceve numero/scadenza/CVC */}
          <CardElement options={{ hidePostalCode: true }} />
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button type="submit" className="btn btn-primary w-100 mt-2" disabled={!stripe || loading}>
        {loading ? 'Elaborazione...' : 'Paga ora'}
      </button>

      {/* Piccola sezione con carte di test da copiare/incollare 
      <div className="mt-3">
        <strong>Carte di test (solo in Test Mode)</strong>
        <ul className="small mb-0">
          <li><code>4242 4242 4242 4242</code> — Pagamento riuscito</li>
          <li><code>4000 0000 0000 0002</code> — Carta rifiutata</li>
          <li><code>4000 0025 0000 3155</code> — Richiede 3D Secure (autenticazione)</li>
          <li>Scadenza: qualsiasi data futura (es. <code>12/34</code>), CVC: <code>123</code></li>
        </ul>
        <small className="text-muted">Digita il numero di test direttamente nel campo della carta sopra.</small>
      </div>
      */}
    </form>
  );
};

// --- Pagina principale che mantiene il tuo layout originale ---
const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedPromo = JSON.parse(localStorage.getItem('promo')) || [];

    if (savedCart.length === 0) {
      navigate('/cart');
    } else {
      setCart(savedCart);
      if (savedPromo) setAppliedPromo(savedPromo);
    }
  }, [navigate]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 49 || subtotal === 0 ? 0 : 2.99;

  const promoDiscount = (() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.code === 'SAVE10') return Math.min(10, subtotal * 0.1);
    if (appliedPromo.code === '5OFF') return 5;
    return 0;
  })();

  const total = Math.max(0, subtotal + shipping - promoDiscount);

  const handleconfirmedRedirect = () => {
    localStorage.removeItem('cart');
    navigate('/');
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="container p-130 mt-5">
        <div className="row gy-4">
          <div className="col-12">
            <h1 className="text-center mt-3">Checkout</h1>
          </div>

          {/* Riepilogo carrello */}
          <div className="col-12 col-lg-8">
            <div className="card p-4">
              <h3 className="mb-3">Riepilogo ordine</h3>
              {cart.map((item) => (
                <div key={item.id} className="d-flex justify-content-between border-bottom py-2">
                  <span className="col-8">{item.title}</span>
                  <span className="col-2">{item.qty}</span>
                  <span className="col-2">€ {item.price}</span>
                </div>
              ))}

              <div className="d-flex justify-content-between border-bottom py-2">
                <span>Totale parziale</span>
                <span>€ {subtotal.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between border-bottom py-2">
                <span>Spedizione</span>
                <span>{shipping === 0 ? 'Gratis' : `€ ${shipping.toFixed(2)}`}</span>
              </div>

              <div className="d-flex justify-content-between border-bottom py-2">
                <span>Sconto</span>
                <span>{promoDiscount > 0 ? `- € ${promoDiscount.toFixed(2)}` : '-'}</span>
              </div>

              <div className="d-flex justify-content-between fw-bold py-2">
                <span>Totale</span>
                <span>€ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Form pagamento */}
          <div className="col-12 col-lg-4">
            <div className="card p-4">
              <h3 className="mb-3">Informazioni di pagamento</h3>

              {/* Qui il form Stripe: mantiene il campo Nome come prima */}
              <StripePaymentForm
                cart={cart}
                name={name}
                promoCode={appliedPromo?.code || null}
                total={total}
                setName={setName}
                setShowAlert={setShowAlert}
                onSuccess={() => {}}
              />
            </div>
             {/* Alert di successo */}
          <div
            className={`alert alert-success text-center transition-opacity fade ${showAlert ? 'opacity-100' : 'opacity-0'} mt-2`}
            role="alert"
          >
            <span>Pagamento completato con successo</span>
            <button className="btn btn-sm btn-light ms-3" onClick={handleconfirmedRedirect}>
              OK
            </button>
          </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default CheckoutPage;
