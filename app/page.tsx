import React from "react";
import Layout from "@/components/layout/layout"; // atau { Layout }
import Hero from "@/components/hero";
import RoadshowMap from "@/components/roadshow-map";
import FilmCuratorial from "@/components/film-curatorial";
import ExhibitionsMedia from "@/components/exhibitions-media";

export const revalidate = 300;

export default async function Home() {
  return (
    <Layout>
      <div className="bg-neutral-950">
        <Hero
          data={{
            title: "One Hundred Years Walter Spies in Bali",
            synopsis:
              "Situs resmi tur pemutaran film docu-fiction karya Michael Schindhelm di Indonesia & Australia. Menelusuri 100 tahun jejak estetika Walter Spies, eksploitasi pariwisata massal, krisis ekologi subak, dan dialog kritis kebudayaan Bali.",
          }}
        />
      </div>

      {/* Section 2: Peta Interaktif */}
      <RoadshowMap />

      {/* Section 3: The Film & Kuratorial */}
      <FilmCuratorial />

      {/* Section 4: Exhibitions & Media */}
      <ExhibitionsMedia />
           
    </Layout>
  );
}