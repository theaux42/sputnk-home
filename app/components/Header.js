'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const AnimatedCounter = ({ value, suffix = '', color = 'var(--text-primary)', duration = 1 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value || 0;
    if (start === end) {
      setDisplayValue(end);
      return;
    }

    const incrementTime = Math.abs(Math.floor((duration * 1000) / (end - start || 1)));
    const timer = setInterval(() => {
      start += 1;
      setDisplayValue((prev) => {
        if (prev >= end) {
          clearInterval(timer);
          return end;
        }
        return prev + 1;
      });
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(incrementTime, 40));

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <div className="text-kpi tabular-nums" style={{ color }}>
      {String(displayValue).padStart(2, '0')}{suffix}
    </div>
  );
};

export default function Header({ serviceCount = 0, onlineCount = 0, onlinePercentage = 0 }) {
  const [timestamp, setTimestamp] = useState('');
  const [systemLog, setSystemLog] = useState('INITIALIZING');
  const headerRef = useRef(null);
  const bandRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const formatted = now.toISOString().replace('T', ' ').substring(0, 19);
      setTimestamp(formatted);
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 1000);

    const logs = [
      'NETWORK_SYNC >> ACTIVE',
      'MISSION_CONTROL >> ONLINE',
      'SECURITY_CLEARANCE >> VERIFIED',
      'DATA_STREAM >> ENCRYPTED'
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      setSystemLog(logs[logIndex % logs.length]);
      logIndex++;
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (bandRef.current) {
        tl.fromTo(
          bandRef.current,
          { autoAlpha: 0, y: -12 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0
        );
      }

      if (panelRef.current) {
        tl.fromTo(
          panelRef.current,
          { autoAlpha: 0, y: 18, scale: 0.97, rotateX: -4 },
          { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: 0.95 },
          0.1
        );
      }
    }, headerRef);
    return () => ctx.revert();
  }, []);

  return (
    <header className="relative z-20" ref={headerRef}>
      <div className="shell px-6 pt-10 pb-5">
        {/* Command line bar */}
        <div className="panel panel-slim panel-soft overflow-hidden relative mb-5" ref={bandRef}>
          <div className="beam" style={{ opacity: 0.12 }} />
          <div className="card-glow" />
          <div className="card-scan" />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 relative z-10 text-mono-log" style={{ color: 'var(--text-muted)' }}>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="status-pip success" />
              <span className="tabular-nums text-[11px]">[{timestamp}]</span>
              <span style={{ color: 'var(--border-primary)' }}>/</span>
              <span style={{ color: 'var(--info)' }} className="text-[11px]">{systemLog}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 flex-wrap">
              <span className="chip chip-strong">SYS_OPERATIONAL</span>
              <span className="chip">LIVE FEED</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="panel panel-ghost relative overflow-hidden" ref={panelRef}>
          <div className="beam" style={{ opacity: 0.14 }} />
          <div className="card-glow" />
          <div className="card-scan" />
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
            <div className="relative">
              <div className="w-16 h-16 flex items-center justify-center rounded-[4px]" style={{
              }}>
                <Image
                  src="/sputnk-logo.png"
                  alt="SPUTNK"
                  width={128}
                  height={128}
                  className="relative"
                />
              </div>
            </div>

            <div className="flex-1 w-full">
              <h1 className="text-h1" style={{ fontSize: 'clamp(19px, 3vw, 24px)', color: 'var(--text-primary)', marginBottom: '6px', letterSpacing: '0.5px' }}>
                SPUTNK // Mission Control Center
              </h1>
              <p className="text-mono-log" style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Live command hub orchestrating infrastructure, telemetry, and secure delivery across the SPUTNK constellation.
              </p>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-mono-log" style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                <span className="chip chip-strong">NODE_ID: MCC-001</span>
                <span className="chip">CLEARANCE: ALPHA</span>
                <span className="chip chip-success">PROTOCOL: ENCRYPTED</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full md:w-auto min-w-[260px]">
              <div className="stat-block">
                <div className="text-label" style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>SERVICES ACTIVE</div>
                <AnimatedCounter key={onlineCount} value={onlineCount} color="var(--success)" />
              </div>
              <div className="stat-block">
                <div className="text-label" style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>SIGNAL FIDELITY</div>
                <AnimatedCounter key={`sig-${onlinePercentage}`} value={onlinePercentage} suffix="%" color="var(--accent-magenta)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
