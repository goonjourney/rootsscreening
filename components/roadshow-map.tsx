"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";

const RoadshowMapClient = dynamic(() => import("./roadshow-map-client"), {
  ssr: false,
  loading: () => <RoadshowMapLoading />,
});

function RoadshowMapLoading() {
  const { lang } = useLanguage();

  return (
    <div className="flex h-[620px] w-full items-center justify-center border-y border-neutral-800 bg-neutral-900 text-sm text-neutral-500 font-mono">
      {lang === "id" ? "Memuat peta roadshow..." : "Loading roadshow map..."}
    </div>
  );
}

export default function RoadshowMap() {
  return <RoadshowMapClient />;
}