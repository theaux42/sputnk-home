'use client';
import React, { useState, useEffect, useRef } from "react";
import ServiceCard from "./serviceCard";
import { gsap } from "gsap";

const ServiceList = ({ services, onStatusUpdate }) => {
  const [statuses, setStatuses] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchStatuses = async () => {
    try {
      const response = await fetch('/api/check-status');
      const data = await response.json();
      setStatuses(data.statuses);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching statuses:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchStatuses();
    };

    load();

    const interval = setInterval(fetchStatuses, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const groupedServices = services.reduce((groups, service) => {
    if (!groups[service.type]) {
      groups[service.type] = [];
    }
    groups[service.type].push(service);
    return groups;
  }, {});

  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const categories = gsap.utils.toArray('.svc-cat-panel');
      const cards = gsap.utils.toArray('.svc-card');

      gsap.set(containerRef.current, { perspective: 1200 });
      gsap.set(cards, { autoAlpha: 1 });

      gsap.from(categories, {
        y: 32,
        opacity: 0,
        rotateX: -10,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.08
      });

      const cardTween = gsap.from(cards, {
        y: 22,
        autoAlpha: 0,
        scale: 0.96,
        rotateX: -6,
        transformOrigin: '50% 0%',
        duration: 0.82,
        delay: 0.05,
        ease: 'power3.out',
        stagger: 0.05
      });

      cardTween.eventCallback('onComplete', () => {
        gsap.set(cards, { clearProps: 'transform,opacity', autoAlpha: 1 });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [services.length]);

  useEffect(() => {
    if (!onStatusUpdate) return;
    const onlineCount = Object.values(statuses).filter((s) => s?.isOnline).length;
    onStatusUpdate(onlineCount);
  }, [statuses, onStatusUpdate]);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 relative z-10">
      {Object.entries(groupedServices).map(([type, servicesList], catIndex) => (
        <div key={type} className="service-category">
          {/* Category Header Panel */}
          <div
            className="panel panel-soft mb-4 overflow-hidden relative svc-cat-panel"
            style={{
              padding: '12px 14px',
              borderLeft: `2px solid ${
                type === 'Infrastructure' ? 'var(--danger)' :
                type === 'Security' ? 'var(--warning)' :
                'var(--info)'
              }`
            }}
          >
            <div className="beam" style={{ opacity: 0.08 }} />
            <div className="flex items-center justify-between">
              <h2 className="text-h2" style={{
                fontSize: '13px',
                color: 'var(--text-primary)',
                letterSpacing: '0.4px'
              }}>
                {type.toUpperCase()}
              </h2>
              <div className="text-mono-log tabular-nums chip" style={{ fontSize: '10px', color: 'var(--info)' }}>
                [{servicesList.length.toString().padStart(2, '0')}] TRACKED
              </div>
            </div>
          </div>

          {/* Services List */}
          <div className="flex flex-col gap-3 md:gap-4">
            {servicesList.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                status={statuses[service.id]}
                index={catIndex * 3 + index}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
