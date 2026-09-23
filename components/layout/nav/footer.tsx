"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { useLanguage } from "@/context/LanguageContext";

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings || {};
  const { lang } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    session: "",
    agreed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      lang === "id"
        ? "Terima kasih! Permintaan pemutaran/reservasi Anda telah dicatat. Kami akan menghubungi Anda segera."
        : "Thank you! Your screening/reservation request has been recorded. We will contact you soon."
    );
    setIsModalOpen(false);
    setFormData({ name: "", contact: "", session: "", agreed: false });
  };

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-300 py-16 relative z-10 font-sans">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-20 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Custom Logo Image */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <img
                src="/image/ROOTSicon.png"
                alt="ROOTS Icon"
                className="h-8 w-auto object-contain"
              />
            
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {lang === "id"
                ? "Tur Pemutaran Nasional & Eksibisi Kebudayaan. Seratus Tahun Walter Spies di Bali (1923 – 2023)."
                : "National Screening & Cultural Exhibition Tour. One Hundred Years of Walter Spies in Bali (1923 – 2023)."}
            </p>
          </div>

          {/* Networks & Partners */}
          <div className="space-y-2 text-xs">
            <h5 className="font-display text-sm font-bold text-white tracking-wider uppercase">
              {lang === "id" ? "JARINGAN & MITRA" : "NETWORKS & PARTNERS"}
            </h5>
            <p className="text-neutral-400">Rhizomata Art &amp; Culture Network</p>
            <p className="text-neutral-400">Walter Spies Society Bali</p>
            <p className="text-neutral-400">KBH.G Basel</p>
            <p className="text-neutral-400">Bali Art Focus</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-xs font-display tracking-wider">
            <h5 className="text-sm font-bold text-white uppercase">
              {lang === "id" ? "TAUTAN CEPAT" : "QUICK LINKS"}
            </h5>
            <p><a href="#overview" className="text-neutral-400 hover:text-amber-400 transition-colors">Overview</a></p>
            <p><a href="#film" className="text-neutral-400 hover:text-amber-400 transition-colors">The Film &amp; Director</a></p>
            <p><a href="#exhibitions" className="text-neutral-400 hover:text-amber-400 transition-colors">Exhibitions</a></p>
            <p><a href="#roadshow" className="text-neutral-400 hover:text-amber-400 transition-colors">Roadshow Map</a></p>
            <p><a href="#press" className="text-neutral-400 hover:text-amber-400 transition-colors">Press Clippings</a></p>
          </div>

          {/* Inquiries & Hosting */}
          <div className="space-y-3 text-xs">
            <h5 className="font-display text-sm font-bold text-white tracking-wider uppercase">
              {lang === "id" ? "PERTANYAAN & PEMUTARAN" : "INQUIRIES & HOSTING"}
            </h5>
            <p className="text-neutral-400">
              {lang === "id"
                ? "Ingin mengadakan pemutaran film di ruang komunitas Anda?"
                : "Want to organize a screening session in your venue?"}
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="font-display px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-wider rounded uppercase transition-all shadow-md"
            >
              {lang === "id" ? "AJUKAN PEMUTARAN" : "REQUEST SCREENING"}
            </button>
          </div>
        </div>

        {/* Bottom Bar + Social Icons from TinaCMS */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} ROOTS Screening Project. All Rights Reserved. Film by Michael Schindhelm.</p>

          <div className="flex items-center gap-4 text-sm">
            {footer?.social?.map((link, index) => (
              <Link
                key={`${link?.icon}${index}`}
                href={link?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-amber-400 transition-colors"
              >
                <Icon data={{ ...link!.icon, size: "small" }} className="block" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* --- MODAL RESERVASI & PENGAJUAN --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 text-white">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-lg w-full p-6 sm:p-8 relative space-y-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <div>
              <span className="text-xs font-display tracking-widest text-amber-500 uppercase font-bold">
                {lang === "id" ? "RESERVASI & PENGAJUAN" : "TICKET & HOSTING RESERVATION"}
              </span>
              <h3 className="font-display text-2xl font-bold text-white uppercase mt-1">
                {lang === "id" ? "AJUKAN PEMUTARAN / RESERVASI" : "RESERVE YOUR SEAT / HOST"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-display text-neutral-300 uppercase mb-1">
                  {lang === "id" ? "NAMA LENGKAP" : "FULL NAME"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={lang === "id" ? "Masukkan nama Anda" : "Enter your full name"}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-display text-neutral-300 uppercase mb-1">
                  EMAIL / WHATSAPP
                </label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="email@domain.com / 0812..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="bg-neutral-950 p-4 border border-neutral-800 rounded text-xs space-y-2">
                <div className="font-display text-amber-400 uppercase tracking-wider font-bold">
                  🛡️ Content &amp; Educational Disclaimer
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Film ini adalah dokumenter fiksi sejarah (*docu-fiction*) yang membedah jejak seni rupa, eksploitasi ekologi pariwisata, dan konteks hukum era kolonial 1930-an. Penayangan ini murni bertujuan untuk apresiasi seni dan edukasi kebudayaan.
                </p>
                <label className="flex items-start gap-2 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreed}
                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                    className="mt-0.5 text-amber-500 rounded bg-neutral-900 border-neutral-700"
                  />
                  <span className="text-neutral-300 text-[11px] font-medium">
                    Saya memahami dan menyetujui prinsip diskusi kebudayaan ini.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-display font-bold text-sm tracking-wider uppercase rounded transition-colors shadow-lg"
              >
                KIRIM PERMINTAAN
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};