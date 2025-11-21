"use client";
import { useMemo, useState } from "react";
import ServiceList from "./serviceList";
import Header from "./Header";
import services from "../data/services";
import WireframeGrid from "./WireframeGrid";
import SystemFooter from "./SystemFooter";

export default function ServiceListWrapper() {
  const [onlineServices, setOnlineServices] = useState(0);
  const onlinePercentage = useMemo(() => {
    if (!services.length) return 0;
    return Math.round((onlineServices / services.length) * 100);
  }, [onlineServices]);

  return (
    <>
      <WireframeGrid />
      <Header
        serviceCount={services.length}
        onlineCount={onlineServices}
        onlinePercentage={onlinePercentage}
      />
      <main className="relative z-10 px-6 pt=" style={{ paddingBottom: '80px' }}>
        <div className="shell flex flex-col gap-8">
          <ServiceList services={services} onStatusUpdate={setOnlineServices} />
          <SystemFooter />
        </div>
      </main>
    </>
  );
}
