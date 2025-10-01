import { useState } from "react";

const GeminiChat = ({ videogames, askAI, answer }) => {
  const [question, setQuestion] = useState('');

  const handleAsk = () => {
    askAI(videogames, question);
  };

  return (
    <div className="pt-3 text-center">
      <h2 className="p-4">Chiedi a Gemini</h2>

      <input
        type="text"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Domanda a gemini"
        className="form-control mb-2 mx-auto"
        style={{ maxWidth: "400px" }}
      />

      <div className="d-flex justify-content-center p-3">
        <button onClick={handleAsk} className="btn btn-primary mb-2 p-2">
          Chiedi
        </button>
      </div>

      {answer && (
        <div className="answer mt-2 p-2 border rounded text-start mx-auto" style={{ maxWidth: "500px" }}>
          <strong>Risposta di Gemini:</strong> {answer}
        </div>
      )}
    </div>
  );
};

export default GeminiChat;