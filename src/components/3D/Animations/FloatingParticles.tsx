'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

export const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const newParticles: Particle[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 3,
      size: 4 + Math.random() * 8,
    }));
    setParticles(newParticles);
  }, []);

  if (!isClient) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 5 }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ x: particle.x, y: particle.y, opacity: 1 }}
          animate={{
            y: particle.y - 150,
            opacity: [0.9, 0.7, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{
            position: 'fixed',
            width: `${particle.size *1.5}px`,
            height: `${particle.size * 1.5}px`,
            borderRadius: '50%',
            background: 'rgba(79, 195, 255, 0.3)',
            boxShadow: `0 0 ${particle.size * 2}px rgba(79, 195, 255, 0.4), 0 0 ${particle.size * 4}px rgba(79, 195, 255, 0.2)`
        }}
        />
      ))}
    </div>
  );
};