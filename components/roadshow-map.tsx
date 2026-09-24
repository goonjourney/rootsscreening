// components/roadshow-map.tsx
//
// Entry point yang dipakai di halaman Next.js. Leaflet menyentuh `window`,
// jadi komponen aslinya (RoadshowMapClient) hanya boleh dirender di client.
// next/dynamic dengan { ssr: false } mencegah error "window is not defined".

"use client";

import dynamic from "next/dynamic";
import type { RoadshowLocation } from "./roadshow-data";

const RoadshowMapClient = dynamic(() => import("./roadshow-map-client"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[620px] w-full items-center justify-center border-y border-neutral-800 bg-neutral-900 text-sm text-neutral-500">
      Memuat peta roadshow...
    </div>
  ),
});

export default function RoadshowMap({ locations }: { locations: RoadshowLocation[] }) {
  return <RoadshowMapClient locations={locations} />;
}