import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { products, categories } from "../../lib/products";
import { useState } from "react";
import Head from "next/head";

export async function getStaticPaths() {
  const slugs = ["todos", "g-shock", "premium", "collection", "classic", "vintage", "mujer"];
  return {
    paths: slugs.map((s) => ({ params: { categoria: s } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { categoria: params.categoria } };
}

const categoryMap = {
  todos: "Todos",
  "g-shock": "G-SHOCK",
  premium: "Premium",
  collection: "Collection",
  classic: "Classic",
  vintage: "Vintage",
  mujer: "Mujer",
};

export default function CategoriaPage({ categoria }) {
  const [sort, setSort] = useState("default");
  const catLabel = categoryMap[categoria] || "Todos";
  
  let filtered = catLabel === "Todos"
    ? [...products]
    : products.filter((p) => p.category === catLabel);

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="page-wrapper">
      <Head>
        <title>{catLabel === "Todos" ? "Catálogo" : catLabel} — Casio Mexico</title>
      </Head>
      <Navbar />

      <div className="catalog-page">
        <div className="catalog-header">
          <div className="catalog-header-inner">
            <h1>{catLabel === "Todos" ? "TODOS LOS RELOJES" : catLabel.toUpperCase()}</h1>
            <p>{filtered.length} productos</p>
          </div>
        </div>

        <div className="catalog-layout">
          {/* Sidebar */}
          <aside className="catalog-sidebar">
            <div className="sidebar-section">
              <h3>CATEGORÍAS</h3>
              {Object.entries(categoryMap).map(([slug, label]) => (
                <a
                  key={slug}
                  href={`/categoria/${slug}`}
                  className={`sidebar-link ${categoria === slug ? "active" : ""}`}
                >
                  {label}
                  <span className="sidebar-count">
                    {label === "Todos" ? products.length : products.filter(p => p.category === label).length}
                  </span>
                </a>
              ))}
            </div>
            <div className="sidebar-section">
              <h3>PRECIO</h3>
              <a href="#" className="sidebar-link">Menos de $450 MXN</a>
              <a href="#" className="sidebar-link">$450 - $550 MXN</a>
              <a href="#" className="sidebar-link">Más de $550 MXN</a>
            </div>
          </aside>

          {/* Products */}
          <div className="catalog-main">
            <div className="catalog-toolbar">
              <span className="toolbar-count">{filtered.length} artículos</span>
              <div className="toolbar-sort">
                <label>Ordenar:</label>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="default">Relevancia</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                  <option value="name">Alfabético</option>
                </select>
              </div>
            </div>
            <div className="products-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="no-products">
                <p>No hay productos en esta categoría.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .catalog-page { max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
        .catalog-header {
          padding: 3rem 0 2rem;
          border-bottom: 1px solid #1a1a1a;
          margin-bottom: 3rem;
        }
        .catalog-header-inner {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .catalog-header h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3rem;
          letter-spacing: 0.12em;
          color: #fff;
        }
        .catalog-header p { color: #555; font-size: 0.85rem; }
        .catalog-layout { display: grid; grid-template-columns: 220px 1fr; gap: 3rem; }
        .sidebar-section { margin-bottom: 2.5rem; }
        .sidebar-section h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          color: #fff;
          margin-bottom: 1rem;
          border-bottom: 1px solid #1a1a1a;
          padding-bottom: 0.5rem;
        }
        .sidebar-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.4rem 0;
          font-size: 0.82rem;
          color: #666;
          text-decoration: none;
          border-bottom: 1px solid #111;
          transition: color 0.2s;
        }
        .sidebar-link:hover, .sidebar-link.active { color: #e8001a; }
        .sidebar-count {
          font-size: 0.7rem;
          color: #444;
        }
        .catalog-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #111;
        }
        .toolbar-count { font-size: 0.8rem; color: #555; }
        .toolbar-sort {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #666;
        }
        .toolbar-sort select {
          background: #111;
          border: 1px solid #222;
          color: #ccc;
          padding: 0.3rem 0.6rem;
          font-size: 0.8rem;
          cursor: pointer;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #111;
        }
        .no-products {
          text-align: center;
          padding: 4rem;
          color: #555;
        }
        @media (max-width: 1024px) {
          .catalog-layout { grid-template-columns: 1fr; }
          .catalog-sidebar { display: none; }
          .products-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
