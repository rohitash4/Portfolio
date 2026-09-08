import { useEffect, useRef } from 'react';

export default function WaveField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    const pointer = { x: 0.72, y: 0.45, active: false };
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let animationFrame;
    let scrollEnergy = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    const move = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / bounds.width;
      pointer.y = (event.clientY - bounds.top) / bounds.height;
      pointer.active = true;
    };
    const scroll = () => { scrollEnergy = Math.min(scrollEnergy + 0.8, 5); };
    const render = (time) => {
      const elapsed = time * 0.00045;
      context.clearRect(0, 0, width, height);
      const spacing = Math.max(22, Math.min(width / 34, 34));
      const columns = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      const focusX = pointer.x * width;
      const focusY = pointer.y * height;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const baseX = column * spacing - spacing;
          const baseY = row * spacing - spacing;
          const distance = Math.hypot(baseX - focusX, baseY - focusY);
          const pointerWave = pointer.active ? Math.sin(distance * 0.04 - elapsed * 9) * Math.exp(-distance * 0.0028) : 0;
          const ambientWave = Math.sin(baseX * 0.012 + elapsed * 2.2) * 0.5;
          const lift = pointerWave * 10 + ambientWave * 3 + scrollEnergy * Math.sin(distance * 0.025 - elapsed * 8);
          const opacity = Math.max(0.04, 0.18 - distance * 0.00013);
          const radius = Math.max(0.7, 1.1 + pointerWave * 0.8);
          context.beginPath();
          context.arc(baseX, baseY + lift, radius, 0, Math.PI * 2);
          context.fillStyle = `rgba(216, 255, 104, ${opacity})`;
          context.fill();
        }
      }
      scrollEnergy *= 0.94;
      animationFrame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true });
    animationFrame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', scroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="wave-field" aria-hidden="true" />;
}
