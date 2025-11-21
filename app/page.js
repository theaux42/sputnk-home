import React from "react";
import ServiceListWrapper from "./components/ServiceListWrapper";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <ServiceListWrapper />
    </div>
  );
}
