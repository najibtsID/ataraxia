import React, { useEffect, useState } from "react";
import { fetchCoffees } from "../contentfulClient";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import useInView from "../hooks/useInView";
import ProductModal from "./ProductModal";
import placeholder from "../assets/product-placeholder.svg";

export default function ProductList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [ref, inView] = useInView();

  // simple scroll slider (no external deps)
  const scrollerRef = React.useRef(null);
  function scrollBy(offset) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, top: 0, behavior: "smooth" });
  }
  function next() {
    const el = scrollerRef.current;
    if (!el) return;
    scrollBy(el.clientWidth * 0.8);
  }
  function prev() {
    const el = scrollerRef.current;
    if (!el) return;
    scrollBy(-el.clientWidth * 0.8);
  }

  useEffect(() => {
    fetchCoffees()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // track active slide for dots
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = null;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const children = Array.from(el.children);
        const scrollLeft = el.scrollLeft;
        let closest = 0;
        let minD = Infinity;
        children.forEach((ch, i) => {
          const d = Math.abs(ch.offsetLeft - scrollLeft);
          if (d < minD) {
            minD = d;
            closest = i;
          }
        });
        setActive(closest);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const [active, setActive] = useState(0);
  const [openProduct, setOpenProduct] = useState(null);

  // scroll to a slide index
  function goTo(i) {
    const el = scrollerRef.current;
    const ch = el?.children?.[i];
    if (ch) el.scrollTo({ left: ch.offsetLeft, behavior: "smooth" });
  }

  return (
    <section className="products container reveal-on-load reveal-on-scroll">
      <div className="slider-controls">
        <h2>Produk Unggulan</h2>
        <div>
          <button className="btn ghost" onClick={prev} aria-label="prev">
            ‹
          </button>
          <button className="btn ghost" onClick={next} aria-label="next">
            ›
          </button>
        </div>
      </div>
      {loading ? (
        <p>Memuat produk...</p>
      ) : (
        <div
          ref={ref}
          className={`product-grid scroller ${inView ? "in-view" : ""}`}
        >
          <div ref={scrollerRef} className="product-scroller">
            {items.map((p, idx) => (
              <article
                key={p.id}
                className={`product-card ${p.featured ? "featured" : ""}`}
              >
                <div className="img-wrap">
                  {/* choose contentful image; fallback to public /products/{index}.png; final fallback placeholder */}
                  <img
                    src={p.image || `/products/${idx + 1}.png`}
                    alt={p.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = placeholder;
                    }}
                  />
                  <div className="badge-price">Rp {p.price}</div>
                </div>
                <div className="product-body">
                  <h3>
                    {p.name} <span className="tag">{p.category}</span>
                  </h3>
                  <div className="desc">
                    {typeof p.description === "string"
                      ? p.description
                      : documentToReactComponents(p.description)}
                  </div>
                  <div className="meta"></div>
                  <button
                    className="btn primary no-border"
                    onClick={() => setOpenProduct(p)}
                    aria-haspopup="dialog"
                  >
                    Info Lengkap
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="slider-dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={i === active ? "active" : ""}
                onClick={() => goTo(i)}
                aria-label={`to ${i + 1}`}
              ></button>
            ))}
          </div>
        </div>
      )}

      {openProduct && (
        <ProductModal
          product={openProduct}
          onClose={() => setOpenProduct(null)}
          waNumber={waNumber}
        />
      )}
    </section>
  );
}
