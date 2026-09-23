"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function FilmCuratorial() {
  const { lang } = useLanguage();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isNarativeOpen, setIsNarativeOpen] = useState(false);

  return (
    <section
      id="film"
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed flex items-center py-20 px-6 sm:px-12 lg:px-20 border-t border-neutral-800 overflow-hidden"
      style={{
        backgroundImage: "url('image/bg-film.jpg')",
      }}
    >
      {/* Dark Overlay sinematik */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px]" />

      <div className="relative z-10 mx-auto max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Container Kiri: Image Spies Transparan (Posisi Presisi Pas di Atas Foto Latar) */}
        <div className="col-span-1 md:col-span-5 lg:col-span-6 flex items-center justify-start md:ml-[-10px] lg:ml-[20px] xl:ml-[40px] my-8 md:my-0">
          <div className="relative animate-float max-w-[250px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[360px]">
            <img
              src="/image/spies-inframe.png"
              alt="Walter Spies In-Frame"
              className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] filter contrast-105 transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Container Kanan: Konten Teks & Tombol */}
        <div className="col-span-1 md:col-span-7 lg:col-span-6 space-y-6 text-white">
          <span className="inline-block font-display text-xs uppercase tracking-widest text-amber-500 font-bold">
            {lang === "id" ? "TENTANG FILM ROOTS" : "THE FILM PROJECT"}
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-wide text-white leading-tight">
            ROOTS: <br />
            <span className="text-amber-400">
              {lang === "id"
                ? "SERATUS TAHUN WALTER SPIES DI BALI"
                : "ONE HUNDRED YEARS OF WALTER SPIES IN BALI"}
            </span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            {lang === "id"
              ? "Disutradarai oleh Michael Schindhelm, film docu-fiction ROOTS menghadirkan sosok seniman kelahiran Rusia-Jerman, Walter Spies (1895–1942), sebagai sosok hantu spasial (spectral presence) yang mengitari lanskap Bali modern. Menandai 100 tahun kedatangannya pada 1923, film ini membedah jejak estetika Barat, eksploitasi pariwisata massal, krisis ekologi subak, serta dialog kritis bersama para perupa Bali hari ini."
              : "Directed by Michael Schindhelm, the docu-fiction film ROOTS presents the Russian-born German artist Walter Spies (1895–1942) as a spectral presence orbiting the modern Balinese landscape. Marking 100 years of his arrival in 1923, the film dissects Western aesthetic traces, mass tourism exploitation, subak ecological crisis, and critical dialogues with today's Balinese artists."}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            {/* Tombol Watch Trailer */}
            <button
              type="button"
              onClick={() => setIsTrailerOpen(true)}
              className="font-display inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-all shadow-lg hover:shadow-amber-500/20"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>{lang === "id" ? "TONTON TRAILER" : "WATCH TRAILER"}</span>
            </button>

            {/* Tombol Read Full Narrative */}
            <button
              type="button"
              onClick={() => setIsNarativeOpen(true)}
              className="font-display inline-flex items-center justify-center px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider rounded border border-neutral-700 transition-all shadow-lg"
            >
              <span>
                {lang === "id"
                  ? "BACA LENGKAP TENTANG FILM & KURATORIAL"
                  : "READ FULL NARRATIVE & CURATORIAL VISION"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL POPUP: TRAILER YOUTUBE VIDEO */}
      {isTrailerOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsTrailerOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-neutral-950/80 text-white flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all border border-neutral-700"
            >
              ✕
            </button>
            <div className="relative w-full aspect-video">
              <iframe
                src="https://www.youtube.com/embed/0xWLWNMjgOk?autoplay=1"
                title="ROOTS: One Hundred Years Walter Spies in Bali - Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL POPUP: FULL NARRATIVE */}
      {isNarativeOpen && (
        <div className="fixed inset-0 z-[3000] bg-black/95 backdrop-blur-xl overflow-y-auto p-4 sm:p-6 lg:p-12">
          <div className="max-w-5xl mx-auto text-neutral-200 relative my-8 bg-neutral-950 p-6 sm:p-10 border border-neutral-800 rounded-2xl shadow-2xl">
            {/* Tombol Tutup */}
            <button
              onClick={() => setIsNarativeOpen(false)}
              className="fixed top-6 right-6 z-50 p-3 bg-neutral-900 hover:bg-amber-500 hover:text-black rounded-full text-white transition-colors border border-neutral-700 shadow-xl"
            >
              ✕
            </button>

            {/* Header Modal */}
            <div className="border-b border-neutral-800 pb-8 mb-8 space-y-2">
              <span className="text-xs font-display tracking-widest text-amber-500 uppercase">
                {lang === "id"
                  ? "TINJAUAN LENGKAP FILM & ANALISIS KURATORIAL"
                  : "COMPREHENSIVE FILM OVERVIEW & ANALYSIS"}
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-wider uppercase">
                {lang === "id" ? "ROOTS: FILM & VISI KURATORIAL" : "ROOTS: THE FILM & CURATORIAL VISION"}
              </h1>
            </div>

            {/* Konten Narasi Sejarah */}
            <div className="space-y-8 text-neutral-300 leading-relaxed font-light text-sm sm:text-base border-b border-neutral-800 pb-10">
              <div className="space-y-4">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-amber-400 uppercase tracking-wide">
                  {lang === "id" ? "1. Konteks Sejarah & Memori Kolektif" : "1. Historical Context & Collective Memory"}
                </h3>
                <p>
                  Pada tahun 1923, perupa kelahiran Rusia berdarah Jerman Walter
                  Spies (1895–1942) memulai perjalanannya dari Eropa menuju daerah
                  tropis untuk mencari dunia baru dan inspirasi artistik. Warisan
                  Spies teranyam erat dengan narasi Bali modern, di mana publik
                  Bali menganggapnya sebagai pelopor modernisme seni rupa Pulau
                  Dewata. Meskipun bersahabat dengan tokoh dunia seperti Friedrich
                  Murnau, Charlie Chaplin, Oskar Kokoschka, dan Otto Dix,
                  reputasinya di Eropa sempat memudar sementara namanya tetap
                  monumental di Bali.
                </p>
                <p className="italic bg-neutral-900 p-4 border-l-2 border-amber-500 text-neutral-200">
                  Sebagaimana ditegaskan Michael Schindhelm: &quot;Pameran ROOTS
                  dan film docu-fiction dengan nama yang sama harus dipahami
                  sebagai proyek memori kolektif yang mengkaji bagian penting
                  dari sejarah pascakolonial Bali: pengaruh kebudayaan modern
                  Barat terhadap tradisi Bali. Sejarah pasang-surut Walter Spies
                  di pulau ini dan dampaknya terhadap transformasi Bali menjadi
                  destinasi pariwisata global dipandang sebagai sebuah warisan
                  bersama (shared heritage).&quot;
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-amber-400 uppercase tracking-wide">
                  {lang === "id" ? "2. Sosok Hantu Spies & Sanctuarium Villa Iseh" : "2. Spies as a Spectral Presence & Villa Iseh Sanctuary"}
                </h3>
                <p>
                  Berpusat pada Villa Iseh yang dibangun Spies di Karangasem pada
                  1937. Berawal sebagai peristirahatan sunyi, Villa Iseh menjadi
                  destinasi pesohor dunia seperti David Bowie, Yoko Ono, Mick
                  Jagger, dan Charlie Chaplin. Dalam film Schindhelm, Spies
                  hadir kembali sebagai sosok hantu spasial (spectral presence)
                  yang mengitari Bali modern. Melalui perjumpaan dengan para
                  perupa dan maestro Bali, roh Spies menghadapi konsekuensi
                  eksotisisme Barat, ekspansi pariwisata massal, krisis ekologi
                  subak, dan dinamika identitas Bali hari ini.
                </p>
              </div>
            </div>

            {/* Bagian Visionaris Kurator */}
            <div className="mt-10 space-y-8 border-b border-neutral-800 pb-10">
              <div>
                <span className="text-xs font-display tracking-widest text-amber-500 uppercase">
                  {lang === "id" ? "KEPEMIMPINAN KURATORIAL & SINEMATIK" : "CURATORIAL & CINEMATIC LEADERSHIP"}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase mt-1">
                  {lang === "id" ? "VISIONARIS DI BALIK ROOTS" : "THE VISIONARIES BEHIND ROOTS"}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {/* Card: Michael Schindhelm */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 sm:p-8 flex flex-col justify-between hover:border-amber-500/50 transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-display px-2.5 py-1 bg-neutral-800 text-amber-400 border border-neutral-700 rounded uppercase">
                        {lang === "id" ? "Sutradara Film & Peneliti" : "Film Director & Researcher"}
                      </span>
                      <span className="text-xs text-neutral-500">
                        Switzerland / Germany
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white uppercase">
                      Michael Schindhelm
                    </h3>
                    <p className="text-xs text-amber-400 font-medium">
                      {lang === "id"
                        ? "M.Sc. Kimia Kuantum • Penulis • Founding Director Dubai Culture & Arts Authority"
                        : "M.Sc. Quantum Chemistry • Writer • Founding Director, Dubai Culture & Arts Authority"}
                    </p>
                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                      {lang === "id" ? (
                        <>Penulis biografi Walter Spies <span className="italic">Walter Spies: Ein Exotisches Leben</span> (Munich, 2018). Mantan General Director Berliner Opernstiftung dan CEO Theater Basel. Schindhelm meramu riset analitis mendalam menjadi narasi sinematik yang mendekonstruksi eksotisme kolonial.</>
                      ) : (
                        <>Author of the Walter Spies biography <span className="italic">Walter Spies: Ein Exotisches Leben</span> (Munich, 2018). Former General Director of Berliner Opernstiftung and CEO of Theater Basel. Schindhelm transforms deep analytical research into a cinematic narrative that deconstructs colonial exoticism.</>
                      )}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                    <span>Filmography: Bird&apos;s Nest, Uli Sigg, BioNTech</span>
                    <a
                      href="https://michaelschindhelm.com/en/about/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 hover:underline font-display tracking-wider"
                    >
                      Official Bio ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian Protagonis & Tokoh Budaya Bali */}
            <div className="mt-10 space-y-8">
              <div>
                <span className="text-xs font-display tracking-widest text-amber-500 uppercase">
                  {lang === "id" ? "PROTAGONIS & TOKOH BUDAYA" : "PROTAGONISTS & CULTURAL FIGURES"}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase mt-1">
                  {lang === "id" ? "SENIMAN & KOLABORATOR BALI" : "BALINESE ARTISTS & COLLABORATORS"}
                </h2>
                <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                  {lang === "id"
                    ? "Para seniman dan tokoh budaya Bali yang berdialog serta merespons warisan Walter Spies di dalam film dan pameran."
                    : "Balinese artists and cultural figures who engage with and respond to Walter Spies' legacy in the film and exhibition."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Made Bayak */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center font-display font-bold text-lg">
                      MB
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold text-white uppercase">Made Bayak</h4>
                      <p className="text-xs text-amber-400 font-medium">{lang === "id" ? "Artivis & Aktivis Lingkungan (Gianyar)" : "Artivist & Environmental Activist (Gianyar)"}</p>
                    </div>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      Pelopor gerakan <strong className="text-neutral-200">&quot;Plasticology&quot;</strong>, merespons krisis sampah dan alih fungsi lahan di Bali melalui karya instalasi limbah plastik. Menyuarakan kritik tajam atas eksploitasi ekologi pariwisata massal.
                    </p>
                  </div>
                  <a
                    href="https://artworlddatabase.com/portfolio/made-bayak/"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 text-xs text-amber-400 font-display tracking-wider hover:underline inline-block"
                  >
                    {lang === "id" ? "LIHAT PORTOFOLIO" : "VIEW PORTFOLIO"} ↗
                  </a>
                </div>

                {/* Gus Dark */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center font-display font-bold text-lg">
                      GD
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold text-white uppercase">Gus Dark</h4>
                      <p className="text-xs text-amber-400 font-medium">{lang === "id" ? "Kartunis Editorial & Perupa" : "Editorial Cartoonist & Artist"}</p>
                    </div>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      Kartunis satir politik asal Bali. Menggunakan seni grafis dan komik untuk mengkritik eksotisme dangkal, perusakan ekosistem, serta dinamika sosial-ekonomi lokal.
                    </p>
                  </div>
                  <a
                    href="https://www.behance.net/gusdarkart"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 text-xs text-amber-400 font-display tracking-wider hover:underline inline-block"
                  >
                    {lang === "id" ? "LIHAT PORTOFOLIO" : "VIEW PORTFOLIO"} ↗
                  </a>
                </div>

                {/* Prof. I Wayan Dibia */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center font-display font-bold text-lg">
                      WD
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold text-white uppercase">Prof. I Wayan Dibia</h4>
                      <p className="text-xs text-amber-400 font-medium">{lang === "id" ? "Koreografer & Budayawan" : "Choreographer & Cultural Scholar"}</p>
                    </div>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      Maestro tari dan akademisi budaya ternama Bali. Memberikan pemikiran mendalam mengenai evolusi tari Kecak dan pengaruh interaksi Spies terhadap seni pertunjukan Bali.
                    </p>
                  </div>
                  <span className="mt-4 text-xs text-neutral-500 font-display tracking-wider block">
                    {lang === "id" ? "AKADEMISI BUDAYA" : "CULTURAL SCHOLAR"}
                  </span>
                </div>

                {/* Cok Agung Rai */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center font-display font-bold text-lg">
                      AR
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold text-white uppercase">Cok Agung Rai</h4>
                      <p className="text-xs text-amber-400 font-medium">{lang === "id" ? "Pendiri ARMA Museum & Budayawan" : "ARMA Museum Founder & Cultural Scholar"}</p>
                    </div>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      Pendiri ARMA Museum Ubud yang memelihara jejak karya seni Walter Spies serta menjadi ruang artikulasi penting bagi seni rupa Bali.
                    </p>
                  </div>
                  <a
                    href="https://armabali.com"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 text-xs text-amber-400 font-display tracking-wider hover:underline inline-block"
                  >
                    ARMA MUSEUM ↗
                  </a>
                </div>

                {/* Dewa Ayu Eka Putri */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center font-display font-bold text-lg">
                      EP
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold text-white uppercase">Dewa Ayu Eka Putri</h4>
                      <p className="text-xs text-amber-400 font-medium">{lang === "id" ? "Penari & Perupa Pertunjukan" : "Dancer & Performance Artist"}</p>
                    </div>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      Penari dan pengolah tubuh Bali yang menghidupkan kembali roh dan dialog performatif Walter Spies di dalam narasi docu-fiction film ROOTS.
                    </p>
                  </div>
                  <span className="mt-4 text-xs text-neutral-500 font-display tracking-wider block">
                    {lang === "id" ? "SENIMAN PERTUNJUKAN" : "PERFORMANCE ARTIST"}
                  </span>
                </div>

                {/* Putu Tangkas Adi */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center font-display font-bold text-lg">
                      TH
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold text-white uppercase">Putu Tangkas Adi</h4>
                      <p className="text-xs text-amber-400 font-medium">{lang === "id" ? "Musisi & Peracik Bunyi" : "Musician & Sound Artist"}</p>
                    </div>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      Musisi dan peracik bunyi kontemporer yang merespons lanskap suara Bali serta warisan musik gamelan yang pernah diteliti Spies pada dekade 1930-an.
                    </p>
                  </div>
                  <span className="mt-4 text-xs text-neutral-500 font-display tracking-wider block">
                    {lang === "id" ? "SENIMAN BUNYI" : "SOUND ARTIST"}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="pt-8 mt-8 border-t border-neutral-800 text-right">
              <button
                type="button"
                onClick={() => setIsNarativeOpen(false)}
                className="font-display px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-all"
              >
                {lang === "id" ? "TUTUP NARASI" : "CLOSE NARRATIVE"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Style Tambahan untuk Animasi Melayang (Floating Animation) */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}