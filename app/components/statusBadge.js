'use client';
import React from "react";

const StatusBadge = ({ status }) => {
  const isOnline = status?.isOnline ?? null;

  return (
    <div className="inline-flex">
      {isOnline === null ? (
        <div
          className="text-mono-log tabular-nums"
          style={{
            padding: '5px 12px',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.08), rgba(120, 120, 120, 0.06))',
            border: '1px solid var(--border-primary)',
            borderRadius: '4px',
            color: 'var(--text-secondary)',
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
            animation: 'pulse-status 2s infinite'
          }}
        >
          <span style={{ color: 'var(--text-muted)', marginRight: '6px' }}>●</span> Syncing
        </div>
      ) : isOnline ? (
        <div
          className="text-mono-log tabular-nums"
          style={{
            padding: '5px 12px',
            background: 'linear-gradient(120deg, rgba(93, 255, 177, 0.18), rgba(12, 34, 24, 0.8))',
            boxShadow: '0 10px 30px rgba(93, 255, 177, 0.16)',
            border: '1px solid rgba(93, 255, 177, 0.4)',
            borderRadius: '4px',
            color: 'var(--success)',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.4px',
            textTransform: 'uppercase'
          }}
        >
          <span style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '999px',
            background: 'var(--success)',
            marginRight: '6px',
            animation: 'pulse-status 1.6s infinite'
          }}></span>
          Online
        </div>
      ) : (
        <div
          className="text-mono-log tabular-nums"
          style={{
            padding: '5px 12px',
            background: 'linear-gradient(120deg, rgba(255, 107, 107, 0.18), rgba(44, 19, 31, 0.9))',
            border: '1px solid rgba(255, 107, 107, 0.5)',
            borderRadius: '4px',
            color: 'var(--danger)',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.4px',
            textTransform: 'uppercase'
          }}
        >
          <span style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '999px',
            background: 'var(--danger)',
            marginRight: '6px'
          }}></span>
          Offline
        </div>
      )}
    </div>
  );
}

export default StatusBadge;
