import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { products } from "../lib/products";
import { useState, useEffect } from "react";

const heroSlides = [
  {
    img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imagen-main-1920-x-612-plantilla-gm-2110d.jpg?v=1780461205",
    title: "G-SHOCK",
    subtitle: "GM-2110D",
    desc: "La resistencia que desafía los límites",
    cta: "DESCUBRIR",
    href: "/categoria/g-shock",
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/casio-mx-1920x816-1_94e341d4-3e50-4431-86a6-a4d6a120933a.jpg?v=1780461205",
    title: "CASIO",
    subtitle: "OFFICIAL STORE",
    desc: "Distribuidor autorizado México",
    cta: "VER CATÁLOGO",
    href: "/categoria/todos",
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imgi_7_gmwbz5000rc-1920x612.jpg?v=1780461205",
    title: "FULL METAL",
    subtitle: "GMW-B5000",
    desc: "La cima de la ingeniería Casio",
    cta: "VER MODELO",
    href: "/categoria/g-shock",
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imgi_8_homepage-efk-110-pc.jpg?v=1780461205",
    title: "EDIFICE",
    subtitle: "EFK-110",
    desc: "Velocidad y elegancia en tu muñeca",
    cta: "EXPLORAR",
    href: "/categoria/premium",
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imgi_9_aq-240e.jpg?v=1780461205",
    title: "VINTAGE",
    subtitle: "AQ-240E",
    desc: "Un clásico atemporal reinventado",
    cta: "VER VINTAGE",
    href: "/categoria/vintage",
  },
];

