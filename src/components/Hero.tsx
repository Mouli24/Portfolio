import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const frameCount = 405; 
    const currentFrame = (index: number) => {
      if (index <= 299) return `/hero/Video Object Remover-1777050371000_${index.toString().padStart(3, '0')}.jpg`;
      const hero2Index = index - 300;
      return `/hero2/Video Project 1_${hero2Index.toString().padStart(3, '0')}.jpg`;
    };

    const images: HTMLImageElement[] = [];
    const seq = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    let currentLayout = { x: 0, y: 0, w: 0, h: 0 };

    const render = () => {
      const frameIndex = Math.min(Math.round(seq.frame), frameCount - 1);
      const img = images[frameIndex];

      if (img && img.complete) {
        const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * ratio) / 2;
        const y = (canvas.height - img.height * ratio) / 2;
        currentLayout = { x, y, w: img.width * ratio, h: img.height * ratio };
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, img.width, img.height, x, y, currentLayout.w, currentLayout.h);
      }
    };

    images[0].onload = render;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    window.addEventListener('resize', resize);
    resize();

    const getHoveredLink = (e: MouseEvent) => {
      const { x, y, w, h } = currentLayout;
      if (w === 0 || h === 0) return null;
      const px = (e.clientX - x) / w;
      const py = (e.clientY - y) / h;

      if (seq.frame >= frameCount - 10) {
        if (py >= 0.40 && py <= 0.95) {
          if (px >= 0.15 && px <= 0.33) return 'https://github.com/Mouli24';
          if (px > 0.33 && px <= 0.49) return 'https://www.linkedin.com/in/mouli-lohani-9a0032363/';
          if (px > 0.49 && px <= 0.65) return 'https://discord.com/channels/@me';
          if (px > 0.65 && px <= 0.85) return 'mailto:moulylohani@gmail.com';
        }
        return null;
      }

      if (py >= 0.05 && py <= 0.48) {
        if (px >= 0.05 && px <= 0.30) return 'https://github.com/Mouli24/weather-harvester-project';
        if (px > 0.35 && px <= 0.65) return 'https://github.com/Mouli24/broken-codebase-env';
        if (px > 0.70 && px <= 0.95) return 'https://github.com/Mouli24/Vyavan';
      } else if (py > 0.50 && py <= 0.90) {
        if (px >= 0.05 && px <= 0.30) return 'https://github.com/Mouli24/-Sustainable-Food-Tracker-';
      }

      return null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      canvas.style.cursor = getHoveredLink(e) ? 'pointer' : 'default';
    };

    const handleClick = (e: MouseEvent) => {
      const link = getHoveredLink(e);
      if (link) {
        if (link.startsWith('mailto:')) {
          window.location.href = link;
        } else {
          window.open(link, '_blank', 'noopener,noreferrer');
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    const anim = gsap.to(seq, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: 1.5,
        pin: true,
      },
      onUpdate: render,
    });

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      anim.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full relative bg-black overflow-hidden font-sans">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
    </section>
  );
}
