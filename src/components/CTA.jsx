import React from 'react';
import useInView from '../hooks/useInView';

const wa = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo Ataraxia, saya mau pesan sekarang!')}`;

export default function CTA(){
  const [ref, inView] = useInView({ once: true });
  return (
    <section ref={ref} className={`cta ${inView ? 'in-view' : ''}`}>
      <div className="cta-inner container">
        <h2>Siap mencicipi karakter kopi kami?</h2>
        <div className="cta-tag">Desire • Action</div>
        <a className="btn primary large" href={wa}>Pesan Sekarang via WhatsApp <i className="fab fa-whatsapp" aria-hidden></i></a>
      </div>
    </section>
  );
}
