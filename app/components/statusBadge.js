'use client';
import React from "react";

const StatusBadge = ({ status }) => {
  const isOnline = status?.isOnline ?? null;

  return (
    <div className="absolute top-3 right-3 z-10">
      {isOnline === null ? (
        <div className="px-2.5 py-1 bg-zinc-950/90 border border-zinc-800 rounded text-zinc-500 text-[9px] font-mono tracking-widest animate-pulse backdrop-blur-sm">
          CHECKING
        </div>
      ) : isOnline ? (
        <div className="px-2.5 py-1 bg-emerald-950/50 border border-emerald-500/40 rounded text-emerald-400 text-[9px] font-mono tracking-widest backdrop-blur-sm shadow-lg shadow-emerald-500/20">
          ONLINE
        </div>
      ) : (
        <div className="px-2.5 py-1 bg-red-950/50 border border-red-500/40 rounded text-red-400 text-[9px] font-mono tracking-widest backdrop-blur-sm shadow-lg shadow-red-500/20">
          OFFLINE
        </div>
      )}
    </div>
  );
}

export default StatusBadge;
