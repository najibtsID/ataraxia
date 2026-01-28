import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// simple global animation triggers: site-loaded for initial entrance and IntersectionObserver for scroll reveals
if(typeof window !== 'undefined'){
  window.addEventListener('load', ()=>{
    // set per-element order for stagger
    document.querySelectorAll('.reveal-on-load').forEach((el, i)=> el.style.setProperty('--reveal-order', i));
    // add class to trigger CSS animation
    document.body.classList.add('site-loaded');
  });

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in-view'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

  // observe elements with reveal-on-scroll
  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('.reveal-on-scroll').forEach(el => io.observe(el));

    // add small click animation for buttons (works for mouse/touch/keyboard-triggered clicks)
    document.addEventListener('pointerdown', (ev)=>{
      const btn = ev.target.closest && ev.target.closest('.btn');
      if(!btn) return;
      btn.classList.add('btn-pressed');
      setTimeout(()=> btn.classList.remove('btn-pressed'), 220);
    });

    // keyboard activation (Enter/Space) — add a tiny pressed state for accessibility feedback
    document.addEventListener('keydown', (ev)=>{
      if(ev.key !== 'Enter' && ev.key !== ' ' && ev.key !== 'Spacebar') return;
      const active = document.activeElement?.closest && document.activeElement.closest('.btn');
      if(active){
        active.classList.add('btn-pressed');
        setTimeout(()=> active.classList.remove('btn-pressed'), 220);
      }
    });
  });
}
