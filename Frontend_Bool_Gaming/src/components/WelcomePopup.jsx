import { useState } from "react";

export default function WelcomePopup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setMessage("Inserisci un’email valida!");

    try {
      const res = await fetch(`https://bool-gaming-backend-nu.vercel.app/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage("✅ Email inviata correttamente!");
      } else {
        setMessage(`❌ Errore: ${data.error || data.message}`);
      }
    } catch (err) {
      setMessage(`❌ Errore: ${err.message}`);
    }
  };

  if (!showPopup) return null;

  return (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.container}>
        <h2>Iscriviti alla newsletter</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="La tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Iscriviti</button>
        </form>
        {message && <p>{message}</p>}
        <button onClick={() => setShowPopup(false)}>Chiudi</button>
      </div>
    </div>
  );

}

const popupStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    maxWidth: "400px",
    width: "90%",
    textAlign: "center",
  },
};