import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// ─── Frame sequence ───────────────────────────────────────────────────────────
const SEGMENTS = [
  { folder: 'HEROS1', base: 'm1 (online-video-cutter.com)' },
  { folder: 'heros',  base: 'm2 (online-video-cutter.com) (2)' },
  { folder: 'HEROS3', base: 'm3' },
  { folder: 'HEROS2', base: 'm4 (online-video-cutter.com)' },
  { folder: 'HEROS4', base: 'm5' },
];
const FRAMES_PER_SEGMENT = 82;

const FRAMES: string[] = [];
for (const { folder, base } of SEGMENTS) {
  for (let i = 0; i < FRAMES_PER_SEGMENT; i++) {
    const file = `${base}_${i.toString().padStart(3, '0')}.png`;
    FRAMES.push(`/${folder.replace(/ /g,'%20')}/${file.replace(/ /g,'%20')}`);
  }
}
const TOTAL       = FRAMES.length; // 410
const SCROLL_ZONE = TOTAL * 8;     // 3280px

// Frame ranges
const HEROS4_START  = 4 * FRAMES_PER_SEGMENT;       // 328 — social icon hotspots
const CARDS_START   = 2 * FRAMES_PER_SEGMENT + 77;  // 241 — project cards start (m3_077)
const CARDS_END     = 3 * FRAMES_PER_SEGMENT + 16;  // 262 — project cards end   (m4_016)

// ─── Projects ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  { name: 'Vyawan',                   href: 'https://github.com/Mouli24/Vyavan',                    img: '/projects/vyawan.png',        tech: ['React', 'TypeScript'],  pos: { top: '5vh',  left: '3vw',  rotate: -2, scale: 1    } },
  { name: 'EMOS',                     href: 'https://github.com/Mouli24/EMOS',                      img: '/projects/ai voice.png',      tech: ['Python', 'TensorFlow'], pos: { top: '4vh',  left: '21vw', rotate: 2,  scale: 0.92 } },
  { name: 'Broken Codebase Env',      href: 'https://github.com/Mouli24/broken-codebase-env',       img: '/projects/open env.jpg',      tech: ['Python', 'Shell'],      pos: { top: '37vh', left: '2vw',  rotate: -1, scale: 0.95 } },
  { name: 'Sustainable Food Tracker', href: 'https://github.com/Mouli24/-Sustainable-Food-Tracker-', img: '/projects/sustiinable .png', tech: ['React', 'Node.js'],     pos: { top: '35vh', left: '20vw', rotate: 3,  scale: 0.88 } },
  { name: 'Weather Harvester',        href: 'https://github.com/Mouli24/weather-harvester-project',  img: '/projects/cli.png',          tech: ['Python', 'API'],        pos: { top: '66vh', left: '9vw',  rotate: -2, scale: 0.9  } },
];

