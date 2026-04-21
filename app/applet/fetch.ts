import http from 'http';
import * as cheerio from 'cheerio';

http.get('http://jhtech.co.kr/%eb%a9%80%ed%8b%b0%ec%bb%b7-jc-series/', (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    const $ = cheerio.load(data);
    const result = $('body').text().replace(/\s+/g, ' ');
    console.log(result.substring(0, 5000));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
