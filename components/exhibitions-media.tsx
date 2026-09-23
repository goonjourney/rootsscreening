"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface PressArticle {
  id: string;
  source: string;
  date: string;
  title: string;
  venue: string;
  summary: string;
  content: string;
}

const PRESS_ARTICLES: PressArticle[] = [
  {
    id: "lentera",
    source: "LENTERAESAI",
    date: "4 Mei 2026",
    title: '"ROOTS Tayang di Jakarta, Angkat Jejak dan Pengaruh Walter Spies di Bali"',
    venue: "Gruham Bistro, Jakarta",
    summary:
      "Ulasan mengenai pemutaran edisi spesial di Gruham Coffee & Bistro Jakarta. Menyoroti lokakarya cat air Agus Budiyanto dan paparan kuratorial Yudha Bantono tentang estetika lanskap Bali Spies.",
    content:
      "Jakarta (LenteraEsai) – Pemutaran film dokumenter fiksi ROOTS karya Michael Schindhelm di Gruham Coffee & Bistro Jakarta berlangsung hangat. Acara dipadukan dengan lokakarya merespons estetika Spies lewat media cat air oleh perupa Agus Budiyanto, serta diskusi bersama kurator Yudha Bantono...",
  },
  {
    id: "nowbali",
    source: "NOW! BALI CULTURAL",
    date: "21 Mei 2026",
    title: '"Spectral Presence: Walter Spies Revisited in Ubud\'s Sokasi Cafe"',
    venue: "Sokasi Cafe, Ubud",
    summary:
      "Liputan diskusi kritis bersama perupa Made Bayak dan Gus Dark di Gianyar Bali. Membahas benturan antara pariwisata massal dan pelestarian kesakralan seni Bali.",
    content:
      "Ubud (NOW! Bali) – The genesis screening of ROOTS brought together Balinese artivists Made Bayak and editorial cartoonist Gus Dark. The discussion probed deep into ecological crisis, subak degradation, and how modern Bali negotiates foreign artistic legacies...",
  },
  {
    id: "isijogja",
    source: "BUKU SENI RUPA",
    date: "9 Mei 2026",
    title: '"Diskusi ROOTS di ISI Yogyakarta: Dialektika Estetika Barat dan Subak Bali"',
    venue: "ISI Yogyakarta",
    summary:
      "Laporan penayangan di FSRD ISI Yogyakarta yang dibuka oleh Dekan Muhamad Sholahuddin. Menyoroti respon antusias mahasiswa seni terhadap metode dokumenter fiksi Schindhelm.",
    content:
      "Yogyakarta – Bertempat di Sasana Ajiyasa FSRD ISI Yogyakarta, ratusan mahasiswa seni rupa mengikuti penayangan film ROOTS. Sesi dibuka langsung oleh Dekan FSRD Muhamad Sholahuddin, S.Sn., M.T...",
  },
];

