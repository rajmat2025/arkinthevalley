#!/usr/bin/env node
/**
 * Embed preserve-apartment-data.js into Next standalone output and hook it into
 * server.js so Hostinger's default start command (node server.js) preserves data
 * with no hPanel changes.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const standalone = path.join(root, ".next", "standalone");
const serverPath = path.join(standalone, "server.js");

if (!fs.existsSync(serverPath)) {
  console.log("[standalone-data] No standalone build yet — skip");
  process.exit(0);
}

const preserveSrc = path.join(__dirname, "preserve-apartment-data.js");
const preserveDest = path.join(standalone, "preserve-apartment-data.js");
fs.copyFileSync(preserveSrc, preserveDest);

const hook = "require('./preserve-apartment-data.js');\n";
let serverSource = fs.readFileSync(serverPath, "utf8");

if (!serverSource.includes("preserve-apartment-data.js")) {
  serverSource = hook + serverSource;
  fs.writeFileSync(serverPath, serverSource);
}

const starter = `#!/usr/bin/env node
"use strict";
require("./preserve-apartment-data.js");
require("./server.js");
`;
fs.writeFileSync(path.join(standalone, "start-with-data.js"), starter);

console.log(
  "[standalone-data] Hooked preserve-apartment-data.js into server.js (no hPanel change needed)"
);
