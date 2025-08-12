const express = require('express');
const scrapeMaps = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
  const query = req.query.q || 'restaurants near me';
  try {
    const data = await scrapeMaps(query);
    res.json({ query, results: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Scraping failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
