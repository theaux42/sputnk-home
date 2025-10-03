'use client';
import React, { useState, useEffect, useRef } from "react";
import ServiceCard from "./serviceCard";
import { gsap } from 'gsap';

const ServiceList = ({ services }) => {
  const [statuses, setStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const categoriesRef = useRef([]);

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
    // Première récupération
    fetchStatuses();

    // Rafraîchir toutes les 5 minutes
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

  useEffect(() => {
    // Attendre que tous les refs soient prêts
    const timer = setTimeout(() => {
      categoriesRef.current.forEach((cat, index) => {
        if (cat) {
          gsap.fromTo(cat,
            {
              x: -30,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.2,
              ease: 'power3.out'
            }
          );
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [groupedServices]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {Object.entries(groupedServices).map(([type, servicesList], catIndex) => (
        <div key={type} className="service-category">
          <h2 
            ref={el => categoriesRef.current[catIndex] = el}
            className="text-xl font-bold text-white mb-5 tracking-tight uppercase text-sm"
            style={{ letterSpacing: '0.1em' }}
          >
            {type}
          </h2>
          <div className="flex flex-col gap-4">
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

