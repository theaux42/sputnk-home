'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function Header() {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation d'entrée du titre et logo
      gsap.from([titleRef.current, logoRef.current], {
        y: -50,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.3,
        stagger: 0.1
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className="relative z-10 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-6">
          <div ref={logoRef}>
            <Image
              src="/sputnk-logo.png"
              alt="Sputnk Logo"
              width={80}
              height={80}
              className="drop-shadow-2xl"
            />
          </div>
          <h1
            ref={titleRef}
            className="text-7xl md:text-8xl font-bold tracking-tighter text-white"
            style={{ letterSpacing: '-0.02em' }}
          >
            SPUTNK
          </h1>
        </div>
        <p className="text-center text-lg text-gray-500 font-light tracking-widest mt-4 uppercase text-xs">
          Mission Control Center
        </p>
        <div className="mt-6 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
      </div>
    </header>
  );
}
