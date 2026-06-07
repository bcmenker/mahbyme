export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;
  if (!REPLICATE_API_KEY) return res.status(500).json({ error: 'API key not configured on server' });

  try {
    const { action, image, prompt, predictionId } = req.body;

    if (action === 'create') {
      const response = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-kontext-pro/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${REPLICATE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: {
            input_image: image,
            prompt: prompt,
            output_format: 'png',
            safety_tolerance: 2,
            aspect_ratio: 'match_input_image',
          }
        })
      });

      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({ error: data.detail || JSON.stringify(data) || 'Replicate error' });
      }
      return res.status(200).json(data);
    }

    if (action === 'poll') {
      const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: { 'Authorization': `Bearer ${REPLICATE_API_KEY}` }
      });
      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: 'Invalid action' });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
