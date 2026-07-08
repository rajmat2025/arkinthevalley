import fs from "fs";
import path from "path";

const downloads = [
  {
    url: "https://s3.amazonaws.com/dynamic.cdn.smartwcm.com/apartment/files/doc-lib/2020/11/12/08/17/35/212/head/1bed-plan.jpg",
    dest: "public/images/floorplans/1bed.jpg",
  },
  {
    url: "https://s3.amazonaws.com/dynamic.cdn.smartwcm.com/apartment/files/doc-lib/2020/11/12/08/17/59/505/head/2bed-plan.jpg",
    dest: "public/images/floorplans/2bed.jpg",
  },
  {
    url: "https://s3.amazonaws.com/dynamic.cdn.smartwcm.com/apartment/files/doc-lib/2021/01/08/09/32/56/715/head/land-mark-builders-apart-building-view.jpg",
    dest: "public/images/gallery/exterior-01.jpg",
  },
  {
    url: "https://s3.amazonaws.com/dynamic.cdn.smartwcm.com/apartment/files/doc-lib/2020/11/07/01/25/20/536/head/Apt-bldg-view%20-%20Copy.JPG",
    dest: "public/images/gallery/exterior-02.jpg",
  },
  {
    url: "https://s3.amazonaws.com/dynamic.cdn.smartwcm.com/apartment/files/doc-lib/2021/01/08/09/33/38/682/head/land-mark-builders-entry.jpg",
    dest: "public/images/gallery/entry-01.jpg",
  },
  {
    url: "https://s3.amazonaws.com/dynamic.cdn.smartwcm.com/apartment/files/doc-lib/2021/01/08/09/34/16/261/head/land-mark-builders-kitchen.jpg",
    dest: "public/images/gallery/kitchen-01.jpg",
  },
  {
    url: "https://s3.amazonaws.com/dynamic.cdn.smartwcm.com/apartment/files/doc-lib/2021/01/08/09/35/08/898/head/Land-mark-builders-studets-at-apartment.jpg",
    dest: "public/images/gallery/interior-01.jpg",
  },
  {
    url: "https://d1kv7s9g8y3npv.cloudfront.net/apartment/files/doc-lib/2019/06/21/08/39/28/837/head/Land-mark-builders-homepage-images-students-staying-at-apartment.jpg",
    dest: "public/images/gallery/living-02.jpg",
  },
  {
    url: "https://s3.amazonaws.com/dynamic.cdn.smartwcm.com/apartment/files/doc-lib/2019/06/19/06/29/03/161/head/Land-mark-builders-banner.jpg",
    dest: "public/images/gallery/community-01.jpg",
  },
  {
    url: "https://s3.amazonaws.com/dynamic.cdn.smartwcm.com/apartment/files/doc-lib/2019/06/19/07/52/33/125/head/Land-mark-builders-huntsville-tx-contact-us-banner.jpg",
    dest: "public/images/gallery/grounds-01.jpg",
  },
  {
    url: "https://s3.amazonaws.com/dynamic.cdn.smartwcm.com/apartment/files/doc-lib/2021/01/08/09/32/56/715/head/land-mark-builders-apart-building-view.jpg",
    dest: "public/images/hero/building-exterior.jpg",
  },
];

for (const { url, dest } of downloads) {
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
