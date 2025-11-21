'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StatusBadge from './statusBadge';

const ServiceCard = ({ service, status, index }) => {
  const isOnline = status?.isOnline ?? null;

  return (
    <Link
      href={service.link}
      className="svc-card group relative block panel panel-hover overflow-hidden transition-all duration-300"
      style={{
        padding: '16px',
        borderColor: 'var(--border-primary)'
      }}
    >
      <div className="card-glow" />
      <div className="card-scan" />
      <div className="beam" style={{ opacity: 0.08 }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ borderRadius: 'var(--radius-panel)' }}>
        <div style={{
          backgroundImage: 'linear-gradient(var(--border-grid) 1px, transparent 1px), linear-gradient(90deg, var(--border-grid) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          opacity: 0.04,
          width: '100%',
          height: '100%',
          borderRadius: 'var(--radius-panel)'
        }}></div>
      </div>

      <div className="relative z-10 space-y-2">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-[4px]" style={{
            flexShrink: 0,
            overflow: 'hidden'
          }}>
            {service.logo ? (
              <Image
                src={service.logo}
                alt={service.title}
                width={44}
                height={44}
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-secondary)' }} className="group-hover:text-[var(--text-primary)] transition-colors">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round"></path>
                <path d="M3 12a9 9 0 0 1 9-9" strokeLinecap="round"></path>
                <path d="M12 12l6 6" strokeLinecap="round"></path>
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-h3" style={{
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
                fontSize: '12px'
              }}>
                {service.title}
              </h3>
              <StatusBadge status={status} />
            </div>
            <div className="flex items-start justify-between gap-2">
              <p className="text-mono-log" style={{ color: 'var(--text-secondary)', fontSize: '10px', lineHeight: '1.35' }}>
                {service.description}
              </p>
              {isOnline ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-secondary)', flexShrink: 0, marginTop: '2px' }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
