"use client";

// components/roadshow-map-client.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  FLY_TO_ZOOM,
  REGION_TABS,
  locationsData,
  type RegionKey,
  type RoadshowLocation,
} from "@/components/roadshow-data";

const TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}";
const TILE_ATTRIBUTION =
  'Tiles &copy; <a href="https://www.esri.com/" target="_blank" rel="noreferrer">Esri</a>';

export default function RoadshowMapClient() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const markersRef = useRef<Marker[]>([]);

  const [isMapReady, setIsMapReady] = useState(false);
  const [activeRegion, setActiveRegion] = useState<RegionKey>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const filteredLocations = useMemo(() => {
    if (activeRegion === "all") return locationsData;
    return locationsData.filter((loc) => loc.region === activeRegion);
  }, [activeRegion]);

  const selectedLocation = useMemo(
    () => locationsData.find((loc) => loc.id === selectedId) ?? null,
    [selectedId]
  );

  // --- 1) Inisialisasi peta ---
  useEffect(() => {
    let cancelled = false;
    let createdMap: LeafletMap | null = null;

    async function initMap() {
      if (!containerRef.current) return;

      // Reset residu dari mount sebelumnya (Fast Refresh / Strict Mode)
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

  // --- 2) Render ulang marker setiap kali filter region berubah ---
  useEffect(() => {
    const map = mapRef.current;
    const leaflet = leafletRef.current;
    if (!map || !leaflet || !isMapReady) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const goldIcon = leaflet.divIcon({
      className: "roadshow-marker",
      html: '<span class="roadshow-marker-dot"></span>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    filteredLocations.forEach((loc) => {
      const marker = leaflet
        .marker([loc.lat, loc.lng], { icon: goldIcon })
        .addTo(map)
        .bindPopup(buildPopupHtml(loc), {
          closeButton: true,
          className: "roadshow-popup",
        });

      marker.on("click", () => setSelectedId(loc.id));
      markersRef.current.push(marker);
    });
  }, [filteredLocations, isMapReady]);

  // --- 3) flyTo saat lokasi dipilih ---
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedLocation) return;
    map.flyTo([selectedLocation.lat, selectedLocation.lng], FLY_TO_ZOOM, {
      duration: 1.2,
    });

    const marker = markersRef.current.find((m) => {
      const pos = m.getLatLng();
      return pos.lat === selectedLocation.lat && pos.lng === selectedLocation.lng;
    });
    marker?.openPopup();
  }, [selectedLocation]);

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

  return (
    <section className="relative w-full bg-neutral-950 text-white py-8">
      {/* Header + Tab Filter Region */}
      <div className="mx-auto mb-6 flex w-full max-w-7xl flex-col gap-5 px-6 md:flex-row md:items-end md:justify-between lg:px-12">
        <div className="min-w-0">
          <span className="font-sans text-xs uppercase tracking-widest text-amber-500">
            PETA JELAJAH PEMUTARAN INTERAKTIF
          </span>
          <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl lg:text-4xl">
            PETA ROADSHOW TOUR DE JAVA &amp; BALI
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
      <div className="relative h-[650px] w-full overflow-hidden border-y border-neutral-800 bg-neutral-900">
        <div ref={containerRef} className="z-0 h-full w-full" />

        {!isMapReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900 text-sm font-mono text-neutral-500">
            MEMUAT PETA...
          </div>
        )}

        {/* Tombol Reset View */}
        <button
          type="button"
          onClick={handleResetView}
          className="absolute left-20 top-4 z-[1000] flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950/90 px-3.5 py-2 text-xs font-semibold tracking-wider text-amber-400 shadow-xl backdrop-blur-md transition-colors hover:bg-neutral-900"
        >
          <ResetIcon />
          RESET VIEW
        </button>

        {/* Tombol buka drawer saat disembunyikan */}
        {!isDrawerOpen && (
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="absolute right-4 top-4 z-[1000] rounded-lg border border-neutral-800 bg-neutral-950/90 px-3.5 py-2 text-xs font-semibold tracking-wider text-amber-400 shadow-xl backdrop-blur-md hover:bg-neutral-900"
          >
            LOKASI ▸
          </button>
        )}

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
                LOKASI PEMUTARAN
              </h3>
              <span className="mt-1 inline-block rounded border border-neutral-800 bg-neutral-900 px-2.5 py-0.5 font-mono text-xs text-amber-400">
                {filteredLocations.length} Lokasi
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

          <div className="flex-1 space-y-2.5 overflow-y-auto p-4">
            {filteredLocations.length === 0 && (
              <p className="py-4 text-xs italic text-neutral-500">
                Tidak ada lokasi untuk wilayah ini.
              </p>
            )}

            {filteredLocations.map((loc) => {
              const isActive = loc.id === selectedId;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedId(loc.id)}
                  className={
                    "group w-full rounded-lg border p-3 text-left shadow-sm transition-all " +
                    (isActive
                      ? "border-amber-500/80 bg-neutral-900"
                      : "border-neutral-800/80 bg-neutral-900/60 hover:border-amber-500/40 hover:bg-neutral-900")
                  }
                >
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="rounded border border-neutral-800 bg-black px-2 py-0.5 text-[10px] font-mono text-amber-400">
                      {loc.category_id}
                    </span>
                    <span className="text-[11px] text-neutral-400">{loc.date_id}</span>
                  </div>
                  <h4 className="text-sm font-bold uppercase text-white group-hover:text-amber-400 transition-colors">
                    {loc.name_id}
                  </h4>
                  <p className="mt-1 line-clamp-1 text-xs text-neutral-400">
                    {loc.address}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

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
          margin: 12px 14px !important;
          line-height: 1.4;
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

function buildPopupHtml(loc: RoadshowLocation) {
  return `
    <div style="min-width:190px;">
      <span style="font-size:10px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#f59e0b;display:block;margin-bottom:2px;">
        ${escapeHtml(loc.category_id)}
      </span>
      <h5 style="font-weight:700;font-size:14px;color:#ffffff;text-transform:uppercase;margin:0 0 4px 0;line-height:1.2;">
        ${escapeHtml(loc.name_id)}
      </h5>
      <p style="font-size:11px;color:#a3a3a3;margin:0;">
        ${escapeHtml(loc.date_id)} (${escapeHtml(loc.time)})
      </p>
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
