const pages = [
  "https://www.arkinthevalley.com/",
  "https://www.arkinthevalley.com/content/832664/1/floor-plans",
  "https://www.arkinthevalley.com/content/832374/1/about-us",
  "https://www.arkinthevalley.com/content/832264/1/contact-us",
];

async function scrape(url) {
  const res = await fetch(url);
  const html = await res.text();
  console.log(`\n=== ${url} (${res.status}) ===`);

  const allLinks = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((x) => x[1]);
  allLinks
    .filter((l) => /gallery|photo|image|doc-lib/i.test(l))
    .forEach((l) => console.log("LINK:", l));

  const imgRegex = /(?:src|data-src|data-lazy-src|href)=["']([^"']+\.(?:jpg|jpeg|png|webp|JPG)(?:\?[^"']*)?)["']/gi;
  const images = new Set();
  let m;
  while ((m = imgRegex.exec(html)) !== null) {
    let src = m[1];
    if (src.startsWith("//")) src = "https:" + src;
    else if (src.startsWith("/")) src = new URL(src, url).href;
    if (!src.includes("favicon") && !src.includes("Logo")) images.add(src);
  }
  [...images].sort().forEach((i) => console.log("IMG:", i));
}

for (const url of pages) await scrape(url);
