import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import HomeClient from "./home-client";
import RoadshowMap from "@/components/roadshow-map";
import FilmCuratorial from "@/components/film-curatorial";
import ExhibitionsMedia from "@/components/exhibitions-media";

export const revalidate = 300;

export default async function Home() {
  const result = await client.queries.page({ relativePath: "home.mdx" });

  return (
    <Layout>
      <HomeClient
        query={result.query}
        variables={result.variables}
        data={result.data}
      >
        <RoadshowMap />
        <FilmCuratorial />
        <ExhibitionsMedia />
      </HomeClient>
    </Layout>
  );
}