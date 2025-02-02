require('dotenv').config();
const express = require('express');
const app = express();

app.get('/api/images', async (req, res) => {
    const { city, damageType } = req.query;
    
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos/random?query=${damageType},${city}&count=4`,
            {
                headers: {
                    'Authorization': `Client-ID ${process.env.UNSPLASH_API_KEY}`
                }
            }
        );
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching images' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000')); 