const https = require('http');

https.get('http://jhtech.co.kr/%eb%a9%80%ed%8b%b0%ec%bb%b7-jc-series/', (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    const cheerio = require('cheerio');
    const $ = cheerio.select ? cheerio.load(data) : require('cheerio').load(data);
    console.log($('body').text().replace(/\s+/g, ' '));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
