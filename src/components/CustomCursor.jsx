import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches)
      return undefined;

    let pointerX = -100;
    let pointerY = -100;
    let ringX = pointerX;
    let ringY = pointerY;
    let animationFrame;

    const move = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
    };
    const enterInteractive = () => document.body.classList.add('cursor-hover');
    const leaveInteractive = () =>
      document.body.classList.remove('cursor-hover');
    const animate = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', move);
    document.querySelectorAll('a, button').forEach((element) => {
      element.addEventListener('pointerenter', enterInteractive);
      element.addEventListener('pointerleave', leaveInteractive);
    });
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('pointermove', move);
      document.querySelectorAll('a, button').forEach((element) => {
        element.removeEventListener('pointerenter', enterInteractive);
        element.removeEventListener('pointerleave', leaveInteractive);
      });
      document.body.classList.remove('cursor-hover');
    };
  }, []);

  return (
    <>
      <span ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <span ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
