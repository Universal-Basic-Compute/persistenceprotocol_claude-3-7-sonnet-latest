'use client';

import { useEffect, useRef } from 'react';

interface MemoryVisualizationProps {
  data?: any;
  width?: number;
  height?: number;
}

export default function MemoryVisualization({ 
  data, 
  width = 600, 
  height = 400 
}: MemoryVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw fractal memory visualization
    drawFractalMemory(ctx, width / 2, height / 2, Math.min(width, height) * 0.4, 0);

  }, [width, height, data]);

  // Function to draw a fractal memory structure
  const drawFractalMemory = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    depth: number
  ) => {
    if (depth > 5 || size < 2) return;

    // Draw main node
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    
    // Use different colors for different depths
    const alpha = 1 - depth * 0.15;
    ctx.fillStyle = `rgba(139, 109, 76, ${alpha})`;
    ctx.strokeStyle = `rgba(139, 109, 76, ${alpha + 0.2})`;
    
    ctx.fill();
    ctx.stroke();

    // Draw connections and child nodes
    const numChildren = 5;
    const angleStep = (Math.PI * 2) / numChildren;
    
    for (let i = 0; i < numChildren; i++) {
      const angle = i * angleStep;
      const distance = size * 1.5;
      
      const childX = x + Math.cos(angle) * distance;
      const childY = y + Math.sin(angle) * distance;
      
      // Draw connection line
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(childX, childY);
      ctx.strokeStyle = `rgba(139, 109, 76, ${alpha * 0.7})`;
      ctx.stroke();
      
      // Draw child node (recursive)
      drawFractalMemory(ctx, childX, childY, size * 0.5, depth + 1);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height}
        className="border border-gray-200 dark:border-gray-700 rounded-lg"
      />
    </div>
  );
}
