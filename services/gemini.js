const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY
});

async function askProductQuestion(productInfo, question) {
  const prompt = `
    Informazioni prodotto: ${productInfo}
    Domanda utente: ${question}
    Rispondi in modo chiaro e utile all'utente.
  `;

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ text: prompt }],
    });

    const answer = result?.candidates?.[0]?.content?.parts?.[0]?.text
      || 'Spiacente, non sono riuscito a trovare una risposta.';

    return answer;
  } catch (err) {
    console.error('Errore Gemini:', err);
    return 'Spiacente, non sono riuscito a trovare una risposta.';
  }
}
module.exports = { askProductQuestion };