// ─── Social links ─────────────────────────────────────────────────────────────
const SOCIALS = [
  {
    label: 'GitHub', href: 'https://github.com/Mouli24',
    color: '#ffffff', glow: 'rgba(255,255,255,0.3)',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  },
  {
    label: 'LinkedIn', href: 'https://www.linkedin.com/in/mouli-lohani-9a0032363/',
    color: '#0a66c2', glow: 'rgba(10,102,194,0.4)',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
  },
  {
    label: 'Discord', href: 'https://discord.com/users/moulilohani_08174',
    color: '#5865f2', glow: 'rgba(88,101,242,0.4)',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>,
  },
  {
    label: 'Email', href: 'mailto:moulylohani@gmail.com',
    color: '#ea4335', glow: 'rgba(234,67,53,0.4)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  },
];

// ─── HEROS4 hotspots ──────────────────────────────────────────────────────────
const HOTSPOTS = [
  { href: 'https://github.com/Mouli24',                          label: 'GitHub',   left: '5%',  width: '18%' },
  { href: 'https://www.linkedin.com/in/mouli-lohani-9a0032363/', label: 'LinkedIn', left: '28%', width: '18%' },
  { href: 'https://discord.com/users/moulilohani_08174',         label: 'Discord',  left: '50%', width: '18%' },
  { href: 'mailto:moulylohani@gmail.com',                        label: 'Email',    left: '72%', width: '26%' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const images     = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL).fill(null));
  const loaded     = useRef<boolean[]>(new Array(TOTAL).fill(false));
  const frameIndex = useRef(0);
  const rafId      = useRef<number | null>(null);

  const [visible,       setVisible]       = useState(true);
  const [currentFrame,  setCurrentFrame]  = useState(0);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext('2d')!;

    const setSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width  = window.innerWidth  + 'px';
      canvas.style.height = window.innerHeight + 'px';
      draw(frameIndex.current);
    };

    const draw = (idx: number) => {
      let t = idx;
      if (!loaded.current[t]) {
        for (let d = 1; d < 10; d++) {
          if (t - d >= 0 && loaded.current[t - d]) { t = t - d; break; }
          if (t + d < TOTAL && loaded.current[t + d]) { t = t + d; break; }
        }
        if (!loaded.current[t]) return;
      }
      const img = images.current[t];
      if (!img) return;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      if (!iw || !ih) return;
      const cw = canvas.width, ch = canvas.height;
      const scale = Math.max(cw / iw, ch / ih);
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - iw * scale) / 2, (ch - ih * scale) / 2, iw * scale, ih * scale);
    };

    const onScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const rect  = wrapper.getBoundingClientRect();
        const isVis = rect.top < window.innerHeight && rect.bottom > 0;
        setVisible(isVis);
        canvas.style.display = isVis ? 'block' : 'none';
        if (!isVis) return;
        const progress = Math.min(Math.max(-rect.top, 0) / (SCROLL_ZONE - window.innerHeight), 1);
        const f = Math.round(progress * (TOTAL - 1));
        if (f !== frameIndex.current) {
          frameIndex.current = f;
          setCurrentFrame(f);
          draw(f);
        }
      });
    };

    const loadFrame = (i: number) => {
      const img = new Image();
      img.onload = () => { loaded.current[i] = true; if (i === frameIndex.current) draw(i); };
      img.onerror = () => { if (i % FRAMES_PER_SEGMENT === 0) console.error(`Failed: ${FRAMES[i]}`); };
      img.src = FRAMES[i];
      images.current[i] = img;
    };

    loadFrame(0);
    for (let i = 1; i < TOTAL; i++) loadFrame(i);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', setSize);
    setSize();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setSize);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const showCards    = visible && currentFrame >= CARDS_START && currentFrame <= CARDS_END;
  const showHotspots = visible && currentFrame >= HEROS4_START;

  return (
    <div ref={wrapperRef} style={{ height: SCROLL_ZONE, position: 'relative' }}>

      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, display: 'block', background: '#000', zIndex: 1, pointerEvents: 'none' }} />

      {/* ── Scattered project cards ── */}
      {showCards && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
          {PROJECTS.map(({ name, href, img, tech, pos }) => (
            <motion.a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: pos.scale * 1.06, y: -6 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                width: '16vw',
                display: 'block',
                textDecoration: 'none',
                borderRadius: '0.8vw',
                overflow: 'hidden',
                background: 'rgba(0,8,20,0.92)',
                cursor: 'pointer',
                pointerEvents: 'all',
                transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
                transformOrigin: 'center center',
                boxShadow: '0 0 0 1.5px rgba(0,220,255,0.5), 0 0 20px rgba(0,220,255,0.2), 0 8px 32px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(0,8,20,0.9) 100%)' }} />
                <div style={{ position: 'absolute', top: '6%', right: '5%', width: '0.5vw', height: '0.5vw', borderRadius: '50%', background: '#00dcff', boxShadow: '0 0 6px #00dcff, 0 0 14px #00dcff' }} />
              </div>
              <div style={{ padding: '0.4vw 0.6vw 0.55vw' }}>
                <div style={{ fontSize: '0.7vw', fontWeight: 900, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.3vw', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textShadow: '0 0 8px rgba(0,220,255,0.4)' }}>
                  {name}
                </div>
                <div style={{ display: 'flex', gap: '0.3vw', flexWrap: 'wrap' }}>
                  {tech.map(t => (
                    <span key={t} style={{ fontSize: '0.5vw', fontWeight: 700, padding: '0.15vw 0.5vw', borderRadius: '1vw', background: 'rgba(0,220,255,0.1)', border: '1px solid rgba(0,220,255,0.4)', color: '#00dcff', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}

      {/* ── HEROS4 hotspots ── */}
      {showHotspots && HOTSPOTS.map(({ href, label, left, width }) => (
        <a key={label} href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          title={label}
          style={{ position: 'fixed', top: '10%', left, width, height: '80%', zIndex: 5, cursor: 'pointer', display: 'block' }}
        />
      ))}

      {/* ── Social bar ── */}
      {visible && (
        <div style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 12, zIndex: 10 }}>
          {SOCIALS.map(({ label, href, color, glow, icon }) => {
            const isHov = hoveredSocial === label;
            return (
              <a key={label} href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                onMouseEnter={() => setHoveredSocial(label)} onMouseLeave={() => setHoveredSocial(null)} title={label}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 48, height: 48, borderRadius: 13,
                  background: isHov ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.6)',
                  border: `1.5px solid ${isHov ? color : 'rgba(255,255,255,0.18)'}`,
                  color: isHov ? color : 'rgba(255,255,255,0.65)',
                  backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                  boxShadow: isHov ? `0 0 22px ${glow}` : '0 2px 8px rgba(0,0,0,0.4)',
                  transform: isHov ? 'translateY(-5px)' : 'translateY(0)',
                  transition: 'all 0.2s ease', cursor: 'pointer', textDecoration: 'none',
                }}
              >
                {icon}
              </a>
            );
          })}
        </div>
      )}

      {/* ── Scroll hint ── */}
      {visible && currentFrame < 20 && (
        <div style={{ position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, pointerEvents: 'none', zIndex: 10 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 28, background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }} />
        </div>
      )}

    </div>
  );
}
