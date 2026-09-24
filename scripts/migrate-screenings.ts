import fs from "node:fs";
import path from "node:path";
import { locationsData } from "../components/roadshow-data";

const MONTHS: Record<string, number> = {
  januari: 1, februari: 2, maret: 3, april: 4, mei: 5, juni: 6,
  juli: 7, agustus: 8, september: 9, oktober: 10, november: 11, desember: 12,
};

// Mengembalikan tanggal terakhir dalam teks, format YYYY-MM-DD.
// Mengembalikan undefined bila tidak ada bulan (mis. "2025–2026").
function parseLastDate(text: string): { date?: string; count: number } {
  const tokens = text.toLowerCase().match(/\d{4}|\d{1,2}|[a-z]+/g) ?? [];
  let year: number | undefined;
  let pending: number[] = [];
  const found: { d: number; m: number }[] = [];

  for (const t of tokens) {
    if (/^\d{4}$/.test(t)) year = Number(t);
    else if (/^\d{1,2}$/.test(t)) pending.push(Number(t));
    else if (MONTHS[t]) {
      pending.forEach((d) => found.push({ d, m: MONTHS[t] }));
      pending = [];
    }
  }
  if (!year || found.length === 0) return { count: 0 };
  const last = found[found.length - 1];
  const mm = String(last.m).padStart(2, "0");
  const dd = String(last.d).padStart(2, "0");
  return { date: `${year}-${mm}-${dd}`, count: found.length };
}

const outDir = path.join(process.cwd(), "content", "screenings");
fs.mkdirSync(outDir, { recursive: true });

let created = 0;
let skipped = 0;

for (const loc of locationsData) {
  const file = path.join(outDir, `${loc.id}.json`);
  if (fs.existsSync(file)) {
    skipped++;
    continue; // jangan timpa file yang mungkin sudah diedit di admin
  }

  const { date, count } = parseLastDate(loc.date_id);
  const needLabel = !date || count > 1;

  const doc: Record<string, unknown> = {
    title: loc.name_id,
    ...(loc.name_en !== loc.name_id ? { title_en: loc.name_en } : {}),
    region: loc.region,
    category_id: loc.category_id,
    category_en: loc.category_en,
    ...(date ? { date } : {}),
    ...(loc.time && loc.time !== "TBA" ? { time: loc.time } : {}),
    ...(needLabel ? { dateLabel_id: loc.date_id, dateLabel_en: loc.date_en } : {}),
    address: loc.address,
    lat: loc.lat,
    lng: loc.lng,
    ...(loc.thumbnailUrl ? { thumbnail: loc.thumbnailUrl } : {}),
    description_id: loc.desc_id,
    description_en: loc.desc_en,
    ...(loc.feedback_id ? { review_id: loc.feedback_id, review_en: loc.feedback_en } : {}),
    ...(loc.mediaReleaseUrl
      ? { mediaLinks: [{ title: "Press Release", url: loc.mediaReleaseUrl }] }
      : {}),
  };

  fs.writeFileSync(file, JSON.stringify(doc, null, 2), "utf8");
  created++;
  console.log(`${loc.id.padEnd(22)} ${loc.date_id.padEnd(26)} → ${date ?? "(TBA)"}`);
}

console.log(`\nSelesai: ${created} file dibuat, ${skipped} dilewati (sudah ada).`);