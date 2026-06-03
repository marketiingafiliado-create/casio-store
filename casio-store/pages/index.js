import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import { products, categories } from "../lib/products";
import { useState } from "react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const featured = products.slice(0, 8);
  const filtered = activeCategory === "Todos"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="hero-eyebrow">DISTRIBUIDOR AUTORIZADO MÉXICO</p>
          <h1 className="hero-title">
            <span>CASIO</span>
            <span className="hero-title-sub">OFFICIAL STORE</span>
          </h1>
          <p className="hero-desc">Relojes originales con garantía. G-Shock, Edifice, Vintage y más.</p>
          <div className="hero-actions">
            <Link href="/categoria/todos" className="btn-primary">VER CATÁLOGO</Link>
            <Link href="/categoria/g-shock" className="btn-outline">G-SHOCK</Link>
          </div>
        </div>
        <div className="hero-watch">
          <img src="https://casio-mexico.myshopify.com/cdn/shop/files/imgi_91_s-l1600.jpg?v=1776182864&width=600" alt="Casio Watch" />
        </div>
        <div className="hero-scroll-line" />
      </section>

      {/* ANNOUNCEMENT BAR */}
      <div className="announce-bar">
        <span>🚀 Envío gratis en pedidos mayores a $499 MXN</span>
        <span>|</span>
        <span>✓ Relojes 100% originales con garantía</span>
        <span>|</span>
        <span>💳 12 meses sin intereses con Mercado Pago</span>
      </div>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="section-header">
          <h2>COMPRAR POR CATEGORÍA</h2>
        </div>
        <div className="categories-grid">
          {[
            { name: "G-SHOCK", desc: "Resistencia extrema", slug: "g-shock", img: "https://casio-mexico.myshopify.com/cdn/shop/files/WhatsAppImage2024-06-30at8.44.24PM_7f83e25f-9555-4019-9fbd-04ff925c723d.jpg?v=1776181534&width=600" },
            { name: "COLECCIÓN", desc: "Estilo y elegancia", slug: "collection", img: "https://casio-mexico.myshopify.com/cdn/shop/files/WhatsAppImage2024-06-30at9.50.47PM.jpg?v=1776181535&width=600" },
            { name: "PREMIUM", desc: "Alta relojería", slug: "premium", img: "https://casio-mexico.myshopify.com/cdn/shop/files/imgi_91_s-l1600.jpg?v=1776182864&width=600" },
            { name: "VINTAGE", desc: "Clásicos eternos", slug: "vintage", img: "https://casio-mexico.myshopify.com/cdn/shop/files/WhatsAppImage2024-06-30at8.44.02PM.jpg?v=1776181537&width=600" },
            { name: "MUJER", desc: "Diseños femeninos", slug: "mujer", img: "https://casio-mexico.myshopify.com/cdn/shop/files/WhatsAppImage2024-06-30at8.44.24PM_115fbad0-cc50-4cb3-ad83-57de4f6e18c7.jpg?v=1776181533&width=600" },
          ].map((cat) => (
            <Link key={cat.slug} href={`/categoria/${cat.slug}`} className="category-card">
              <img src={cat.img} alt={cat.name} />
              <div className="category-overlay">
                <span className="category-name">{cat.name}</span>
                <span className="category-desc">{cat.desc}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products-section">
        <div className="section-header">
          <h2>TODOS LOS RELOJES</h2>
          <div className="category-tabs">
            {["Todos", "G-SHOCK", "Collection", "Classic", "Vintage", "Mujer"].map((c) => (
              <button
                key={c}
                className={`tab-btn ${activeCategory === c ? "active" : ""}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="products-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="trust-section">
        <div className="trust-grid">
          {[
            { icon: "✓", title: "100% ORIGINALES", desc: "Relojes con certificado de autenticidad Casio" },
            { icon: "🛡", title: "GARANTÍA OFICIAL", desc: "1 año de garantía de fábrica en todos los modelos" },
            { icon: "🚀", title: "ENVÍO RÁPIDO", desc: "Entrega en 2-5 días hábiles a todo México" },
            { icon: "💳", title: "PAGO SEGURO", desc: "Mercado Pago, tarjetas, OXXO y más métodos" },
          ].map((item) => (
            <div key={item.title} className="trust-item">
              <span className="trust-icon">{item.icon}</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        /* HERO */
        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 4rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(232,0,26,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .hero-content {
          flex: 1;
          z-index: 2;
          max-width: 600px;
        }
        .hero-eyebrow {
          font-family: var(--font-cond);
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          color: #e8001a;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }
        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 10vw, 9rem);
          line-height: 0.9;
          color: #fff;
          display: flex;
          flex-direction: column;
          margin-bottom: 1.5rem;
        }
        .hero-title-sub {
          font-size: clamp(2rem, 4vw, 3.5rem);
          color: #555;
          letter-spacing: 0.2em;
        }
        .hero-desc {
          color: #777;
          font-size: 1rem;
          margin-bottom: 2.5rem;
          max-width: 400px;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .btn-primary {
          background: #e8001a;
          color: #fff;
          padding: 0.9rem 2rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem;
          letter-spacing: 0.15em;
          text-decoration: none;
          transition: background 0.2s;
        }
        .btn-primary:hover { background: #c0001a; }
        .btn-outline {
          border: 1px solid #333;
          color: #ccc;
          padding: 0.9rem 2rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem;
          letter-spacing: 0.15em;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-outline:hover { border-color: #fff; color: #fff; }
        .hero-watch {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
        }
        .hero-watch img {
          max-width: 460px;
          width: 100%;
          filter: drop-shadow(0 20px 60px rgba(232,0,26,0.2));
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        .hero-scroll-line {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, transparent, #333);
        }

        /* ANNOUNCE */
        .announce-bar {
          background: #111;
          border-top: 1px solid #1a1a1a;
          border-bottom: 1px solid #1a1a1a;
          padding: 0.7rem 2rem;
          display: flex;
          justify-content: center;
          gap: 2rem;
          font-family: var(--font-cond);
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          color: #888;
          flex-wrap: wrap;
        }

        /* SECTIONS */
        .categories-section, .products-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 5rem 2rem 0;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid #1a1a1a;
          padding-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .section-header h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 0.15em;
          color: #fff;
        }

        /* CATEGORIES GRID */
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background: #111;
        }
        .category-card {
          display: block;
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: #0f0f0f;
        }
        .category-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          filter: grayscale(40%);
        }
        .category-card:hover img {
          transform: scale(1.08);
          filter: grayscale(0%);
        }
        .category-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem 1rem;
        }
        .category-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 0.12em;
          color: #fff;
          display: block;
        }
        .category-desc {
          font-size: 0.75rem;
          color: #999;
          display: block;
        }

        /* CATEGORY TABS */
        .category-tabs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .tab-btn {
          background: transparent;
          border: 1px solid #222;
          color: #666;
          padding: 0.4rem 1rem;
          font-family: var(--font-cond);
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn:hover, .tab-btn.active {
          background: #e8001a;
          border-color: #e8001a;
          color: #fff;
        }

        /* PRODUCTS GRID */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: #111;
        }

        /* TRUST */
        .trust-section {
          margin-top: 6rem;
          background: #0d0d0d;
          border-top: 1px solid #1a1a1a;
          border-bottom: 1px solid #1a1a1a;
        }
        .trust-grid {
          max-width: 1400px;
          margin: 0 auto;
          padding: 3rem 2rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        .trust-item {
          text-align: center;
          padding: 1rem;
        }
        .trust-icon {
          font-size: 1.8rem;
          display: block;
          margin-bottom: 0.8rem;
        }
        .trust-item h4 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.12em;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .trust-item p {
          font-size: 0.8rem;
          color: #555;
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .products-grid { grid-template-columns: repeat(3, 1fr); }
          .categories-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .hero { flex-direction: column; min-height: auto; padding-top: 6rem; }
          .hero-watch { display: none; }
          .products-grid { grid-template-columns: repeat(2, 1fr); }
          .categories-grid { grid-template-columns: repeat(2, 1fr); }
          .trust-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
