import http from 'http';
import * as cheerio from 'cheerio';

const urls = [
  'http://jhtech.co.kr/multicut/',
  'http://jhtech.co.kr/multicut_pro/'
];

urls.forEach((url) => {
  http.get(url, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      const $ = cheerio.load(data);
      const text = $('body').text().replace(/\s+/g, ' ');
      console.log(`\n\n--- Content for ${url} ---\n`);
      console.log(text.substring(0, 5000));
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});
