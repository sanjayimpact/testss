import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import express from 'express';
const app = express();
const port = 10000;
// Use stealth plugin
puppeteer.use(StealthPlugin());
app.use(express.static('.'));
const run = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto('https://www.whatismybrowser.com/');
    await page.screenshot({ path: 'stealth_test.png' });

    console.log('✅ Screenshot captured successfully!');
    await browser.close();
  } catch (error) {
    console.error('❌ Puppeteer run failed:', error);
  }
};
app.get('/screenshot', (req, res) => {
  res.sendFile('stealth_test.png', { root: '.' });
});
app.listen(port,()=>{
    run();
    console.log(`Server is running on port ${port}`);
})



