import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

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

  const cursorX = useMotionValue(-600);
  const cursorY = useMotionValue(-600);
  const x = useSpring(cursorX, { damping: 28, stiffness: 120 });
  const y = useSpring(cursorY, { damping: 28, stiffness: 120 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

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
      {/* Base */}
      <div className="absolute inset-0 bg-black" />

      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(163,230,53,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(163,230,53,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Radial gradient from center */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(163,230,53,0.15) 0%, transparent 65%)',
        }}
      />

      {/* Pointer bubble */}
      <motion.div
        className="fixed pointer-events-none rounded-full"
        style={{
          x,
          y,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(163,230,53,0.13) 0%, transparent 70%)',
          zIndex: 10,
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