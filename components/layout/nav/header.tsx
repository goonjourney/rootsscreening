"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLayout } from "../layout-context";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const { globalSettings, theme } = useLayout();
  const { lang, toggleLang } = useLanguage();
  const header = globalSettings!.header!;

  const [menuState, setMenuState] = React.useState(false)
  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="absolute left-0 top-0 z-20 w-full text-neutral-300">
        <div className="mx-auto max-w-7xl px-6 transition-all duration-300 lg:px-12">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2">
                <Image
                  src="/image/ROOTSicon.png"
                  alt="ROOTS"
                  width={96}
                  height={96}
                  className="-ml-3 h-24 w-24 object-contain"
                />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex items-center gap-8 text-sm">
                  {header.nav!.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        className="block text-neutral-300 duration-150 hover:text-white">
                        <span>{item!.label}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={toggleLang}
                      aria-label={`Ganti bahasa ke ${lang === "id" ? "Inggris" : "Indonesia"}`}
                      className="rounded border border-neutral-700 px-2.5 py-1 text-xs font-bold text-amber-400 transition-colors hover:border-amber-400 hover:text-amber-300"
                    >
                      {lang.toUpperCase()}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-transparent in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-neutral-800 p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {header.nav!.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        className="block text-neutral-300 duration-150 hover:text-white">
                        <span>{item!.label}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={toggleLang}
                      aria-label={`Ganti bahasa ke ${lang === "id" ? "Inggris" : "Indonesia"}`}
                      className="rounded border border-neutral-700 px-2.5 py-1 text-xs font-bold text-amber-400 transition-colors hover:border-amber-400 hover:text-amber-300"
                    >
                      {lang.toUpperCase()}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
