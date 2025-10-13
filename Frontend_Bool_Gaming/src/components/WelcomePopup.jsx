import { useState, useEffect } from "react";

export default function WelcomePopup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [variant, setVariant] = useState("success");

  // Mostra popup dopo 3 secondi se non già mostrato nella sessione
  useEffect(() => {
    const popupShown = sessionStorage.getItem("welcomePopupShown");
    if (!popupShown) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("welcomePopupShown", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Inserisci un’email valida!");
      setVariant("danger");
      return;
    }

    try {
      const res = await fetch(`https://bool-gaming-backend-nu.vercel.app/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage("✅ Email inviata correttamente!");
        setVariant("success");
      } else {
        setMessage(`❌ Errore: ${data.error || data.message}`);
        setVariant("danger");
      }
    } catch (err) {
      setMessage(`❌ Errore: ${err.message}`);
      setVariant("danger");
    }
  };

  return (
    <>
      {showPopup && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-main">
                <h5 className="modal-title text-white">Iscriviti alla newsletter</h5>
                <button type="button" className="btn-close" onClick={() => setShowPopup(false)}></button>
              </div>
              <div className="modal-body">
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
                  <button type="submit" className="btn btn-warning w-100">Iscriviti</button>
                </form>
                {message && (
                  <div className={`alert mt-3 alert-${variant}`} role="alert">
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