const categoryBanners = [
  {
    img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imgi_7_gmwbz5000rc-1920x612.jpg?v=1780461205",
    label: "G-SHOCK",
    href: "/categoria/g-shock",
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imgi_8_homepage-efk-110-pc.jpg?v=1780461205",
    label: "COLECCIÓN",
    href: "/categoria/collection",
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imagen-main-1920-x-816-plantilla-toms.jpg?v=1780461206",
    label: "PREMIUM",
    href: "/categoria/premium",
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imgi_9_aq-240e.jpg?v=1780461205",
    label: "VINTAGE",
    href: "/categoria/vintage",
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imgi_5_nk-1920-612-c.jpg?v=1780461206",
    label: "MUJER",
    href: "/categoria/mujer",
  },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => goToSlide((slide + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, [slide]);

  const goToSlide = (n) => {
    setAnimating(true);
    setTimeout(() => {
      setSlide(n);
      setAnimating(false);
    }, 400);
  };

  const featuredProducts = products.slice(0, 8);

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* HERO SLIDER */}
      <section className="hero">
        <div className={`hero-slide ${animating ? "fade-out" : "fade-in"}`}>
          <img
            src={heroSlides[slide].img}
            alt={heroSlides[slide].title}
            className="hero-img"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-sub">{heroSlides[slide].subtitle}</p>
            <h1 className="hero-title">{heroSlides[slide].title}</h1>
            <p className="hero-desc">{heroSlides[slide].desc}</p>
            <Link href={heroSlides[slide].href} className="hero-cta">
              {heroSlides[slide].cta}
              <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Dots */}
        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === slide ? "active" : ""}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>

        {/* Arrows */}
        <button className="hero-arrow left" onClick={() => goToSlide((slide - 1 + heroSlides.length) % heroSlides.length)}>‹</button>
        <button className="hero-arrow right" onClick={() => goToSlide((slide + 1) % heroSlides.length)}>›</button>
      </section>

      {/* ANNOUNCE */}
      <div className="announce">
        <span>¡Envío gratis en pedidos a partir de $499 MXN!</span>
        <span className="sep">|</span>
        <span>Relojes 100% originales · Distribuidor Autorizado</span>
        <span className="sep">|</span>
        <span>12 meses sin intereses con Mercado Pago</span>
      </div>

      {/* CATEGORY TILES */}
      <section className="cat-section">
        <div className="section-title-row">
          <h2>COMPRAR POR CATEGORÍA</h2>
        </div>
        <div className="cat-grid">
          {categoryBanners.map((c) => (
            <Link key={c.label} href={c.href} className="cat-tile">
              <img src={c.img} alt={c.label} />
              <div className="cat-overlay">
                <span>{c.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FULL WIDTH BANNER */}
      <section className="full-banner">
        <img
          src="https://cdn.shopify.com/s/files/1/0659/7938/3871/files/casio-mx-1920x816-1_94e341d4-3e50-4431-86a6-a4d6a120933a.jpg?v=1780461205"
          alt="Casio Mexico"
        />
        <div className="full-banner-content">
          <p className="full-banner-eyebrow">DISTRIBUIDOR OFICIAL</p>
          <h2>EL TIEMPO ES TUYO</h2>
          <p>Más de 50 modelos disponibles con envío a todo México</p>
          <Link href="/categoria/todos" className="btn-white">VER TODOS LOS RELOJES</Link>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="products-section">
        <div className="section-title-row">
          <h2>NUEVOS PRODUCTOS</h2>
          <Link href="/categoria/todos" className="ver-todo">Ver todos →</Link>
        </div>
        <div className="products-grid">
          {featuredProducts.map((p) => (
            <div key={p.id} className="product-card">
              <Link href={`/producto/${p.slug}`} className="product-img-wrap">
                {p.tag && <span className="p-tag">{p.tag}</span>}
                <img src={p.images[0]} alt={p.name} />
              </Link>
              <div className="product-info">
                <span className="p-category">{p.category}</span>
                <Link href={`/producto/${p.slug}`}>
                  <h3>{p.name}</h3>
                </Link>
                <div className="p-bottom">
                  <span className="p-price">
                    ${p.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN
                  </span>
                  <Link href={`/checkout?product=${p.slug}`} className="p-buy-btn">
                    COMPRAR
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPLIT BANNER */}
      <section className="split-banner">
        <div className="split-item">
          <img src="https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imgi_7_gmwbz5000rc-1920x612.jpg?v=1780461205" alt="G-Shock" />
          <div className="split-content">
            <span>G-SHOCK</span>
            <h3>RESISTENCIA EXTREMA</h3>
            <Link href="/categoria/g-shock">EXPLORAR →</Link>
          </div>
        </div>
        <div className="split-item">
          <img src="https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imagen-main-1920-x-816-plantilla-toms.jpg?v=1780461206" alt="Relojes" />
          <div className="split-content">
            <span>COLECCIÓN</span>
            <h3>ELEGANCIA ATEMPORAL</h3>
            <Link href="/categoria/collection">EXPLORAR →</Link>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust">
        <div className="trust-inner">
          {[
            { icon: "✓", t: "100% ORIGINALES", d: "Certificado de autenticidad Casio" },
            { icon: "🛡", t: "GARANTÍA OFICIAL", d: "1 año de garantía de fábrica" },
            { icon: "🚚", t: "ENVÍO RÁPIDO", d: "2-5 días hábiles a todo México" },
            { icon: "💳", t: "PAGO SEGURO", d: "Mercado Pago · 12 MSI" },
          ].map((item) => (
            <div key={item.t} className="trust-item">
              <span className="trust-icon">{item.icon}</span>
              <strong>{item.t}</strong>
              <p>{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        /* HERO */
        .hero {
          position: relative;
          width: 100%;
          height: 90vh;
          min-height: 500px;
          overflow: hidden;
          background: #000;
        }
        .hero-slide {
          position: absolute;
          inset: 0;
          transition: opacity 0.4s ease;
        }
        .fade-out { opacity: 0; }
        .fade-in { opacity: 1; }
        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.75) 0%,
            rgba(0,0,0,0.3) 50%,
            rgba(0,0,0,0.1) 100%
          );
        }
        .hero-content {
          position: absolute;
          bottom: 15%;
          left: 8%;
          max-width: 500px;
          z-index: 10;
        }
        .hero-sub {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.3em;
          color: #e8001a;
          text-transform: uppercase;
          margin-bottom: 0.8rem;
        }
        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 8vw, 7rem);
          color: #fff;
          line-height: 0.9;
          margin-bottom: 1rem;
          letter-spacing: 0.02em;
        }
        .hero-desc {
          font-size: 1rem;
          color: rgba(255,255,255,0.7);
          margin-bottom: 2rem;
          font-weight: 300;
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: #e8001a;
          color: #fff;
          padding: 0.9rem 2.2rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.2em;
          text-decoration: none;
          transition: all 0.25s;
        }
        .hero-cta:hover {
          background: #fff;
          color: #000;
        }
        .cta-arrow { font-size: 1.2rem; transition: transform 0.2s; }
        .hero-cta:hover .cta-arrow { transform: translateX(4px); }
        .hero-dots {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 10;
        }
        .dot {
          width: 28px;
          height: 3px;
          background: rgba(255,255,255,0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }
        .dot.active { background: #e8001a; width: 44px; }
        .hero-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          font-size: 2rem;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.2s;
          line-height: 1;
        }
        .hero-arrow:hover { background: #e8001a; border-color: #e8001a; }
        .hero-arrow.left { left: 2rem; }
        .hero-arrow.right { right: 2rem; }

        /* ANNOUNCE */
        .announce {
          background: #111;
          border-bottom: 1px solid #1a1a1a;
          padding: 0.8rem 2rem;
          text-align: center;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          color: #999;
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .sep { color: #333; }

        /* CATEGORIES */
        .cat-section {
          max-width: 1600px;
          margin: 0 auto;
          padding: 5rem 2rem 0;
        }
        .section-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #1a1a1a;
        }
        .section-title-row h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 0.15em;
          color: #fff;
        }
        .ver-todo {
          font-size: 0.8rem;
          color: #666;
          text-decoration: none;
          letter-spacing: 0.1em;
          transition: color 0.2s;
        }
        .ver-todo:hover { color: #e8001a; }
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2px;
          background: #000;
        }
        .cat-tile {
          display: block;
          position: relative;
          aspect-ratio: 2/3;
          overflow: hidden;
          background: #111;
        }
        .cat-tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          filter: brightness(0.75);
        }
        .cat-tile:hover img {
          transform: scale(1.06);
          filter: brightness(0.9);
        }
        .cat-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding: 1.5rem 1.2rem;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
        }
        .cat-overlay span {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem;
          letter-spacing: 0.12em;
          color: #fff;
        }
        .cat-tile:hover .cat-overlay { border-bottom: 3px solid #e8001a; }

        /* FULL BANNER */
        .full-banner {
          margin-top: 5rem;
          position: relative;
          height: 500px;
          overflow: hidden;
        }
        .full-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(0.5);
        }
        .full-banner-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .full-banner-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.35em;
          color: #e8001a;
          margin-bottom: 1rem;
        }
        .full-banner-content h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 7vw, 6rem);
          color: #fff;
          letter-spacing: 0.08em;
          margin-bottom: 1rem;
          line-height: 1;
        }
        .full-banner-content p {
          color: rgba(255,255,255,0.6);
          font-size: 0.95rem;
          margin-bottom: 2.5rem;
        }
        .btn-white {
          background: #fff;
          color: #000;
          padding: 0.9rem 2.5rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem;
          letter-spacing: 0.2em;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-white:hover { background: #e8001a; color: #fff; }

        /* PRODUCTS */
        .products-section {
          max-width: 1600px;
          margin: 0 auto;
          padding: 5rem 2rem 0;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          background: #0a0a0a;
        }
        .product-card {
          background: #0d0d0d;
          transition: background 0.3s;
        }
        .product-card:hover { background: #111; }
        .product-img-wrap {
          display: block;
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          background: #141414;
        }
        .product-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .product-card:hover .product-img-wrap img {
          transform: scale(1.04);
        }
        .p-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          background: #e8001a;
          color: #fff;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 0.3rem 0.7rem;
          z-index: 2;
          text-transform: uppercase;
        }
        .product-info {
          padding: 1.4rem 1.4rem 1.6rem;
        }
        .p-category {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          color: #e8001a;
          text-transform: uppercase;
          font-family: 'Barlow Condensed', sans-serif;
          display: block;
          margin-bottom: 0.4rem;
        }
        .product-info h3 {
          font-size: 0.88rem;
          font-weight: 400;
          color: #bbb;
          margin: 0 0 1.2rem;
          line-height: 1.4;
          min-height: 2.4em;
        }
        .product-info h3:hover { color: #fff; }
        .p-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
        }
        .p-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.15rem;
          color: #fff;
          letter-spacing: 0.04em;
        }
        .p-buy-btn {
          background: #e8001a;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.15em;
          padding: 0.45rem 1rem;
          text-decoration: none;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .p-buy-btn:hover { background: #c0001a; }

        /* SPLIT BANNER */
        .split-banner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          margin-top: 5rem;
          background: #000;
        }
        .split-item {
          position: relative;
          height: 420px;
          overflow: hidden;
        }
        .split-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          filter: brightness(0.5);
        }
        .split-item:hover img {
          transform: scale(1.04);
          filter: brightness(0.65);
        }
        .split-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2.5rem;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
        }
        .split-content span {
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          color: #e8001a;
          font-family: 'Barlow Condensed', sans-serif;
          display: block;
          margin-bottom: 0.5rem;
        }
        .split-content h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          color: #fff;
          letter-spacing: 0.08em;
          margin-bottom: 1.2rem;
        }
        .split-content a {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.2em;
          color: #fff;
          text-decoration: none;
          border-bottom: 1px solid #e8001a;
          padding-bottom: 2px;
          transition: color 0.2s;
        }
        .split-content a:hover { color: #e8001a; }

        /* TRUST */
        .trust {
          background: #080808;
          border-top: 1px solid #111;
          border-bottom: 1px solid #111;
          margin-top: 5rem;
        }
        .trust-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3.5rem 2rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        .trust-item {
          text-align: center;
          padding: 0.5rem;
        }
        .trust-icon {
          font-size: 2rem;
          display: block;
          margin-bottom: 0.8rem;
        }
        .trust-item strong {
          display: block;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          color: #fff;
          margin-bottom: 0.4rem;
        }
        .trust-item p {
          font-size: 0.78rem;
          color: #555;
          line-height: 1.5;
        }

        @media (max-width: 1200px) {
          .products-grid { grid-template-columns: repeat(3, 1fr); }
          .cat-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .hero { height: 70vh; }
          .products-grid { grid-template-columns: repeat(2, 1fr); }
          .cat-grid { grid-template-columns: repeat(2, 1fr); }
          .trust-inner { grid-template-columns: repeat(2, 1fr); }
          .split-banner { grid-template-columns: 1fr; }
          .hero-arrow { display: none; }
          .announce { gap: 0.8rem; }
          .sep { display: none; }
        }
      `}</style>
    </div>
  );
}
