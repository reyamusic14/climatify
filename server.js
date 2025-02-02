require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const app = express();

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Unsplash API endpoint
app.get('/api/unsplash', async (req, res) => {
    const { city, damageType } = req.query;
    
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos/random?query=${damageType},${city}&count=2`,
            {
                headers: {
                    'Authorization': `Client-ID ${process.env.UNSPLASH_API_KEY}`
                }
            }
        );
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Unsplash images' });
    }
});

// OpenAI image generation endpoint
app.post('/api/generate-ai-image', async (req, res) => {
    const { city, damageType } = req.body;
    
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Generate a realistic image showing the impact of ${damageType} due to climate change in ${city}. Make it photorealistic and impactful.`,
            n: 2,
            size: "1024x1024",
        });

        res.json({ images: response.data });
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ error: 'Error generating AI images' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000')); 