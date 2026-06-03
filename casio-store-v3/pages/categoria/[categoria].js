import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { products } from "../../lib/products";
import { useState } from "react";
import Head from "next/head";
import { useCart } from "../../lib/CartContext";

export async function getStaticPaths() {
  const slugs = ["todos", "g-shock", "premium", "collection", "classic", "vintage", "mujer"];
  return { paths: slugs.map((s) => ({ params: { categoria: s } })), fallback: false };
}
export async function getStaticProps({ params }) {
  return { props: { categoria: params.categoria } };
}

const categoryMap = {
  todos: "Todos", "g-shock": "G-SHOCK", premium: "Premium",
  collection: "Collection", classic: "Classic", vintage: "Vintage", mujer: "Mujer",
};

const categoryHero = {
  "g-shock": { img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imgi_7_gmwbz5000rc-1920x612.jpg?v=1780461205", desc: "Resistencia que desafía los límites" },
  premium: { img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/casio-mx-1920x816-1_94e341d4-3e50-4431-86a6-a4d6a120933a.jpg?v=1780461205", desc: "Alta relojería Casio" },
  collection: { img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imgi_8_homepage-efk-110-pc.jpg?v=1780461205", desc: "Elegancia y versatilidad" },
  vintage: { img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imgi_9_aq-240e.jpg?v=1780461205", desc: "Clásicos atemporales" },
  mujer: { img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imgi_5_nk-1920-612-c.jpg?v=1780461206", desc: "Diseños femeninos" },
  todos: { img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imagen-main-1920-x-612-plantilla-gm-2110d.jpg?v=1780461205", desc: "Todos los relojes Casio originales" },
  classic: { img: "https://cdn.shopify.com/s/files/1/0659/7938/3871/files/imagen-main-1920-x-816-plantilla-toms.jpg?v=1780461206", desc: "Clásicos de siempre" },
};

export default function CategoriaPage({ categoria }) {
  const [sort, setSort] = useState("default");
  const { addToCart } = useCart();
  const catLabel = categoryMap[categoria] || "Todos";
  const hero = categoryHero[categoria] || categoryHero.todos;

  let filtered = catLabel === "Todos" ? [...products] : products.filter((p) => p.category === catLabel);
  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="page-wrapper">
      <Head>
        <title>{catLabel === "Todos" ? "Catálogo" : catLabel} — Casio Mexico</title>
      </Head>
      <Navbar />

      {/* Category Hero */}
      <div className="cat-hero">
        <img src={hero.img} alt={catLabel} />
        <div className="cat-hero-overlay" />
        <div className="cat-hero-content">
          <p className="cat-eyebrow">CASIO MÉXICO</p>
          <h1>{catLabel === "Todos" ? "TODOS LOS RELOJES" : catLabel}</h1>
          <p>{hero.desc}</p>
        </div>
      </div>

      <div className="catalog-page">
        {/* Category Nav */}
        <div className="cat-nav">
          {Object.entries(categoryMap).map(([slug, label]) => (
            <Link key={slug} href={`/categoria/${slug}`} className={`cat-nav-item ${categoria === slug ? "active" : ""}`}>
              {label}
              <span>{label === "Todos" ? products.length : products.filter(p => p.category === label).length}</span>
            </Link>
          ))}
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <p className="toolbar-count">{filtered.length} productos</p>
          <div className="toolbar-sort">
            <span>Ordenar:</span>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">Relevancia</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name">Alfabético</option>
            </select>
          </div>
        </div>

        {/* Products */}
        <div className="products-grid">
          {filtered.map((p) => (
            <div key={p.id} className="product-card">
              <Link href={`/producto/${p.slug}`} className="product-img-wrap">
                {p.tag && <span className="p-tag">{p.tag}</span>}
                <img src={p.images[0]} alt={p.name} />
                <div className="img-hover-overlay">
                  <span>VER DETALLE</span>
                </div>
              </Link>
              <div className="product-info">
                <span className="p-category">{p.category}</span>
                <Link href={`/producto/${p.slug}`}><h3>{p.name}</h3></Link>
                <span className="p-model">{p.model}</span>
                <div className="p-bottom">
                  <span className="p-price">${p.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</span>
                  <Link href="/checkout" className="p-buy" onClick={() => addToCart(p)}>COMPRAR</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="no-results">
            <p>No hay productos en esta categoría.</p>
            <Link href="/categoria/todos">Ver todos →</Link>
          </div>
        )}
      </div>

      <Footer />

      <style jsx>{`
        .cat-hero {
          position: relative;
          height: 320px;
          overflow: hidden;
          background: #000;
        }
        .cat-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          filter: brightness(0.4);
        }
        .cat-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 70%);
        }
        .cat-hero-content {
          position: absolute;
          bottom: 2.5rem;
          left: 8%;
        }
        .cat-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          color: #e8001a;
          font-family: 'Barlow Condensed', sans-serif;
          margin-bottom: 0.5rem;
        }
        .cat-hero-content h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          color: #fff;
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
          line-height: 1;
        }
        .cat-hero-content p {
          color: rgba(255,255,255,0.5);
          font-size: 0.85rem;
        }

        .catalog-page {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 2rem 4rem;
        }

        /* Category nav */
        .cat-nav {
          display: flex;
          gap: 0;
          border-bottom: 1px solid #1a1a1a;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .cat-nav::-webkit-scrollbar { display: none; }
        .cat-nav-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1.2rem 1.5rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          color: #555;
          text-decoration: none;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }
        .cat-nav-item:hover { color: #fff; }
        .cat-nav-item.active { color: #fff; border-bottom-color: #e8001a; }
        .cat-nav-item span {
          font-size: 0.65rem;
          color: #333;
          background: #111;
          padding: 0.1rem 0.4rem;
          border-radius: 2px;
        }
        .cat-nav-item.active span { background: rgba(232,0,26,0.15); color: #e8001a; }

        /* Toolbar */
        .toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
          border-bottom: 1px solid #111;
          margin-bottom: 2rem;
        }
        .toolbar-count { font-size: 0.8rem; color: #555; letter-spacing: 0.05em; }
        .toolbar-sort { display: flex; align-items: center; gap: 0.8rem; font-size: 0.78rem; color: #666; }
        .toolbar-sort select {
          background: #0d0d0d;
          border: 1px solid #1e1e1e;
          color: #ccc;
          padding: 0.4rem 0.8rem;
          font-size: 0.78rem;
          font-family: 'Barlow', sans-serif;
          cursor: pointer;
          outline: none;
        }

        /* Products */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          background: #060606;
        }
        .product-card { background: #0a0a0a; transition: background 0.3s; }
        .product-card:hover { background: #0f0f0f; }
        .product-img-wrap {
          display: block;
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          background: #111;
        }
        .product-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .product-card:hover .product-img-wrap img { transform: scale(1.05); }
        .img-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .product-card:hover .img-hover-overlay { opacity: 1; }
        .img-hover-overlay span {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.2em;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.5);
          padding: 0.6rem 1.2rem;
        }
        .p-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #e8001a;
          color: #fff;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 0.25rem 0.6rem;
          z-index: 2;
        }
        .product-info { padding: 1.4rem; }
        .p-category {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: #e8001a;
          font-family: 'Barlow Condensed', sans-serif;
          display: block;
          margin-bottom: 0.4rem;
          text-transform: uppercase;
        }
        .product-info h3 {
          font-size: 0.85rem;
          font-weight: 400;
          color: #999;
          margin: 0 0 0.3rem;
          line-height: 1.4;
          min-height: 2.4em;
          transition: color 0.2s;
        }
        .product-info h3:hover { color: #fff; }
        .p-model {
          display: block;
          font-size: 0.68rem;
          color: #3a3a3a;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }
        .p-bottom { display: flex; justify-content: space-between; align-items: center; }
        .p-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          color: #fff;
          letter-spacing: 0.04em;
        }
        .p-buy {
          background: transparent;
          border: 1px solid #2a2a2a;
          color: #888;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          padding: 0.4rem 0.9rem;
          text-decoration: none;
          transition: all 0.2s;
        }
        .p-buy:hover { background: #e8001a; border-color: #e8001a; color: #fff; }

        .no-results {
          text-align: center;
          padding: 6rem 2rem;
          color: #444;
        }
        .no-results a { color: #e8001a; text-decoration: none; display: block; margin-top: 1rem; }

        @media (max-width: 1200px) { .products-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .products-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}
