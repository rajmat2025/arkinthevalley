import fs from "fs";
import path from "path";

const minimalJpeg = Buffer.from(
  "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA//2Q==",
  "base64"
);

const images = [
  "public/images/gallery/exterior-01.jpg",
  "public/images/gallery/interior-01.jpg",
  "public/images/gallery/kitchen-01.jpg",
  "public/images/gallery/grounds-01.jpg",
  "public/images/floorplans/1bed.jpg",
  "public/images/floorplans/2bed.jpg",
];

for (const file of images) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, minimalJpeg);
  console.log("Created:", file);
}
