import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CartPage() {
  const [items, setItems] = useState([
    { id: 1, title: "Game Title 1 - Deluxe Edition", platform: "PC", price: 19.99, qty: 1, sku: "GT1-DELUXE" },
    { id: 2, title: "Game Title 2", platform: "Steam Key", price: 9.49, qty: 2, sku: "GT2-STD" },
  ]);

  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it)).filter(Boolean)
    );
  };

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

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
    <div className="cart-page container py-5 px-3 px-md-5">
      <div className="row">
        <div className="col-12">
          <h1 className="cart-title mb-4 text-uppercase fw-bold border-bottom pb-2">Carrello</h1>
        </div>
      </div>

      <div className="row">
        {/* Sezione principale */}
        <div className="col-sm-12 col-lg-8">
          {items.length === 0 ? (
            <div className="card shadow-sm border-0 p-4 text-center">
              <p className="mb-0">Il carrello è vuoto.</p>
            </div>
          ) : (
            items.map((it) => (
              <div key={it.id} className="card shadow-sm border-0 mb-3">
                <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                  <div>
                    <h6 className="fw-semibold mb-1">{it.title}</h6>
                    <div className="text-muted small">{it.platform} · SKU: {it.sku}</div>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <div className="text-center">
                      <div className="small text-muted">Prezzo</div>
                      <div className="fw-bold">{format(it.price)}</div>
                    </div>

                    <div className="text-center">
                      <div className="small text-muted">Quantità</div>
                      <div className="btn-group btn-group-sm" role="group">
                        <button className="btn btn-outline-secondary" onClick={() => updateQty(it.id, -1)}>-</button>
                        <span className="btn btn-light disabled">{it.qty}</span>
                        <button className="btn btn-outline-secondary" onClick={() => updateQty(it.id, 1)}>+</button>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="small text-muted">Totale</div>
                      <div className="fw-bold text-success">{format(it.price * it.qty)}</div>
                    </div>

                    <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(it.id)}>Rimuovi</button>
                  </div>
                </div>
              </div>
            ))
          )}

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
        <aside className="col-sm-12 col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold border-bottom pb-2">Riepilogo ordine</h5>
              <dl className="row mt-3">
                <dt className="col-6">Totale parziale</dt>
                <dd className="col-6 text-end text-nowrap">{format(subtotal)}</dd>
                <dt className="col-6">Spedizione</dt>
                <dd className="col-6 text-end text-nowrap">{shipping === 0 ? "Gratis" : format(shipping)}</dd>
                <dt className="col-6">Sconto</dt>
                <dd className="col-6 text-end text-nowrap">{promoDiscount > 0 ? `- ${format(promoDiscount)}` : "-"}</dd>
                <dt className="col-6 fw-bold">Totale</dt>
                <dd className="col-6 text-end fw-bold text-nowrap">{format(total)}</dd>
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
