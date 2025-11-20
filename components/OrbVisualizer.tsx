import React, { useEffect, useRef } from 'react';

interface OrbVisualizerProps {
  isActive: boolean;
  isSpeaking: boolean;
  audioLevel: number;
}

export const OrbVisualizer: React.FC<OrbVisualizerProps> = ({ isActive, isSpeaking, audioLevel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
          canvas.width = rect.width;
          canvas.height = rect.height;
      }
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.3;
      
      const dynamicScale = isActive ? 1 + (audioLevel / 255) * 0.4 : 1;
      const radius = baseRadius * dynamicScale;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Theme Colors: Zinc & Blue
      // Active: Blue (#3b82f6)
      // Inactive: Zinc (#52525b)
      
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius * 1.5);
      
      if (isActive) {
          if (isSpeaking) {
              // Active Speaking: Bright Blue Core
              gradient.addColorStop(0, 'rgba(59, 130, 246, 0.9)'); 
              gradient.addColorStop(0.6, 'rgba(59, 130, 246, 0.2)');
              gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          } else {
              // Active Listening: Dimmer Blue
              gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
              gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          }
      } else {
          // Inactive: Gray
          gradient.addColorStop(0, 'rgba(63, 63, 70, 0.4)');
          gradient.addColorStop(1, 'rgba(63, 63, 70, 0)');
      }

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Draw Wireframe/Tech Circle
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      
      for (let i = 0; i <= 360; i += 2) {
        const angle = (i * Math.PI) / 180;
        // More mechanical/geometric movement
        const noise = isActive ? Math.sin(angle * 8 + time) * 3 + Math.cos(angle * 4 - time) * 3 : 0;
        const r = radius + noise;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.closePath();
      
      // Stroke only for a wireframe look
      ctx.strokeStyle = isActive 
        ? (isSpeaking ? '#3b82f6' : '#60a5fa') 
        : '#52525b';
      ctx.stroke();
      
      // Inner Solid Core
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? '#3b82f6' : '#27272a';
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, isSpeaking, audioLevel]);

  return <canvas ref={canvasRef} className="w-64 h-64 md:w-80 md:h-80" />;
};