import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function ProductModal({ product, onClose, waNumber }){
  // modal is centered by default on all screens
  const [centered, setCentered] = useState(true);

  useEffect(()=>{
    // keep Escape key close handler
    function onKey(e){ if(e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);

    return ()=>{ window.removeEventListener('keydown', onKey); }
  }, [onClose]);

  useEffect(()=>{
    if(centered){
      // lock background scroll while centered modal is open
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return ()=>{ document.body.style.overflow = prev };
    }
    return undefined;
  }, [centered]);

  if(!product) return null;

  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Halo, saya mau beli *${product.name}*`)}`;

  const modal = (
    <div className={`modal-overlay${centered ? ' dark-backdrop centered' : ''}`} role="dialog" aria-modal="true" aria-label={`Info ${product.name}`} onClick={(e)=>{ if(e.target === e.currentTarget) onClose(); }}>
      <div className={`modal ${centered ? 'no-scroll-mobile centered' : ''}`}>
        <header className="modal-header">
          <h3>{product.name}</h3>
          <button className="modal-close" aria-label="Tutup" onClick={onClose}>✕</button>
        </header>

        <div className="modal-body">
          {/* Show meta only when not centered (kept for backward compatibility) */}
          {!centered && (
            <div className="modal-meta">
              <div className="meta-item"><strong>Kategori:</strong><span>{product.category}</span></div>
              <div className="meta-item"><strong>Harga:</strong><span>Rp {product.price}</span></div>
            </div>
          )}

          <div className="modal-desc">
            {typeof product.description === 'string' ? (
              <p>{product.description}</p>
            ) : (
              documentToReactComponents(product.description)
            )}
          </div>
        </div>

        <footer className="modal-actions">
          <a className="btn primary" href={waLink}>Pesan via WhatsApp <i className="fab fa-whatsapp" aria-hidden></i></a>
          <button className="btn ghost" onClick={onClose}>Tutup</button>
        </footer>
      </div>
    </div>
  );

  // Ensure portal target exists (avoid SSR mismatch)
  if(typeof document === 'undefined') return modal;
  return createPortal(modal, document.body);
}