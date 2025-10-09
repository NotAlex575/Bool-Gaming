import { useEffect, useState } from "react";

export default function WelcomePopup() {

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}videogames/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Errore durante l’invio della mail.");
      }
    } catch (err) {
      setError("Errore di connessione con il server.");
    }
  };

  const handleClose = () => setShow(false);



  return (
    <>
      {/* Sfondo scuro (backdrop) */}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1040 }}
      ></div>

      {/* Finestra del popup */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content shadow-lg">
            <div className="modal-header">
              <h5 className="modal-title">Benvenuto 👋</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Chiudi"
              ></button>
            </div>

            <div className="modal-body">
              {!submitted ? (
                <>
                  <p>Inserisci la tua email per ricevere un messaggio di benvenuto!</p>

                  {error && (
                    <div className="alert alert-danger py-2">{error}</div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="La tua email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      Invia
                    </button>
                  </form>
                </>
              ) : (
                <div className="alert alert-success text-center">
                  <h5>Grazie! 🎉</h5>
                  <p>Ti abbiamo inviato una mail di ringraziamento.</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
