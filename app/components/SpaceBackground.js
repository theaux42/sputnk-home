'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function SpaceBackground() {
  const starsRef = useRef(null);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;

    // Créer des étoiles
    const createStars = (count, className, size) => {
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = `star ${className}`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(star);
      }
    };

    createStars(100, 'star-small', 1);
    createStars(50, 'star-medium', 2);
    createStars(20, 'star-large', 3);

    // Animation GSAP pour un effet de parallaxe
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to('.star-small', {
        x: x * 0.5,
        y: y * 0.5,
        duration: 2,
        ease: 'power2.out'
      });
      
      gsap.to('.star-medium', {
        x: x * 1,
        y: y * 1,
        duration: 2,
        ease: 'power2.out'
      });
      
      gsap.to('.star-large', {
        x: x * 1.5,
        y: y * 1.5,
        duration: 2,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="space-background">
      <div ref={starsRef} className="stars"></div>
    </div>
  );
}
