import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const savedPromo = JSON.parse(localStorage.getItem("promo")) || [];

    if (savedCart.length === 0) {
      navigate("/cart");
    } else {
      setCart(savedCart);
      if (savedPromo) setAppliedPromo(savedPromo);
    }
  }, [navigate]);


  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 49 || subtotal === 0 ? 0 : 2.99;

  const promoDiscount = (() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.code === "SAVE10") return Math.min(10, subtotal * 0.1);
    if (appliedPromo.code === "5OFF") return 5;
    return 0;
  })();

  const total = Math.max(0, subtotal + shipping - promoDiscount);


  const handlePayment = (e) => {
    e.preventDefault();



    if (!name.trim() || !cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
      alert("per favore compila tutti i campi prima di procedere con il pagamento");
      return;
    }

    setShowAlert(true);
  };

  const handleconfirmedRedirect = () => {
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <div className="container p-130 mt-5">
      <div className="row gy-4">
        <div className="col-12">
          <h1 className="text-center mt-3">Checkout</h1>
        </div>
        {/* Alert di successo */}
        <div
          className={`alert alert-success text-center transition-opacity fade ${showAlert ? "opacity-100" : "opacity-0"
            }`}
          role="alert"
        >
          <span>Pagamento completato con successo</span>
          <button className='btn btn-sm btn-light ms-3' onClick={handleconfirmedRedirect}>
            OK
          </button>
        </div>

        {/* Riepilogo carrello */}
        <div className="col-12 col-lg-8">
          <div className="card p-4">
            <h3 className="mb-3">Riepilogo ordine</h3>
            {/* Qui ciclo gli items del carrello */}
            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between border-bottom py-2"
              >
                <span className='col-8'>{item.title}</span>
                <span className='col-2'>{item.qty}</span>
                <span className='col-2'>€ {item.price}</span>
              </div>
            ))}

            <div className="d-flex justify-content-between border-bottom py-2">
              <span>Totale parziale</span>
              <span>€ {subtotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between border-bottom py-2">
              <span>Spedizione</span>
              <span>{shipping === 0 ? "Gratis" : `€ ${shipping.toFixed(2)}`}</span>
            </div>

            <div className="d-flex justify-content-between border-bottom py-2">
              <span>Sconto</span>
              <span>{promoDiscount > 0 ? `- € ${promoDiscount.toFixed(2)}` : "-"}</span>
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
            <form onSubmit={handlePayment}>
              <div className="mb-3">
                <label className="form-label">Nome del titolare</label>
                <input type="text" className="form-control" placeholder="Jonh Doe" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Numero della carta</label>
                <input type="text" className="form-control" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
              </div>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">data di scadenza</label>
                  <input type="text" className="form-control" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">CVV</label>
                  <input type="text" className="form-control" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                </div>
              </div>
              <button type='submit' className="btn btn-primary w-100 mt-2">Paga ora</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
