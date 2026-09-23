"use client";

import dynamic from "next/dynamic";

const RoadshowMapClient = dynamic(() => import("./roadshow-map-client"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[620px] w-full items-center justify-center border-y border-neutral-800 bg-neutral-900 text-sm text-neutral-500 font-mono">
      Memuat peta roadshow...
    </div>
  ),
});

export default function RoadshowMap() {
  return <RoadshowMapClient />;
}