// components/RoadshowMap.tsx
//
// Entry point yang dipakai di halaman Next.js Anda, misalnya:
//   import RoadshowMap from "@/components/RoadshowMap";
//   export default function Page() {
//     return <RoadshowMap />;
//   }
//
// Leaflet menyentuh `window` saat di-load, jadi komponen aslinya
// (RoadshowMapClient) WAJIB di-render hanya di client. next/dynamic dengan
// { ssr: false } memastikan Next.js tidak mencoba merender komponen ini
// selama SSR/SSG sama sekali — ini mencegah error "window is not defined"
// sekaligus mencegah race condition mount ganda saat hydration.

"use client";

import dynamic from "next/dynamic";

const RoadshowMapClient = dynamic(() => import("./roadshow-map-client"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[620px] w-full items-center justify-center border-y border-neutral-800 bg-neutral-900 text-sm text-neutral-500">
      Memuat peta roadshow...
    </div>
  ),
});

export default function RoadshowMap() {
  return <RoadshowMapClient />;
}
