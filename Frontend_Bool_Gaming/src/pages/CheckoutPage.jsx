import React from 'react';
// import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {

  // const navigate = useNavigate();

  const cart = [
    { id: 1, title: "Gioco 1", price: 29.99 },
    { id: 2, title: "Gioco 2", price: 19.99 },
  ];

  // if (cart.length === 0) {
  //   navigate("/cart");
  //   return null;
  // }

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container mt-5">
      <div className="row gy-4">
        <div className="col-12">
          <h1 className="text-center mt-3">Checkout</h1>
        </div>

        {/* Riepilogo carrello */}
        <div className="col-12 col-lg-8">
          <div className="card p-4">
            <h3 className="mb-3">Recap order</h3>
            {/* Qui ciclo gli items del carrello */}
            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between border-bottom py-2"
              >
                <span>{item.title}</span>
                <span>€ {item.price.toFixed(2)}</span>
              </div>
            ))}

            <div className="d-flex justify-content-between fw-bold py-2">
              <span>Total</span>
              <span>€ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Form pagamento */}
        <div className="col-12 col-lg-4">
          <div className="card p-4">
            <h3 className="mb-3">payment informations</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Name on the card</label>
                <input type="text" className="form-control" placeholder="Jonh Doe" />
              </div>
              <div className="mb-3">
                <label className="form-label">Card number</label>
                <input type="text" className="form-control" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Expiration date</label>
                  <input type="text" className="form-control" placeholder="MM/YY" />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">CVV</label>
                  <input type="text" className="form-control" placeholder="123" />
                </div>
              </div>
              <button className="btn btn-primary w-100 mt-2">Pay now</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
