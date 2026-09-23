'use client';

import React, { useState } from 'react';

export default function Hero({ data }: { data: any }) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = (window.innerWidth / 2 - e.clientX) / 30;
    const y = (window.innerHeight / 2 - e.clientY) / 30;
    setParallax({ x, y });
  };

  return (
    <section
      id='overview'
      onMouseMove={handleMouseMove}
      className='relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat overflow-hidden py-16'
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 10, 0.4), rgba(10, 10, 10, 0.9)), url('/image/hero-bg-convert.jpg')`,
      }}
    >
      <div className='max-w-7xl mx-auto px-6 lg:px-12 w-full z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
          {/* Kolom Kiri: Teks & Tombol Trailer */}
          <div className='lg:col-span-6 space-y-6 text-left z-30'>
            <h1 className='hero-fade-in-up hero-fade-in-up-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase tracking-wide max-w-lg'>
              {data?.title || 'One Hundred Years Walter Spies in Bali'}
            </h1>

            <p className='hero-fade-in-up hero-fade-in-up-delay-2 text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-md font-light'>
              {data?.synopsis ||
                'Situs resmi tur pemutaran film docu-fiction karya Michael Schindhelm. Menelusuri 100 tahun jejak estetika Walter Spies, eksploitasi pariwisata massal, krisis ekologi subak, dan dialog kritis kebudayaan Bali.'}
            </p>

            <div className='pt-4'>
              <button
                type='button'
                onClick={() => {
                  const roadshowSection = document.getElementById('roadshow');
                  if (roadshowSection) {
                    roadshowSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className='px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs tracking-widest uppercase rounded shadow-lg transition-all hover:scale-105'
              >
                JADWAL PEMUTARAN TERDEKAT ↓
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Visual 3D Layering (ROOTS + Topeng) */}
          <div className='lg:col-span-6 relative flex justify-center items-center h-[450px] sm:h-[500px]'>
            {/* Layer ROOTS Icon (Belakang) */}
            <img
              src='/image/ROOTSicon.png'
              alt='ROOTS Title'
              className='absolute w-[80%] max-w-md object-contain z-10 select-none transition-transform duration-100 ease-out'
              style={{
                transform: `translate3d(${parallax.x * 0.5}px, ${parallax.y * 0.5}px, 0) scale(1.5)`,
              }}
            />

            {/* Layer Topeng (Depan) */}
            <img
              src='/image/ROOTS-topeng-convert.png'
              alt='Walter Spies Mask'
              className='absolute w-[55%] max-w-xs object-contain z-20 select-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transition-transform duration-100 ease-out'
              style={{
                transform: `translate3d(${-parallax.x * 1.2}px, ${-parallax.y * 1.2}px, 0) scale(1.5)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
