import React from 'react';
import Hero from './components/Hero';
import Why from './components/Why';
import ProductList from './components/ProductList';
import CTA from './components/CTA';
import SocialProof from './components/SocialProof';

export default function App() {
  return (
    <div className="app">
      <Hero />
      <Why />
      <ProductList />
      <CTA />
      <SocialProof />
      <footer className="footer">© Ataraxia Coffee — Crafted with character</footer>
    </div>
  );
}
