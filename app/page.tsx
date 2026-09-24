import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import HomeClient from "./home-client";
import RoadshowMap from "@/components/roadshow-map";
import FilmCuratorial from "@/components/film-curatorial";
import ExhibitionsMedia from "@/components/exhibitions-media";
import { fromTina } from "@/components/roadshow-adapter";

export const revalidate = 300;

export default async function Home() {
  const result = await client.queries.page({ relativePath: "home.mdx" });


  const screenings = await client.queries.screeningConnection({ first: 200 });
  const locations = (screenings.data.screeningConnection.edges ?? [])
        .map((e) => e?.node)
        .filter(Boolean)
        .map(fromTina)
        .filter((l) => typeof l.lat === "number" && typeof l.lng === "number");
         return (
    <Layout>
      <HomeClient
        query={result.query}
        variables={result.variables}
        data={result.data}
      >
        <RoadshowMap locations={locations} />
        <FilmCuratorial />
        <ExhibitionsMedia />
      </HomeClient>
    </Layout>
  );
}