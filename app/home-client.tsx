"use client";

import React from "react";
import { useTina } from "tinacms/dist/react";
import Hero from "@/components/hero";

type Props = {
  query: string;
  variables: object;
  data: any;
  children?: React.ReactNode;
};

export default function HomeClient({ children, ...tinaProps }: Props) {
  const { data } = useTina(tinaProps);
  const hero = data.page.blocks?.find(
    (b: any) => b?.__typename === "PageBlocksHero"
  );

  return (
    <>
      <div className="bg-neutral-950">{hero && <Hero data={hero} />}</div>
      {children}
    </>
  );
}