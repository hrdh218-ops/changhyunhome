async function run() {
  const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCgtOBSZ7mGu5PXaC19rk7tw");
  const data = await res.json();
  console.log(data);
}
run();
