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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    window.addEventListener('resize', resize);
    resize();

    const getHoveredLink = (e: MouseEvent) => {
      if (seq.frame < frameCount - 10) return null; // Only active at the end of the scroll
      
      const { x, y, w, h } = currentLayout;
      if (w === 0 || h === 0) return null;
      
      const px = (e.clientX - x) / w;
      const py = (e.clientY - y) / h;
      
      if (py >= 0.40 && py <= 0.95) {
        if (px >= 0.15 && px <= 0.33) return 'https://github.com/Mouli24';
        if (px > 0.33 && px <= 0.49) return 'https://www.linkedin.com/in/mouli-lohani-9a0032363/';
        if (px > 0.49 && px <= 0.65) return 'https://discord.com/channels/@me';
        if (px > 0.65 && px <= 0.85) return 'mailto:moulylohani@gmail.com';
      }
      return null;
    };

    const handleMouseMove = (e: MouseEvent) => {
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
      onUpdate: () => {
        render();
        const p = seq.frame / frameCount;
        const grid = document.getElementById('project-grid-overlay');
        if (grid && canvas) {
          if (p > 0.25 && p < 0.85) {
            gsap.to(grid, { opacity: 1, duration: 0.5, pointerEvents: 'auto' });
            gsap.to(canvas, { filter: 'blur(12px) brightness(0.4)', duration: 0.5 });
          } else {
            gsap.to(grid, { opacity: 0, duration: 0.5, pointerEvents: 'none' });
            gsap.to(canvas, { filter: 'blur(0px) brightness(1)', duration: 0.5 });
          }
        }
      },
    });

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      anim.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const projects = [
    { name: "Weather Harvester", desc: "CLI tool for fetching weather data, caching and alerts", url: "https://github.com/Mouli24/weather-harvester-project" },
    { name: "Broken Codebase Env", desc: "OpenEnv environment where an AI agent debugs and fixes Python code", url: "https://github.com/Mouli24/broken-codebase-env" },
    { name: "Vyavan", desc: "SaaS product that helps B2B factories manage orders, track inventory, and communicate", url: "https://github.com/Mouli24/Vyavan" },
    { name: "Sustainable Food Tracker", desc: "Checks the sustainability, nutrition value, and eco-impact using OpenFoodFacts API", url: "https://github.com/Mouli24/-Sustainable-Food-Tracker-" }
  ];

  return (
    <section ref={containerRef} className="h-screen w-full relative bg-black overflow-hidden font-sans">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
      
      {/* Dynamic GSAP Overlay Grid */}
      <div id="project-grid-overlay" className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          {projects.map((proj, i) => (
            <a 
              key={i} 
              href={proj.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative bg-white/5 hover:bg-white/10 border border-white/20 p-8 rounded-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300 mb-3">{proj.name}</h3>
                <p className="text-zinc-300 leading-relaxed text-sm">{proj.desc}</p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 group-hover:text-blue-300 flex items-center gap-2">
                  View Source <span className="text-lg">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
