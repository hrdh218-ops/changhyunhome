const fetch = require('node-fetch');
async function test() {
  const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCcK_X0K4tW_Ie-B4d6Iu8qQ');
  const data = await res.json();
  console.log(data.items?.[0]?.link);
}
test();
