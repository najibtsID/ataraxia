import React from 'react';
import useInView from '../hooks/useInView';

export default function Why(){
  const [ref, inView] = useInView();
  return (
    <section id="why" className={`why reveal-on-load reveal-on-scroll ${inView ? 'in-view' : ''}`} ref={ref}>
      <div className="container">
        <h2>Kenapa Ataraxia?</h2>
        <div className="section-tag">Attention • Interest</div> 
        <div className="why-grid">
          <div className={`card`}> 
            <i className="fas fa-mug-hot fa-2x"></i>
            <h3>Karakter Unik</h3>
            <p>Blend dan roast yang berani untuk pengalaman rasa berbeda setiap tegukan.</p>
          </div>
          <div className={`card`}> 
            <i className="fas fa-seedling fa-2x"></i>
            <h3>Asal Terpercaya</h3>
            <p>Bijinya dipilih dari petani yang menjaga kualitas dan keberlanjutan.</p>
          </div>
          <div className={`card`}> 
            <i className="fas fa-star fa-2x"></i>
            <h3>Kualitas Premium</h3>
            <p>Proses seleksi dan roast ketat untuk setiap batch.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
