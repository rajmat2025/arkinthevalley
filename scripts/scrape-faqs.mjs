const res = await fetch("https://www.arkinthevalley.com/content/832744/1/faq");
const html = await res.text();

const strip = (s) =>
  s
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const cards = [...html.matchAll(/<div class="card">([\s\S]*?)<\/div>\s*(?=<div class="card">|<\/div>\s*<!-- accordion end -->)/g)];

const faqs = [];

for (const card of cards) {
  const block = card[1];
  const qMatch = block.match(/<h4 class="mb-0">\s*<a[^>]*>([\s\S]*?)<\/a>/);
  if (!qMatch) continue;

  const aMatch = block.match(/<div class="card-block">([\s\S]*?)<\/div>/);
  faqs.push({
    q: strip(qMatch[1]),
    a: aMatch ? strip(aMatch[1]) : "",
  });
}

console.log(JSON.stringify(faqs, null, 2));
