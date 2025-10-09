import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CartPage() {
  const [items, setItems] = useState([]);

  //PRENDE IL CONTENUTO NEL LOCAL STORAGE DEL CARRELLO
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const formatted = savedCart.map((item, index) => ({
      id: index + 1,
      title: item.title,
      platform: item.genre,
      price: parseFloat(item.price) || 0,
      qty: 1,
    }));
    setItems(formatted);
  }, [])

  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it)).filter(Boolean)
    );
  };

  const removeItem = (id) => {
    const updated = items.filter((it) => it.id !== id);
    setItems(updated);
    const newCart = updated.map(({ title, platform, price }) => ({
      title,
      genre: platform,
      price,
    }));
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal > 49 || subtotal === 0 ? 0 : 2.99;

  const promoDiscount = (() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.code === "SAVE10") return Math.min(10, subtotal * 0.1);
    if (appliedPromo.code === "5OFF") return 5;
    return 0;
  })();

  const total = Math.max(0, subtotal + shipping - promoDiscount);

  const applyPromo = (e) => {
    e.preventDefault();
    const code = promo.trim().toUpperCase();
    if (!code) return;
    if (code === "SAVE10") setAppliedPromo({ code: "SAVE10", desc: "10% fino a 10€" });
    else if (code === "5OFF") setAppliedPromo({ code: "5OFF", desc: "5€ di sconto" });
    else setAppliedPromo({ code: code, desc: "Coupon non valido" });
  };

  const format = (v) => v.toFixed(2) + " €";

  return (
    <div className="cart-page container p-130">
      <div className="row">
        <div className="col-12">
          <h1 className="cart-title mb-4 text-uppercase fw-bold border-bottom pb-2">Carrello</h1>
        </div>
      </div>

      <div className="row">
        {/* Sezione principale */}
        <div className="col-lg-8">
          <div className="card mb-4 shadow-sm border-0">
            <div className="card-body p-0">
              <table className="table align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Prodotto</th>
                    <th className="text-center">Prezzo</th>
                    <th className="text-center">Quantità</th>
                    <th className="text-center">Totale</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">Il carrello è vuoto.</td>
                    </tr>
                  ) : (
                    items.map((it) => (
                      <tr key={it.id} className="border-bottom">
                        <td>
                          <div className="fw-semibold">{it.title}</div>
                          <div className="text-muted small">{it.platform} · SKU: {it.sku}</div>
                        </td>
                        <td className="text-center">{format(it.price)}</td>
                        <td className="text-center">
                          <div className="btn-group btn-group-sm" role="group">
                            <button className="btn btn-outline-secondary" onClick={() => updateQty(it.id, -1)}>-</button>
                            <span className="btn btn-light disabled">{it.qty}</span>
                            <button className="btn btn-outline-secondary" onClick={() => updateQty(it.id, 1)}>+</button>
                          </div>
                        </td>
                        <td className="text-center">{format(it.price * it.qty)}</td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(it.id)}>Rimuovi</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Codice sconto */}
          <div className="card mb-4 shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-bold">Hai un codice sconto?</h5>
              <form className="row g-2 mt-2" onSubmit={applyPromo}>
                <div className="col-sm-8">
                  <input className="form-control" placeholder="Inserisci codice" value={promo} onChange={(e) => setPromo(e.target.value)} />
                </div>
                <div className="col-sm-4 d-grid">
                  <button className="btn btn-dark" type="submit">Applica</button>
                </div>
                {appliedPromo && (
                  <div className="col-12 mt-3 small text-muted">
                    <strong>{appliedPromo.code}</strong> — {appliedPromo.desc}
                  </div>
                )}
              </form>
            </div>
          </div>


        </div>

        {/* Riepilogo */}
        <aside className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold border-bottom pb-2">Riepilogo ordine</h5>
              <dl className="row mt-3">
                <dt className="col-6">Totale parziale</dt>
                <dd className="col-6 text-end">{format(subtotal)}</dd>
                <dt className="col-6">Spedizione</dt>
                <dd className="col-6 text-end">{shipping === 0 ? "Gratis" : format(shipping)}</dd>
                <dt className="col-6">Sconto</dt>
                <dd className="col-6 text-end">{promoDiscount > 0 ? `- ${format(promoDiscount)}` : "-"}</dd>
                <dt className="col-6 fw-bold">Totale</dt>
                <dd className="col-6 text-end fw-bold">{format(total)}</dd>
              </dl>

              <div className="d-grid">
                <Link to={"/checkoutpage"} className="btn btn-success btn-lg" disabled={items.length === 0}>Vai al pagamento</Link>
              </div>

              <div className="mt-3 small text-muted">
                Acquisti protetti · Consegna chiave istantanea.
              </div>
            </div>
          </div>

          <div className="card mt-3 border-0 shadow-sm">
            <div className="card-body small text-muted">
              <strong>Metodi di pagamento</strong>
              <div className="mt-2">Carte di credito · PayPal · Paysafecard</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
