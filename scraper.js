const puppeteer = require('puppeteer');

async function scrapeMaps(searchQuery) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
  await page.goto(searchUrl, { waitUntil: 'networkidle2' });
  
  await page.waitForSelector('.hfpxzc'); // waits for result elements

  const results = await page.evaluate(() => {
    const data = [];
    document.querySelectorAll('.hfpxzc').forEach(el => {
      const name = el.getAttribute('aria-label') || null;
      const link = el.href || null;
      data.push({ name, link });
    });
    return data;
  });

  await browser.close();
  return results;
}

module.exports = scrapeMaps;
