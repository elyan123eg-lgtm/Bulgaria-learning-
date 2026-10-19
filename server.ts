import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.post('/api/chat', async (req, res) => {
  const { messages, topic } = req.body;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are a Bulgarian language tutor. Teach about: ${topic}. 
                 Chat history: ${JSON.stringify(messages)}. 
                 Respond in both Bulgarian and English.`,
    });
    res.json({ message: response.text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
