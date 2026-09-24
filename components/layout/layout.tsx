import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import { globalSettings } from "./global-settings";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";
import BackToTop from "../back-to-top";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default function Layout({ children, rawPageData }: LayoutProps) {
  return (
    <LayoutProvider globalSettings={globalSettings} pageData={rawPageData}>
      <Header />
      <main className="overflow-x-hidden pt-0">{children}</main>
      <Footer />
      <BackToTop />
    </LayoutProvider>
  );
}