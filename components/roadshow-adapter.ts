import type { RoadshowLocation } from "./roadshow-data";

function formatDate(iso: string, lang: "id" | "en") {
  return new Date(iso + "T00:00:00Z").toLocaleDateString(
    lang === "id" ? "id-ID" : "en-US",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
  );
}

// Menerjemahkan satu dokumen Tina ke bentuk yang dipakai komponen peta
export function fromTina(n: any): RoadshowLocation {
  const dateLabel = (lang: "id" | "en") =>
    n[`dateLabel_${lang}`] ||
    (n.date
      ? formatDate(n.date, lang)
      : lang === "id" ? "Jadwal segera diumumkan" : "Schedule to be announced");

  return {
    id: n._sys.filename,
    region: n.region,
    name_id: n.title,
    name_en: n.title_en || n.title,
    date: n.date ?? undefined,
    date_id: dateLabel("id"),
    date_en: dateLabel("en"),
    time: n.time ?? "",
    address: n.address ?? "",
    lat: n.lat,
    lng: n.lng,
    category_id: n.category_id ?? "",
    category_en: n.category_en || n.category_id || "",
    desc_id: n.description_id ?? "",
    desc_en: n.description_en || n.description_id || "",
    feedback_id: n.review_id ?? undefined,
    feedback_en: n.review_en || n.review_id || undefined,
    thumbnailUrl: n.thumbnail ?? undefined,
    gallery: (n.gallery ?? []).filter(Boolean),
    mediaLinks: (n.mediaLinks ?? [])
      .filter((m: any) => m?.url)
      .map((m: any) => ({
        title: m.title || m.url,
        url: m.url,
        note_id: m.note_id ?? undefined,
        note_en: m.note_en ?? undefined,
      })),
    rsvpUrl: n.rsvpUrl ?? undefined,
  };
}