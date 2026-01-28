import React from 'react';
import useInView from '../hooks/useInView';
import avatar1 from '../assets/review1.svg';
import avatar2 from '../assets/review2.svg';

export default function SocialProof(){
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className={`social container reveal-on-load reveal-on-scroll ${inView ? 'in-view' : ''}`}>
      <h3>Ulasan Pelanggan</h3>
      <div className="reviews">
        <blockquote>
          <div className="review-head">
            <img src={avatar1} alt="Dwi" className="avatar" />
            <strong>Dwi</strong>
          </div>
          <p>“Rasa yang kuat dan kompleks—kopi berkarakter sejati.”</p>
        </blockquote>
        <blockquote>
          <div className="review-head">
            <img src={avatar2} alt="Rina" className="avatar" />
            <strong>Rina</strong>
          </div>
          <p>“Kualitas premium, dikemas rapi dan sampai cepat.”</p>
        </blockquote>
      </div>
    </section>
  );
}
