import React, { useRef, useEffect } from 'react';

export default function Canvas3DLogo({ size = 300, interactive = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let angleX = 0;
    let angleY = 0;
    let targetAngleX = 0;
    let targetAngleY = 0;
    let time = 0;

    // Set canvas dimensions with high DPR support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    // Particles around eclipse artifact (Cyan & Emerald)
    const numParticles = 40;
    const particles = Array.from({ length: numParticles }, () => ({
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(Math.random() * 2 - 1),
      radius: (size * 0.38) + Math.random() * (size * 0.15),
      speed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      size: Math.random() * 2.5 + 1,
      color: Math.random() > 0.4 ? '#38bdf8' : '#10b981'
    }));

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetAngleY = x * 1.2;
      targetAngleX = -y * 1.2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      time += 0.015;
      angleX += (targetAngleX - angleX) * 0.08;
      angleY += (targetAngleY - angleY) * 0.08;

      const autoRotateY = time * 0.5;
      const currentAngleY = angleY + autoRotateY;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const r = size * 0.3;

      // Outer glowing aura (Electric Cyan & Royal Blue)
      const auraGradient = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 1.5);
      auraGradient.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
      auraGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.2)');
      auraGradient.addColorStop(1, 'rgba(11, 15, 25, 0)');

      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Outer Ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angleX * 0.2);

      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#06b6d4';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 15;
      ctx.stroke();

      // Inner Core
      const coreGradient = ctx.createRadialGradient(-r * 0.2, -r * 0.2, 0, 0, 0, r * 0.82);
      coreGradient.addColorStop(0, '#1e293b');
      coreGradient.addColorStop(0.7, '#0b0f19');
      coreGradient.addColorStop(1, '#020617');

      ctx.beginPath();
      ctx.arc(0, 0, r * 0.82, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.shadowBlur = 0;
      ctx.fill();

      // Inner Rune Ring (Rotating opposite)
      ctx.save();
      ctx.rotate(-currentAngleY * 0.6);
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.65, 0, Math.PI * 2);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.setLineDash([8, 12, 4, 12]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Celestial Emblem (Central Cyan Starburst / Sigil)
      ctx.save();
      ctx.rotate(currentAngleY * 0.3);
      const points = 8;
      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? r * 0.45 : r * 0.22;
        const angle = (i * Math.PI) / points;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      const sigilGrad = ctx.createLinearGradient(-r * 0.4, -r * 0.4, r * 0.4, r * 0.4);
      sigilGrad.addColorStop(0, '#e0f2fe');
      sigilGrad.addColorStop(0.5, '#06b6d4');
      sigilGrad.addColorStop(1, '#3b82f6');

      ctx.fillStyle = sigilGrad;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();

      ctx.restore();

      // Render 3D Orbiting Particles
      particles.forEach((p) => {
        p.theta += p.speed;
        const x3d = p.radius * Math.sin(p.phi) * Math.cos(p.theta);
        const y3d = p.radius * Math.sin(p.phi) * Math.sin(p.theta);
        const z3d = p.radius * Math.cos(p.phi);

        const rotYX = x3d * Math.cos(currentAngleY) + z3d * Math.sin(currentAngleY);
        const rotYZ = -x3d * Math.sin(currentAngleY) + z3d * Math.cos(currentAngleY);

        const rotXY = y3d * Math.cos(angleX) - rotYZ * Math.sin(angleX);
        const rotXZ = y3d * Math.sin(angleX) + rotYZ * Math.cos(angleX);

        const perspective = 400 / (400 + rotXZ);
        const screenX = cx + rotYX * perspective;
        const screenY = cy + rotXY * perspective;
        const alpha = Math.max(0.1, (rotXZ + p.radius) / (p.radius * 2));

        ctx.beginPath();
        ctx.arc(screenX, screenY, p.size * perspective, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha * 0.9;
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [size, interactive]);

  return (
    <div className="relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      <canvas
        ref={canvasRef}
        style={{ width: `${size}px`, height: `${size}px` }}
        className="drop-shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}
