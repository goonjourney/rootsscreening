import React from "react";
import { Metadata } from "next";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";
import { LanguageProvider } from "@/context/LanguageContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

export const metadata: Metadata = {
  title: "ROOTS - One Hundred Years of Walter Spies in Bali",
  description: "Tina Cloud Starter",
  icons: {
    icon: "/image/ROOTS-topeng-convert.png",
    shortcut: "/image/ROOTS-topeng-convert.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(fontSans.variable, nunito.variable, lato.variable)}>
      <body className="min-h-screen bg-neutral-950 font-sans antialiased">
        <LanguageProvider>
          <VideoDialogProvider>
            {children}
            <VideoDialog />
          </VideoDialogProvider>
        </LanguageProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
