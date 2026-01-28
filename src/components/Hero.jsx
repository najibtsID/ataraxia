import React, { useEffect, useState } from 'react';
import useInView from '../hooks/useInView';
import placeholder from '../assets/product-placeholder.svg';

const waLink = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo Ataraxia, saya tertarik dengan kopi Anda!')}`;

export default function Hero(){
  const [ref, inView] = useInView({ once: true });
  const [logoSrc, setLogoSrc] = useState(placeholder);

  useEffect(()=>{
    // prefer a PNG placed in `public/images/coffee-logo.png` or `public/assets/coffee-logo.png`
    const candidates = ['/images/coffee-logo.png', '/assets/coffee-logo.png'];
    let mounted = true;
    const tryLoad = (idx)=>{
      if(idx >= candidates.length) return;
      const url = candidates[idx];
      const img = new Image();
      img.onload = ()=>{ if(mounted) setLogoSrc(url) };
      img.onerror = ()=> tryLoad(idx+1);
      img.src = url;
    };
    tryLoad(0);
    return ()=>{ mounted = false };
  }, []);

  return (
    <section ref={ref} className={`hero reveal-on-load reveal-on-scroll ${inView ? 'in-view' : ''}`}>
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1>Ataraxia — Kopi dengan Karakter</h1>
          <p className="lead">Rasakan sensasi kopi yang berani dan berbeda—setiap cangkir punya cerita. Siap untuk menemukan rasa yang menempel di ingatan?</p>
          <div className="hero-actions">
            <a className="btn primary large" href={waLink}>Beli Sekarang</a>
            <a className="btn ghost" href="#why">Kenapa Kami?</a>
          </div>
        </div>
        <div className="hero-art center" aria-hidden>
          <div className="logo-box">
            <img src={logoSrc} alt="Ataraxia" className="hero-logo" />
          </div>
        </div>    
      </div>
    </section>
  );
}
