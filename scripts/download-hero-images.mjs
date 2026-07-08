import fs from "fs";
import path from "path";

const heroDownloads = [
  {
    url: "https://s3.amazonaws.com/dynamic.cdn.smartwcm.com/apartment/files/doc-lib/2020/11/07/01/25/20/536/head/Apt-bldg-view%20-%20Copy.JPG",
    dest: "public/images/hero/slide-building.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80",
    dest: "public/images/hero/slide-shsu-campus.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80",
    dest: "public/images/hero/slide-huntsville-nature.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1920&q=80",
    dest: "public/images/hero/slide-huntsville-downtown.jpg",
  },
];

for (const { url, dest } of heroDownloads) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAILED ${res.status} ${url}`);
    continue;
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  console.log(`Saved ${dest} (${buffer.length} bytes)`);
}
