"use client";

export default function SystemFooter() {
  const vmStats = [
    { label: 'CPU LOAD', value: '37%', accent: 'var(--info)' },
    { label: 'RAM FREE', value: '12.4 GB', accent: 'var(--success)' },
    { label: 'DISK FREE', value: '420 GB', accent: 'var(--warning)' },
    { label: 'NET I/O', value: '1.8 Gbps', accent: 'var(--accent-magenta)' },
  ];

  const hostStats = [
    { label: 'CPU LOAD', value: '18%', accent: 'var(--info)' },
    { label: 'RAM FREE', value: '64 GB', accent: 'var(--success)' },
    { label: 'ZFS POOL', value: '6.2 TB', accent: 'var(--warning)' },
    { label: 'UPTIME', value: '214 DAYS', accent: 'var(--accent-lime)' },
  ];

  const renderBlock = (title, stats) => (
    <div className="panel panel-ghost relative overflow-hidden">
      <div className="beam" style={{ opacity: 0.12 }} />
      <div className="card-glow" />
      <div className="card-scan" />
      <div className="relative z-10 space-y-4">
        <div className="text-label" style={{ color: 'var(--text-muted)' }}>{title}</div>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={`${title}-${stat.label}`} className="stat-block">
              <div className="text-mono-log" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              <div className="text-h3 mt-1 tabular-nums" style={{ color: stat.accent }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <footer className="shell pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {renderBlock('VM :: CONTROL NODE', vmStats)}
        {renderBlock('PROXMOX HOST', hostStats)}
      </div>
    </footer>
  );
}
