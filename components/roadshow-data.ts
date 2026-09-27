export type RegionKey = "all" | "bali" | "jogja" | "jabar" | "jakarta" | "jatim";

export interface MediaLink {
  title: string;
  url: string;
  note_id?: string;
  note_en?: string;
}
export interface RoadshowLocation {
  date?: string; // format 2026-10-15, kosong = TBA
  gallery?: string[];
  mediaLinks?: MediaLink[];
  rsvpUrl?: string;
}
export interface RoadshowLocation {
  id: string;
  region: Exclude<RegionKey, "all">;
  name_id: string;
  name_en: string;
  date_id: string;
  date_en: string;
  time: string;
  address: string;
  lat: number;
  lng: number;
  category_id: string;
  category_en: string;
  desc_id: string;
  desc_en: string;
  feedback_id?: string;
  feedback_en?: string;
  imageText_id?: string;
  imageText_en?: string;
  thumbnailUrl?: string;
  mediaReleaseUrl?: string;
}

export const REGION_TABS: { key: RegionKey; label: string }[] = [
  { key: "all", label: "SEMUA" },
  { key: "jakarta", label: "JAKARTA" },
  { key: "jabar", label: "JAWA BARAT" },
  { key: "jogja", label: "DIY" },
  { key: "jatim", label: "JAWA TIMUR" },
  { key: "bali", label: "BALI" },
];

export const DEFAULT_CENTER: [number, number] = [-7.8, 111.5];
export const DEFAULT_ZOOM = 7;
export const FLY_TO_ZOOM = 16;

export type ScreeningStatus = "upcoming" | "finished" | "tba";
export type StatusFilter = "all" | "upcoming" | "finished";

// Tanggal hari ini di WIB, format 2026-09-24
export function todayISO() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });
}

export function getStatus(loc: { date?: string }, today: string): ScreeningStatus {
  if (!loc.date) return "tba";
  return loc.date < today ? "finished" : "upcoming";
}
