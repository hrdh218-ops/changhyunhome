const https = require('http');

https.get('http://jhtech.co.kr/flora-xtra-3300h/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("3300H Content Length:", data.length);
    const textMatches = data.match(/<[^>]*>([^<]+)<\/[^>]*>/g);
    if (textMatches) {
      console.log(textMatches.slice(0, 50).join('\n'));
    }
  });
});
