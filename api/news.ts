import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Get the category from the frontend request (default to technology)
  const category = (req.query.category as string) || 'technology';
  const API_KEY = process.env.VITE_GNEWS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key is missing on the server.' });
  }

  try {
    // 2. Fetch from GNews on the server side (No CORS restrictions here)
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&max=12&apikey=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`GNews API Error: ${response.status}`);
    }

    const data = await response.json();

    // 3. Send the data back to your frontend
    res.status(200).json(data);
  } catch (error: any) {
    console.error('Proxy Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch news from provider.' });
  }
}
