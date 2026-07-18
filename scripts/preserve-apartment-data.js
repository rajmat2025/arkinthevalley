#!/usr/bin/env node
/**
 * Keep apartmentData.json outside the redeployed nodejs/ folder.
 *
 * Hostinger layout:
 *   /domains/<site>/data/apartmentData.json  ← persistent (never wiped)
 *   /domains/<site>/nodejs/src/data/...      ← symlink to persistent file
 *
 * Set in hPanel: APARTMENT_DATA_PATH=/home/.../domains/<site>/data/apartmentData.json
 */
const fs = require("fs");
const path = require("path");

const LEGACY_SOURCES = (cwd) => [
  path.join(cwd, "src", "data", "apartmentData.json"),
  path.join(cwd, "data", "apartmentData.json"),
];

function defaultPersistentPath(cwd) {
  if (process.env.APARTMENT_DATA_PATH?.trim()) {
    return path.resolve(process.env.APARTMENT_DATA_PATH.trim());
  }

  const match = cwd.match(/^(.*\/domains\/[^/]+)\/nodejs\/?$/);
  if (match) {
    return path.join(match[1], "data", "apartmentData.json");
  }

  return null;
}

function shouldRun(cwd) {
  if (process.env.HOSTINGER_PRESERVE_DATA === "0") return false;
  if (process.env.APARTMENT_DATA_PATH?.trim()) return true;
  if (process.env.HOSTINGER_PRESERVE_DATA === "1") return true;
  if (cwd.includes("/domains/") && cwd.endsWith("/nodejs")) return true;
  return false;
}

function bundledSeedPath(cwd) {
  const candidates = [
    path.join(cwd, "src", "data", "apartmentData.json"),
    path.join(cwd, ".next", "standalone", "src", "data", "apartmentData.json"),
  ];

  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) continue;
    const stat = fs.lstatSync(candidate);
    if (stat.isFile() && !stat.isSymbolicLink()) return candidate;
  }

  return null;
}

function copyIfMissing(src, dest) {
  if (!fs.existsSync(src)) return false;
  const stat = fs.lstatSync(src);
  if (!stat.isFile() || stat.isSymbolicLink()) return false;
  if (fs.existsSync(dest)) return false;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  return true;
}

function migrateLegacySources(cwd, persistentPath) {
  if (fs.existsSync(persistentPath)) return 0;

  let migrated = 0;
  for (const src of LEGACY_SOURCES(cwd)) {
    if (path.resolve(src) === path.resolve(persistentPath)) continue;
    if (copyIfMissing(src, persistentPath)) {
      console.log(`[preserve-data] Seeded ${persistentPath} from ${src}`);
      migrated++;
      break;
    }
  }
  return migrated;
}

function ensureSymlink(deployFile, persistentPath) {
  fs.mkdirSync(path.dirname(deployFile), { recursive: true });

  if (fs.existsSync(deployFile)) {
    const stat = fs.lstatSync(deployFile);
    if (stat.isSymbolicLink()) {
      const target = fs.readlinkSync(deployFile);
      if (path.resolve(path.dirname(deployFile), target) === path.resolve(persistentPath)) {
        return;
      }
      fs.unlinkSync(deployFile);
    } else if (stat.isFile()) {
      if (!fs.existsSync(persistentPath)) {
        fs.copyFileSync(deployFile, persistentPath);
        console.log(`[preserve-data] Copied live edits to ${persistentPath}`);
      }
      fs.unlinkSync(deployFile);
    }
  }

  fs.symlinkSync(persistentPath, deployFile);
  console.log(`[preserve-data] Linked ${deployFile} -> ${persistentPath}`);

  if (!process.env.APARTMENT_DATA_PATH) {
    process.env.APARTMENT_DATA_PATH = persistentPath;
  }
}

function main() {
  const cwd = process.cwd();
  if (!shouldRun(cwd)) {
    console.log("[preserve-data] Skipped (local dev uses src/data/apartmentData.json)");
    return;
  }

  const persistentPath = defaultPersistentPath(cwd);
  if (!persistentPath) {
    console.log("[preserve-data] Not a Hostinger nodejs deploy — using bundled src/data/");
    return;
  }

  fs.mkdirSync(path.dirname(persistentPath), { recursive: true });

  if (!fs.existsSync(persistentPath)) {
    const seeded = migrateLegacySources(cwd, persistentPath);
    if (!seeded) {
      const bundled = bundledSeedPath(cwd);
      if (bundled && copyIfMissing(bundled, persistentPath)) {
        console.log(`[preserve-data] Seeded ${persistentPath} from bundled ${bundled}`);
      }
    }
  }

  if (!fs.existsSync(persistentPath)) {
    console.log("[preserve-data] WARNING: no apartmentData.json found — create one at " + persistentPath);
    return;
  }

  const deployFile = path.join(cwd, "src", "data", "apartmentData.json");
  ensureSymlink(deployFile, persistentPath);

  console.log(`[preserve-data] Storage: ${persistentPath}`);
}

main();
