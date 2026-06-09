import React, { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, nodes = [], animId;

    function resize() {
      W = canvas.width = canvas.parentElement.offsetWidth;
      H = canvas.height = canvas.parentElement.offsetHeight;
    }

    class Node {
      constructor() { this.reset(); }
      reset() {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 180 + Math.random() * 200;
        this.x3 = r * Math.sin(phi) * Math.cos(theta);
        this.y3 = r * Math.sin(phi) * Math.sin(theta);
        this.z3 = r * Math.cos(phi);
        this.vx = (Math.random() - .5) * .3;
        this.vy = (Math.random() - .5) * .3;
        this.vz = (Math.random() - .5) * .3;
        this.size = Math.random() * 2.5 + .5;
        this.pulse = Math.random() * Math.PI * 2;
      }
      update() {
        this.x3 += this.vx; this.y3 += this.vy; this.z3 += this.vz;
        this.pulse += .025;
        const cos = Math.cos(.0008), sin = Math.sin(.0008);
        const nx = this.x3 * cos + this.z3 * sin;
        const nz = -this.x3 * sin + this.z3 * cos;
        this.x3 = nx; this.z3 = nz;
        const dist = Math.sqrt(this.x3 ** 2 + this.y3 ** 2 + this.z3 ** 2);
        if (dist > 400) { this.vx *= -1; this.vy *= -1; this.vz *= -1; }
      }
      project() {
        const fov = 600;
        const scale = fov / (fov + this.z3 + 400);
        return { x: W / 2 + this.x3 * scale, y: H / 2 + this.y3 * scale, scale, depth: (this.z3 + 400) / 800 };
      }
    }

    function initNodes() {
      const count = Math.min(Math.floor((W * H) / 16000), 60);
      nodes = Array.from({ length: count }, () => new Node());
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => n.update());
      const projected = nodes.map(n => ({ node: n, ...n.project() }));
      projected.sort((a, b) => a.depth - b.depth);

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i], b = projected[j];
          const dist2d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (dist2d < 140) {
            const alpha = (1 - dist2d / 140) * .35 * Math.min(a.depth, b.depth);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(123,108,255,${alpha})`;
            ctx.lineWidth = .6;
            ctx.stroke();
          }
        }
      }

      projected.forEach(p => {
        const pulse = .6 + .4 * Math.sin(p.node.pulse);
        const alpha = p.depth * .9 * pulse;
        const r = p.node.size * p.scale * 2.5;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        grad.addColorStop(0, `rgba(200,242,71,${alpha * .25})`);
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(.5, r), 0, Math.PI * 2);
        ctx.fillStyle = p.depth > .65 ? `rgba(200,242,71,${alpha})` : `rgba(123,108,255,${alpha * 1.2})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    initNodes();
    requestAnimationFrame(draw);

    const handleResize = () => { resize(); initNodes(); };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}