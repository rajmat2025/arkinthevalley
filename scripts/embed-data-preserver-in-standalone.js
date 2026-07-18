#!/usr/bin/env node
/**
 * Embed preserve-apartment-data.js + start-with-data.js into Next standalone output
 * so Hostinger nodejs/ gets them on Git deploy.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const standalone = path.join(root, ".next", "standalone");

if (!fs.existsSync(path.join(standalone, "server.js"))) {
  console.log("[standalone-data] No standalone build yet — skip");
  process.exit(0);
}

const preserveSrc = path.join(__dirname, "preserve-apartment-data.js");
const preserveDest = path.join(standalone, "preserve-apartment-data.js");
fs.copyFileSync(preserveSrc, preserveDest);

const starter = `#!/usr/bin/env node
"use strict";
require("./preserve-apartment-data.js");
require("./server.js");
`;
fs.writeFileSync(path.join(standalone, "start-with-data.js"), starter);

console.log(
  "[standalone-data] Added preserve-apartment-data.js + start-with-data.js to standalone/"
);
