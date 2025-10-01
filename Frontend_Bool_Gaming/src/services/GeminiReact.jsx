import axios from "axios";
import { useState } from "react";

export const useGemini = () => {
  const [answer, setAnswer] = useState('');

  const askAI = async (videogames, question) => {
    if (!question) return;

    const productInfo = videogames.map(videogame =>
      `Nome: ${videogame.title}, Descrizione: ${videogame.description}, Prezzo: ${videogame.price}€, Uscita: ${videogame.release_date}, Pegi: ${videogame.pegi}.join("\n");`
    );

    try {
      const resp = await axios.post('http://localhost:3000/ask', { productInfo, question });
      setAnswer(resp.data.answer);
    } catch (err) {
      console.error("Errore Gemini:", err);
      setAnswer("Spiacente, non sono riuscito a trovare una risposta.");
    }
  };

  return { answer, askAI };
};
