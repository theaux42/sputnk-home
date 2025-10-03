'use client';
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import StatusBadge from './statusBadge';
import { gsap } from 'gsap';

const ServiceCard = ({ service, status, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Animation d'entrée avec délai basé sur l'index
      gsap.fromTo(cardRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out'
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -8,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <Link 
      href={service.link}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative block bg-black/40 backdrop-blur-xl border border-zinc-900/50 hover:border-zinc-700/80 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-900/50"
    >
      {/* Lignes de scan animées */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-800/10 to-transparent animate-scan"></div>
      </div>
      
      {/* Coins décoratifs style sci-fi */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-700"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-zinc-700"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-zinc-700"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-700"></div>
      
      {/* Indicateur de statut */}
      <StatusBadge status={status} />

      <div className="relative z-10 p-4 flex items-start gap-4">
        {/* Icône avec effet néon */}
        <div className="flex-shrink-0 w-12 h-12 border border-zinc-800 rounded bg-zinc-950/80 flex items-center justify-center text-zinc-500 group-hover:text-zinc-300 group-hover:border-zinc-700 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-700/0 via-zinc-700/10 to-zinc-700/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <svg className="relative z-10" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>

        <div className="flex-1 min-w-0 pr-20">
          <h3 className="text-lg font-medium text-white mb-1.5 transition-colors group-hover:text-gray-200 tracking-tight">
            {service.title}
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed font-light">
            {service.description}
          </p>
        </div>
      </div>

      {/* Ligne lumineuse en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-zinc-900">
        <div className="h-full w-0 bg-gradient-to-r from-transparent via-zinc-600 to-transparent group-hover:w-full transition-all duration-700 ease-out"></div>
      </div>

      {/* Indicateur hexagonal */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-600">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      </div>
    </Link>
  );
}

export default ServiceCard;

