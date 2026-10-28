// api/generate.ts (Vercel Serverless Function)
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, snippet } = req.body;
  const GEMINI_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_KEY) {
    return res.status(500).json({ error: 'Gemini API key is missing in Vercel env variables.' });
  }

  try {
    const prompt = `You are a tech journalist for Nova.Tech. Write a complete, engaging, 4-paragraph news article based on this headline: "${title}". Here is a short snippet for context: "${snippet}". Do not mention that this is AI-generated. Write it in an informative, professional tone.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    return res.status(200).json({ content: generatedText });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate article' });
  }
}