export default function ExhibitionsMedia() {
  const { lang } = useLanguage();
  const [selectedPress, setSelectedPress] = useState<PressArticle | null>(null);

  return (
    <section id="exhibitions" className="w-full bg-neutral-950 text-white py-20 border-t border-neutral-900">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-20 space-y-24">
        
        {/* --- 1. GLOBAL EXHIBITION SERIES --- */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-display text-xs tracking-widest text-amber-500 uppercase font-bold">
                {lang === "id" ? "RANGKAIAN PAMERAN GLOBAL" : "GLOBAL EXHIBITION SERIES"}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-wider text-white mt-1">
                {lang === "id" ? "PAMERAN UTAMA: BASEL & UBUD" : "THE EXHIBITIONS: BASEL & UBUD"}
              </h2>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md">
              {lang === "id"
                ? "Menghubungkan Eropa dan Bali melalui eksibisi museum institusional, rekonstruksi spasial Villa Iseh, serta keterlibatan artivis lokal."
                : "Bridging Europe and Bali through institutional museum exhibitions, spatial reconstructions of Villa Iseh, and local artivist engagements."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basel Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 space-y-6 flex flex-col justify-between hover:border-amber-500/50 transition-colors group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-display px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded uppercase tracking-wider font-bold">
                    WORLD PREMIERE
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">30 Aug – 17 Nov 2024</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors uppercase">
                  Kulturstiftung Basel H. Geiger (KBH.G)
                </h3>
                <p className="text-xs text-neutral-400">📍 Spitalstrasse 18, 4056 Basel, Switzerland</p>

                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Peluncuran perdana proyek ROOTS di Eropa. Menghadirkan rekonstruksi spasial Villa Iseh (sanctuarium Spies tahun 1937), mendekonstruksi eksotisme kolonial Barat, serta memutar film docu-fiction yang menampilkan sosok hantu Spies mengamati Bali modern.
                </p>

                <div className="space-y-2 pt-2 border-t border-neutral-800">
                  <span className="text-xs text-amber-400 font-display font-bold uppercase tracking-wider block">
                    ★ Sorotan Utama Pameran
                  </span>
                  <ul className="text-xs text-neutral-400 space-y-1 list-disc list-inside">
                    <li>Instalasi spasial &amp; replika rekonstruksi Villa Iseh</li>
                    <li>Kritik persepsi Barat &amp; asal-usul pariwisata massal</li>
                    <li>Penyajian arsip Eropa &amp; pemutaran film hantu spasial</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-neutral-500">Basel, Switzerland</span>
                <a href="https://www.kbhg.ch" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline font-display font-bold tracking-wider">
                  KBH.G BASEL ↗
                </a>
              </div>
            </div>

            {/* ARMA Ubud Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 space-y-6 flex flex-col justify-between hover:border-amber-500/50 transition-colors group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-display px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded uppercase tracking-wider font-bold">
                    HOMECOMING EXHIBITION
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">24 May – 14 June 2025</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors uppercase">
                  ARMA Museum (Agung Rai Museum of Art)
                </h3>
                <p className="text-xs text-neutral-400">📍 Jl. Raya Pengosekan, Ubud, Gianyar, Bali</p>

                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Membawa narasi pameran kembali ke jantung kebudayaan Bali di Ubud. Memajang karya kolaboratif perupa Bali (Made Bayak, Gus Dark, Prof. Wayan Dibia, Dewa Ayu Eka Putri, Putu Tangkas Adi), berfokus pada ekologi subak, alih fungsi lahan, serta kompetisi resensi budaya generasi muda.
                </p>

                <div className="space-y-2 pt-2 border-t border-neutral-800">
                  <span className="text-xs text-amber-400 font-display font-bold uppercase tracking-wider block">
                    ★ Sorotan Utama Pameran
                  </span>
                  <ul className="text-xs text-neutral-400 space-y-1 list-disc list-inside">
                    <li>Instalasi seni Plasticology &amp; kartun satir politik</li>
                    <li>Pertunjukan oleh Dewa Ayu Eka Putri &amp; Putu Tangkas Adi</li>
                    <li>Upacara Penghargaan Resensi Budaya Pelajar &amp; Mahasiswa</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-neutral-500">Ubud, Gianyar, Bali</span>
                <a href="https://armabali.com" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline font-display font-bold tracking-wider">
                  ARMA MUSEUM ↗
                </a>
              </div>
            </div>
          </div>

          {/* Banner Villa Iseh */}
          <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-black border border-amber-500/30 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[10px] font-display px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded uppercase tracking-wider font-bold">
                SANCTUARIUM SEJARAH
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase">VILLA ISEH, KARANGASEM (1937)</h3>
              <p className="text-neutral-300 text-xs leading-relaxed">
                Didirikan oleh Walter Spies pada 1937 sebagai peristirahatan sunyi di tengah terasering Karangasem. Villa Iseh menjadi tempat terkemuka yang kelak disinggahi pesohor dunia seperti David Bowie, Yoko Ono, dan Mick Jagger, melambangkan titik temu antara ketenangan Bali dan ikon budaya dunia.
              </p>
            </div>
            <div className="flex-shrink-0 text-center md:text-right border-l-2 border-amber-500 pl-6 py-2">
              <span className="text-[10px] font-display text-amber-400 uppercase tracking-widest block mb-1">
                TOKOH DUNIA DI VILLA ISEH
              </span>
              <p className="font-display text-base text-white font-bold">DAVID BOWIE • YOKO ONO</p>
              <p className="font-display text-base text-amber-500 font-bold">MICK JAGGER • CHARLIE CHAPLIN</p>
            </div>
          </div>
        </div>

        {/* --- 2. MEDIA COVERAGE / PRESS CLIPPINGS --- */}
        <div id="press" className="space-y-12 pt-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-display text-xs tracking-widest text-amber-500 uppercase font-bold">
                VALIDASI MEDIA &amp; ULASAN PERS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-wider text-white mt-1">
                KLIPING PERS &amp; LIPUTAN MEDIA
              </h2>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md">
              Arsip publikasi berita, liputan pers, dan ulasan lepas mengenai tur penayangan film ROOTS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRESS_ARTICLES.map((article) => (
              <div
                key={article.id}
                className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-amber-500/40 transition-colors flex flex-col justify-between"
              >
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-display px-2 py-0.5 bg-neutral-800 text-amber-400 rounded text-[10px] font-bold">
                      {article.source}
                    </span>
                    <span className="font-mono text-[11px]">{article.date}</span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-white leading-snug uppercase">
                    {article.title}
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
                <div className="p-6 pt-0 border-t border-neutral-800/50 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 truncate max-w-[150px]">📍 {article.venue}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedPress(article)}
                    className="text-amber-400 hover:underline font-display font-bold tracking-wider"
                  >
                    BACA KLIP →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- MODAL POPUP KLIPING PERS --- */}
      {selectedPress && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-2xl w-full p-6 sm:p-8 relative space-y-4 shadow-2xl">
            <button
              onClick={() => setSelectedPress(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
            >
              ✕
            </button>
            <span className="text-[10px] font-display px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded font-bold uppercase">
              {selectedPress.source} • {selectedPress.date}
            </span>
            <h3 className="font-display text-2xl font-bold text-white uppercase">{selectedPress.title}</h3>
            <p className="text-amber-400 text-xs font-mono">📍 {selectedPress.venue}</p>
            <div className="text-neutral-300 text-xs sm:text-sm leading-relaxed pt-2 border-t border-neutral-800">
              {selectedPress.content}
            </div>
            <div className="pt-4 text-right">
              <button
                type="button"
                onClick={() => setSelectedPress(null)}
                className="px-4 py-2 bg-amber-500 text-neutral-950 font-bold text-xs uppercase rounded font-display"
              >
                TUTUP
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}