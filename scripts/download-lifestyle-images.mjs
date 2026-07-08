import fs from "fs";
import path from "path";

const downloads = [
  {
    url: "https://www.huntsvilletexas.com/ImageRepository/Document?documentID=1820",
    dest: "public/images/lifestyle/art-culture.jpg",
  },
  {
    url: "https://www.huntsvilletexas.com/ImageRepository/Document?documentID=1826",
    dest: "public/images/lifestyle/family-fun.jpg",
  },
  {
    url: "https://www.huntsvilletexas.com/ImageRepository/Document?documentID=1828",
    dest: "public/images/lifestyle/sam-houston-history.jpg",
  },
  {
    url: "https://www.huntsvilletexas.com/ImageRepository/Document?documentID=1831",
    dest: "public/images/lifestyle/history-museums.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    dest: "public/images/lifestyle/outdoor-recreation.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    dest: "public/images/lifestyle/food-drink.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    dest: "public/images/lifestyle/downtown-night.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf88?auto=format&fit=crop&w=1200&q=80",
    dest: "public/images/lifestyle/campus-life.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    dest: "public/images/lifestyle/peaceful-home.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80",
    dest: "public/images/lifestyle/neighborhood.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1559027615-cd4628904144?auto=format&fit=crop&w=1200&q=80",
    dest: "public/images/lifestyle/community-service.jpg",
  },
];

for (const { url, dest } of downloads) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) {
    console.error(`FAILED ${res.status} ${url}`);
    continue;
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  console.log(`Saved ${dest} (${buffer.length} bytes)`);
}
