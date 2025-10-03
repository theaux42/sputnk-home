import React from "react";
import ServiceList from "./components/serviceList";
import services from "./data/services";
import SpaceBackground from "./components/SpaceBackground";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <SpaceBackground />
      <Header />
      <main className="container mx-auto px-4 py-8 relative z-10">
        <ServiceList services={services} />
      </main>
    </div>
  );
}
