import React, { useEffect, useRef } from 'react';

export default function CircuitBackground({ theme = 'dark' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = [];
    const connections = [];
    const nodeCount = 40;

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        glow: Math.random() * Math.PI * 2,
        glowSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && Math.random() > 0.7) {
          connections.push({
            from: i,
            to: j,
            progress: Math.random(),
            speed: Math.random() * 0.005 + 0.002,
          });
        }
      }
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.glow += node.glowSpeed;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node with pulsing glow
        const glowIntensity = Math.sin(node.glow) * 0.5 + 0.5;
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
        
        if (theme === 'dark') {
          gradient.addColorStop(0, `rgba(200, 200, 200, ${0.8 * glowIntensity})`);
          gradient.addColorStop(0.5, `rgba(150, 150, 150, ${0.3 * glowIntensity})`);
          gradient.addColorStop(1, 'rgba(100, 100, 100, 0)');
        } else {
          gradient.addColorStop(0, `rgba(100, 100, 100, ${0.6 * glowIntensity})`);
          gradient.addColorStop(0.5, `rgba(80, 80, 80, ${0.2 * glowIntensity})`);
          gradient.addColorStop(1, 'rgba(60, 60, 60, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(50, 50, 50, 0.8)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections with animated pulses
      connections.forEach((conn) => {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        
        conn.progress += conn.speed;
        if (conn.progress > 1) conn.progress = 0;

        // Draw line
        ctx.strokeStyle = theme === 'dark' ? 'rgba(100, 100, 100, 0.15)' : 'rgba(150, 150, 150, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        // Draw animated pulse
        const pulseX = from.x + (to.x - from.x) * conn.progress;
        const pulseY = from.y + (to.y - from.y) * conn.progress;
        
        const pulseGradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 8);
        if (theme === 'dark') {
          pulseGradient.addColorStop(0, 'rgba(220, 220, 220, 0.8)');
          pulseGradient.addColorStop(0.5, 'rgba(160, 160, 160, 0.4)');
          pulseGradient.addColorStop(1, 'rgba(120, 120, 120, 0)');
        } else {
          pulseGradient.addColorStop(0, 'rgba(80, 80, 80, 0.6)');
          pulseGradient.addColorStop(0.5, 'rgba(60, 60, 60, 0.3)');
          pulseGradient.addColorStop(1, 'rgba(40, 40, 40, 0)');
        }
        
        ctx.fillStyle = pulseGradient;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}