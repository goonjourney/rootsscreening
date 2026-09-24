"use client";

// components/roadshow-map-client.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  FLY_TO_ZOOM,
  REGION_TABS,
  getStatus,
  todayISO,
  type ScreeningStatus,
  type StatusFilter,
  type RegionKey,
  type RoadshowLocation,
} from "@/components/roadshow-data";

import { useLanguage } from "@/context/LanguageContext";

const TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}";
const TILE_ATTRIBUTION =
  'Tiles &copy; <a href="https://www.esri.com/" target="_blank" rel="noreferrer">Esri</a>';

  export default function RoadshowMapClient({ locations }: { locations: RoadshowLocation[] }) {
  const { lang } = useLanguage();

  const [detailModalLocation, setDetailModalLocation] = useState<RoadshowLocation | null>(null);

  // State baru untuk Lock View & Multi Seleksi
  const [isLockView, setIsLockView] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const markersRef = useRef<Marker[]>([]);

  const [isMapReady, setIsMapReady] = useState(false);
  const [activeRegion, setActiveRegion] = useState<RegionKey>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
const today = useMemo(() => todayISO(), []);

// Filter wilayah saja, dipakai untuk menghitung jumlah per status
const regionLocations = useMemo(
  () => (activeRegion === "all" ? locations : locations.filter((l) => l.region === activeRegion)),
  [activeRegion, locations]
);

const counts = useMemo(() => {
  const c = { all: regionLocations.length, upcoming: 0, finished: 0 };
  regionLocations.forEach((l) => {
    if (getStatus(l, today) === "finished") c.finished++;
    else c.upcoming++; // termasuk TBA
  });
  return c;
}, [regionLocations, today]);

const filteredLocations = useMemo(() => {
  const ORDER = { upcoming: 0, tba: 1, finished: 2 } as const;
  return regionLocations
    .filter((l) => {
      const s = getStatus(l, today);
      if (statusFilter === "upcoming") return s !== "finished";
      if (statusFilter === "finished") return s === "finished";
      return true;
    })
    .sort((a, b) => {
      const sa = getStatus(a, today);
      const sb = getStatus(b, today);
      if (sa !== sb) return ORDER[sa] - ORDER[sb];
      if (sa === "upcoming") return (a.date ?? "").localeCompare(b.date ?? "");
      if (sa === "finished") return (b.date ?? "").localeCompare(a.date ?? "");
      return 0;
    });
}, [regionLocations, statusFilter, today]);

  const selectedLocation = useMemo(
    () => locations.find((loc) => loc.id === selectedId) ?? null,
    [selectedId, locations]
  );

  // --- 1) Inisialisasi peta ---
  useEffect(() => {
    let cancelled = false;
    let createdMap: LeafletMap | null = null;

    async function initMap() {
      if (!containerRef.current) return;

      const container = containerRef.current as HTMLDivElement & {
        _leaflet_id?: number | null;
      };
      if (container._leaflet_id) {
        container._leaflet_id = null;
      }

      const leaflet = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      const map = leaflet.map(containerRef.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      leaflet
        .tileLayer(TILE_URL, {
          attribution: TILE_ATTRIBUTION,
          maxZoom: 19,
        })
        .addTo(map);

      leafletRef.current = leaflet;
      mapRef.current = map;
      createdMap = map;
      setIsMapReady(true);
    }

    initMap();

    return () => {
      cancelled = true;
      setIsMapReady(false);

      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      if (createdMap) {
        createdMap.remove();
      }
      mapRef.current = null;
      leafletRef.current = null;

      const container = containerRef.current as
        | (HTMLDivElement & { _leaflet_id?: number | null })
        | null;
      if (container) {
        container._leaflet_id = null;
      }
    };
  }, []);

  // --- 2) Event listener modal detail ---
  useEffect(() => {
    const handleOpenDetailModal = (e: CustomEvent<string>) => {
      const loc = locations.find((item) => item.id === e.detail);
      if (loc) setDetailModalLocation(loc);
    };

    window.addEventListener("open-location-detail" as any, handleOpenDetailModal);
    return () => {
      window.removeEventListener("open-location-detail" as any, handleOpenDetailModal);
    };
  }, [locations]);

  // --- 3) Render ulang marker saat filter region / status Lock View berubah ---
  useEffect(() => {
    const map = mapRef.current;
    const leaflet = leafletRef.current;
    if (!map || !leaflet || !isMapReady) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    filteredLocations.forEach((loc) => {
    const status = getStatus(loc, today);
    const icon = leaflet.divIcon({
      className: "roadshow-marker",
      html: `<span class="roadshow-marker-dot is-${status}"></span>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
  });
  const marker = leaflet
    .marker([loc.lat, loc.lng], { icon })
    .addTo(map)
    .bindPopup(buildPopupHtml(loc, lang, status), {
          closeButton: true,
          // Saat Lock View aktif, matikan autoClose agar multiple popup bisa dibuka bersamaan
          autoClose: !isLockView,
          closeOnClick: !isLockView,
          className: "roadshow-popup",
        });

      marker.on("click", () => {
        setSelectedId(loc.id);
      });
      markersRef.current.push(marker);
    });
  }, [filteredLocations, isMapReady, isLockView, lang, today]);

  // --- 4) flyTo saat lokasi dipilih (Hanya jika Lock View OFF) ---
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedLocation) return;

    // Jika Lock View TIDAK aktif, lakukan pergerakan kamera (flyTo) & buka popup tunggal
    if (!isLockView) {
      map.flyTo([selectedLocation.lat, selectedLocation.lng], FLY_TO_ZOOM, {
        duration: 1.2,
      });

      const marker = markersRef.current.find((m) => {
        const pos = m.getLatLng();
        return pos.lat === selectedLocation.lat && pos.lng === selectedLocation.lng;
      });
      marker?.openPopup();
    } else {
      // Jika Lock View AKTIF, hanya buka popup marker tanpa memindahkan kamera/zoom
      const marker = markersRef.current.find((m) => {
        const pos = m.getLatLng();
        return pos.lat === selectedLocation.lat && pos.lng === selectedLocation.lng;
      });
      marker?.openPopup();
    }
  }, [selectedLocation, isLockView]);

  function handleSelectRegion(region: RegionKey) {
    setActiveRegion(region);
    setSelectedId(null);
  }

  function handleResetView() {
    const map = mapRef.current;
    if (!map) return;
    setSelectedId(null);
    map.closePopup();
    map.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, { duration: 1 });
  }

  const modalStatus: ScreeningStatus = detailModalLocation
    ? getStatus(detailModalLocation, today)
    : "finished";

  return (
    <section className="relative w-full bg-neutral-950 text-white py-8">
      {/* Header + Tab Filter Region */}
      <div className="mx-auto mb-6 flex w-full max-w-7xl flex-col gap-5 px-6 md:flex-row md:items-end md:justify-between lg:px-12">
        <div className="min-w-0">
          <span className="font-sans text-xs uppercase tracking-widest text-amber-500">
            {lang === "id" ? "PETA JELAJAH PEMUTARAN INTERAKTIF" : "INTERACTIVE SCREENING MAP"}
          </span>
          <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl lg:text-4xl">
            {lang === "id" ? "PETA ROADSHOW TOUR DE JAVA & BALI" : "JAVA & BALI ROADSHOW MAP"}
          </h2>
        </div>

        <div className="flex max-w-full flex-wrap justify-start gap-2 text-xs tracking-wider md:justify-end">
          {REGION_TABS.map((tab) => {
            const isActive = tab.key === activeRegion;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleSelectRegion(tab.key)}
                className={
                  isActive
                    ? "rounded bg-amber-500 px-4 py-2 font-bold text-neutral-950 shadow-md transition-all"
                    : "rounded bg-neutral-900 border border-neutral-800 px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all"
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

        {/* Container Peta full-bleed */}
        <div className="relative flex h-[85svh] w-full flex-col overflow-hidden border-y border-neutral-800 bg-neutral-900 md:block md:h-[650px]">
          {/* Area peta */}
          <div className="relative h-1/2 w-full md:h-full">
          <div ref={containerRef} className="z-0 h-full w-full" />

        {!isMapReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900 text-sm font-mono text-neutral-500">
            MEMUAT PETA...
          </div>
        )}

        {/* Tombol Kontrol Peta */}
        <div className="absolute left-14 top-2 z-[1000] flex items-center gap-2 md:left-20 md:top-4">
          {/* Tombol Reset View */}
          <button
            type="button"
            onClick={handleResetView}
            className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950/90 px-3.5 py-2 text-xs font-semibold tracking-wider text-amber-400 shadow-xl backdrop-blur-md transition-colors hover:bg-neutral-900"
          >
            <ResetIcon />
            {lang === "id" ? "RESET VIEW" : "RESET VIEW"}
          </button>

          {/* Tombol Lock View */}
          <button
            type="button"
            onClick={() => setIsLockView(!isLockView)}
            className={
              "flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold tracking-wider shadow-xl backdrop-blur-md transition-all " +
              (isLockView
                ? "border-amber-500 bg-amber-500 text-neutral-950 font-bold"
                : "border-neutral-800 bg-neutral-950/90 text-neutral-300 hover:bg-neutral-900")
            }
          >
            <span>
              {isLockView
                ? lang === "id" ? "🔒 KUNCI TAMPILAN (AKTIF)" : "🔒 LOCK VIEW (ON)"
                : lang === "id" ? "🔓 KUNCI TAMPILAN (NONAKTIF)" : "🔓 LOCK VIEW (OFF)"}
            </span>
          </button>
        </div>

        {!isDrawerOpen && (
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="absolute right-4 top-4 z-[1000] rounded-lg border border-neutral-800 bg-neutral-950/90 px-3.5 py-2 text-xs font-semibold tracking-wider text-amber-400 shadow-xl backdrop-blur-md hover:bg-neutral-900"
          >
            {lang === "id" ? "LOKASI" : "LOCATIONS"} ▸
          </button>
        )}
        </div>

        {/* Side Drawer Panel */}
        <div
          className={
            "absolute bottom-4 right-4 top-4 z-[1000] flex w-[calc(100%-2rem)] flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/95 shadow-2xl backdrop-blur-md transition-transform duration-300 ease-out sm:w-[380px] md:w-[420px] " +
            (isDrawerOpen ? "translate-x-0" : "pointer-events-none translate-x-[calc(100%+1.5rem)]")
          }
        >
          <div className="flex items-center justify-between border-b border-neutral-800 p-4">
            <div>
              <h3 className="text-base font-bold uppercase text-white tracking-wide">
                {lang === "id" ? "LOKASI PEMUTARAN" : "SCREENING LOCATIONS"}
              </h3>
              <span className="mt-1 inline-block rounded border border-neutral-800 bg-neutral-900 px-2.5 py-0.5 font-mono text-xs text-amber-400">
                {filteredLocations.length} {lang === "id" ? "Lokasi" : "Locations"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Tutup panel lokasi"
              className="rounded-full border border-neutral-800 p-1.5 text-neutral-400 hover:border-amber-500/50 hover:text-amber-400 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 border-b border-neutral-800 px-4 py-2.5">
          {([
          { key: "all", id: "SEMUA", en: "ALL" },
          { key: "upcoming", id: "MENDATANG", en: "UPCOMING" },
          { key: "finished", id: "SELESAI", en: "FINISHED" },
          ] as const).map((t) => (
          <button
          key={t.key}
          type="button"
          onClick={() => {
          setStatusFilter(t.key);
          setSelectedId(null);
          }}
          className={
          "rounded px-2.5 py-1 text-[11px] font-bold tracking-wider transition-all " +
          (statusFilter === t.key
          ? "bg-amber-500 text-neutral-950"
          : "border border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800")
          }
          >
          {lang === "id" ? t.id : t.en} ({counts[t.key]})
          </button>
          ))}
          </div>

          {/* Box List Lokasi (Kembali Bersih Tanpa Thumbnail) */}
          <div className="flex-1 space-y-2.5 overflow-y-auto p-4">
            {filteredLocations.length === 0 && (
              <p className="py-4 text-xs italic text-neutral-500">
                {statusFilter === "upcoming"
                ? lang === "id" ? "Belum ada jadwal screening mendatang di wilayah ini." : "No upcoming screenings in this region yet."
                : lang === "id" ? "Tidak ada lokasi untuk filter ini." : "No locations for this filter."}
              </p>
            )}

            {filteredLocations.map((loc) => {
              const isActive = loc.id === selectedId;
              return (
                <div
                  key={loc.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedId(loc.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setSelectedId(loc.id);
                  }}
                  className={
                    "group w-full cursor-pointer overflow-hidden rounded-lg border text-left shadow-sm transition-all p-3 " +
                    (isActive
                      ? "border-amber-500/80 bg-neutral-900"
                      : "border-neutral-800/80 bg-neutral-900/60 hover:border-amber-500/40 hover:bg-neutral-900")
                  }
                >
                  <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
                      <StatusBadge status={getStatus(loc, today)} lang={lang} />
                      <span className="text-[11px] text-neutral-400">
                      {lang === "id" ? loc.date_id : loc.date_en}
                      </span>
                  </div>
                      <span className="mb-1 inline-block rounded border border-neutral-800 bg-black px-2 py-0.5 text-[10px] font-mono text-amber-400">
                      {lang === "id" ? loc.category_id : loc.category_en}
                      </span>

                  <h4 className="text-sm font-bold uppercase text-white transition-colors group-hover:text-amber-400">
                    {lang === "id" ? loc.name_id : loc.name_en}
                  </h4>
                  <p className="mt-1 line-clamp-1 text-xs text-neutral-400">
                    {loc.address}
                  </p>

                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDetailModalLocation(loc);
                      }}
                      className="rounded border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 transition-all hover:bg-amber-500 hover:text-neutral-950"
                    >
                      {lang === "id" ? "DETAIL" : "DETAIL"} →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODAL POP-UP DETAIL LOKASI */}
      {detailModalLocation && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col text-neutral-300 text-sm">
            <div className="relative h-48 sm:h-56 w-full bg-neutral-950">
              <img
                src={
                  detailModalLocation.thumbnailUrl ||
                  "https://michaelschindhelm.com/wp-content/uploads/2024/05/ROOTS_Arma.jpg"
                }
                alt={lang === "id" ? detailModalLocation.name_id : detailModalLocation.name_en}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setDetailModalLocation(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-950/80 text-white flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all border border-neutral-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div className="space-y-2">
              <StatusBadge status={modalStatus} lang={lang} />
              <h3 className="text-xl font-bold text-white uppercase">
              {lang === "id" ? detailModalLocation.name_id : detailModalLocation.name_en}
              </h3>
              <p className="text-xs text-amber-400 font-mono">
              📍 {detailModalLocation.address} | 🕒{" "}
              {lang === "id" ? detailModalLocation.date_id : detailModalLocation.date_en}
              {detailModalLocation.time ? ` (${detailModalLocation.time})` : ""}
              </p>
            </div>

  {/* Undangan / deskripsi event */}
  <div className="space-y-1">
    <span className="text-[11px] font-bold uppercase text-neutral-500">
      {modalStatus === "finished"
        ? lang === "id" ? "Tentang Event" : "About the Event"
        : lang === "id" ? "Undangan" : "Invitation"}
    </span>
    <p className="leading-relaxed">
      {lang === "id" ? detailModalLocation.desc_id : detailModalLocation.desc_en}
    </p>
  </div>

  {/* Tombol daftar, hanya untuk event yang belum berlangsung */}
  {modalStatus !== "finished" && detailModalLocation.rsvpUrl && (
    <a
      href={detailModalLocation.rsvpUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-block rounded bg-amber-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-950 transition-colors hover:bg-amber-400"
    >
      {lang === "id" ? "Daftar / Hubungi Penyelenggara" : "Register / Contact Host"} ↗
    </a>
  )}

  {/* Ulasan event, hanya untuk event yang sudah selesai */}
  {modalStatus === "finished" && detailModalLocation.feedback_id && (
    <div className="space-y-1">
      <span className="text-[11px] font-bold uppercase text-neutral-500">
        {lang === "id" ? "Ulasan Event" : "Event Review"}
      </span>
      <div className="p-3 rounded bg-amber-500/5 border border-amber-500/20 italic text-xs text-amber-200">
        {lang === "id" ? detailModalLocation.feedback_id : detailModalLocation.feedback_en}
      </div>
    </div>
  )}

  {/* Galeri foto */}
  {!!detailModalLocation.gallery?.length && (
    <div className="space-y-1">
      <span className="text-[11px] font-bold uppercase text-neutral-500">
        {lang === "id" ? "Galeri" : "Gallery"}
      </span>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {detailModalLocation.gallery.map((src, i) => (
          <a key={i} href={src} target="_blank" rel="noreferrer" className="flex-none">
            <img src={src} alt="" className="h-24 w-36 rounded object-cover" />
          </a>
        ))}
      </div>
    </div>
  )}

  {/* Ulasan media */}
  {!!detailModalLocation.mediaLinks?.length && (
    <div className="space-y-2">
      <span className="text-[11px] font-bold uppercase text-neutral-500">
        {lang === "id" ? "Ulasan Media" : "Media Coverage"}
      </span>
      {detailModalLocation.mediaLinks.map((m, i) => {
        const note = lang === "id" ? m.note_id : m.note_en || m.note_id;
        return (
          <a
            key={i}
            href={m.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded border border-neutral-800 p-3 transition-colors hover:border-amber-500/50"
          >
            <span className="text-xs font-bold text-amber-400">{m.title} ↗</span>
            {note && <span className="mt-0.5 block text-xs text-neutral-400">{note}</span>}
          </a>
        );
      })}
    </div>
  )}
</div>

            <div className="p-4 bg-neutral-950 border-t border-neutral-800 text-right">
              <button
                onClick={() => setDetailModalLocation(null)}
                className="px-4 py-2 bg-neutral-800 text-white font-bold text-xs uppercase rounded"
              >
                {lang === "id" ? "Tutup" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Style marker & popup Leaflet, khusus dark mode sinematik */}
      <style jsx global>{`
        .roadshow-marker-dot {
          display: block;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background-color: #f59e0b;
          border: 2px solid #000000;
          box-shadow: 0 0 12px #f59e0b;
          cursor: pointer;
        }
          .roadshow-marker-dot.is-finished {
          background-color: #737373;
          box-shadow: none;
          }
          .roadshow-marker-dot.is-tba {
          background-color: transparent;
          border: 2px dashed #f59e0b;
          box-shadow: none;
          }
        .roadshow-popup .leaflet-popup-content-wrapper {
          background-color: #171717 !important;
          color: #ffffff !important;
          border: 1px solid #333333;
          border-radius: 8px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
        }
        .roadshow-popup .leaflet-popup-tip {
          background-color: #171717 !important;
          border: 1px solid #333333;
        }
        .roadshow-popup .leaflet-popup-content {
          margin: 0 !important;
        }
        .roadshow-popup a.leaflet-popup-close-button {
          color: #a3a3a3 !important;
          padding: 6px 8px 0 0 !important;
        }
        .roadshow-popup a.leaflet-popup-close-button:hover {
          color: #f59e0b !important;
        }
        .leaflet-container {
          background: #0a0a0a !important;
          font-family: inherit;
        }
      `}</style>
    </section>
  );
}

function buildPopupHtml(loc: RoadshowLocation, lang: "id" | "en", status: ScreeningStatus) {
  const name = lang === "id" ? loc.name_id : loc.name_en;
  const date = lang === "id" ? loc.date_id : loc.date_en;
  const imgUrl = loc.thumbnailUrl ?? "";
  const statusLabel = {
    upcoming: lang === "id" ? "Mendatang" : "Upcoming",
    finished: lang === "id" ? "Selesai" : "Finished",
    tba: "TBA",
  }[status];
  const statusColor = { upcoming: "#f59e0b", finished: "#737373", tba: "#a3a3a3" }[status];

  return `
    <div style="width:220px;">
      <div style="height:100px; width:100%; overflow:hidden; border-radius:6px 6px 0 0; background:#000;">
        <img src="${imgUrl}" alt="${escapeHtml(name)}" style="width:100%; height:100%; object-fit:cover;" />
      </div>
      <div style="padding:10px 12px 12px 12px;">
        <span style="font-size:9px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#a3a3a3;display:block;margin-bottom:2px;">
          <span style="color:${statusColor};">● ${statusLabel}</span> · ${escapeHtml(lang === "id" ? loc.category_id : loc.category_en)}
        </span>
        <h5 style="font-weight:700;font-size:13px;color:#ffffff;text-transform:uppercase;margin:0 0 4px 0;line-height:1.2;">
          ${escapeHtml(name)}
        </h5>
        <p style="font-size:11px;color:#a3a3a3;margin:0 0 8px 0;">
          ${escapeHtml(date)} (${escapeHtml(loc.time)})
        </p>
        <button
          onclick="window.dispatchEvent(new CustomEvent('open-location-detail', { detail: '${loc.id}' }))"
          style="display:flex; align-items:center; justify-content:center; width:28px; height:28px; background:#f59e0b; border:none; border-radius:4px; cursor:pointer; margin-left:auto;"
          >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ResetIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  );
}
function StatusBadge({ status, lang }: { status: ScreeningStatus; lang: "id" | "en" }) {
  const s = {
    upcoming: { id: "MENDATANG", en: "UPCOMING", cls: "border-amber-500 bg-amber-500 text-neutral-950" },
    finished: { id: "SELESAI", en: "FINISHED", cls: "border-neutral-700 bg-neutral-800 text-neutral-400" },
    tba: { id: "TBA", en: "TBA", cls: "border-dashed border-amber-500/60 text-amber-400" },
  }[status];
  return (
    <span className={"rounded border px-2 py-0.5 text-[10px] font-bold tracking-wider " + s.cls}>
      {s[lang]}
    </span>
  );
}