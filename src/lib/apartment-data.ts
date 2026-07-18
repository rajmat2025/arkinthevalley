import fs from "fs";
import path from "path";
import bundledData from "@/data/apartmentData.json";
import type { ApartmentData } from "@/types/apartment";

function hostingerPersistentPath(cwd: string): string | null {
  const match = cwd.match(/^(.*\/domains\/[^/]+)\/nodejs\/?$/);
  if (!match) return null;
  return path.join(match[1], "data", "apartmentData.json");
}

function resolveDataPath(): string {
  const envPath = process.env.APARTMENT_DATA_PATH?.trim();
  if (envPath) return path.resolve(envPath);

  const hostingerPath = hostingerPersistentPath(process.cwd());
  if (hostingerPath) return hostingerPath;

  return path.join(process.cwd(), "src", "data", "apartmentData.json");
}

/** Load site content at runtime so production edits survive Hostinger redeploys. */
export function getApartmentData(): ApartmentData {
  const dataPath = resolveDataPath();

  try {
    if (fs.existsSync(dataPath)) {
      const raw = fs.readFileSync(dataPath, "utf8");
      return JSON.parse(raw) as ApartmentData;
    }
  } catch (error) {
    console.error(`[apartment-data] Failed to read ${dataPath}:`, error);
  }

  return bundledData as ApartmentData;
}
