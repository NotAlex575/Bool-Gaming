const FAQ = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center px-3">
      <h1 className="display-1 fw-bold mb-4">Domande frequenti (FAQ)</h1>

      <h5 className="mt-3 fs-1">Come posso effettuare un ordine?</h5>
      <p className="fs-4 fw-bold">È sufficiente aggiungere i prodotti al carrello e completare il checkout.</p>

      <h5 className="mt-3 fs-1">Quali metodi di pagamento accettate?</h5>
      <p className="fs-4 fw-bold">Accettiamo carte di credito, PayPal e Paysafecard.</p>

      <h5 className="mt-3 fs-1">In quanto tempo riceverò il mio ordine?</h5>
      <p className="fs-4 fw-bold">Le spedizioni vengono consegnate immediatamente!</p>
    </div>
  );
};

export default FAQ;
