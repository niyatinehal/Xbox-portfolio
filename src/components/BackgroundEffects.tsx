import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
}

const AGE_STEP = 1 / (500 / 16); // ~0.032 per frame at 60fps
const MAX_PARTICLES = 50;

const BackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    let rafId = 0;

    const spawnParticle = (x: number, y: number) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        age: 0,
      });
    };

    const handleMouseMove = (e: MouseEvent) => spawnParticle(e.clientX, e.clientY);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += AGE_STEP;
        p.x += p.vx;
        p.y += p.vy;

        if (p.age >= 1) {
          particles.splice(i, 1);
          continue;
        }

        const size = 3 * (1 - p.age);
        const opacity = 0.8 * (1 - p.age);

        ctx.save();
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(163, 230, 53, 0.6)';
        ctx.fillStyle = `rgba(163, 230, 53, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    document.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(draw);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900"></div>
      
      {/* Animated radial highlights */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/8 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-lime-300/5 rounded-full blur-3xl"
      />
      
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 20 }}
      />
    </div>
  );
};

export default BackgroundEffects;