const res = await fetch("https://www.arkinthevalley.com/content/832664/1/floor-plans");
const html = await res.text();

// Find View Gallery context
const idx = html.indexOf("View Gallery");
console.log(html.slice(Math.max(0, idx - 500), idx + 1500));

// All doc-lib references
const refs = [...html.matchAll(/doc-lib[^"']+/g)].map((m) => m[0]);
console.log("\n--- doc-lib refs ---");
[...new Set(refs)].forEach((r) => console.log(r));
