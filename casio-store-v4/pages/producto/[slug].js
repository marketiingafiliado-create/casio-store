import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getProductBySlug, products } from "../../lib/products";
import { useCart } from "../../lib/CartContext";
import Link from "next/link";
import Head from "next/head";

export async function getStaticPaths() {
  return { paths: products.map((p) => ({ params: { slug: p.slug } })), fallback: false };
}
export async function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { notFound: true };
  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  return { props: { product, related } };
}

export default function ProductPage({ product, related }) {
  const { addToCart } = useCart();
  const defaultVariant = product.variants[0];
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [activeTab, setActiveTab] = useState("desc");

  const handleVariantSelect = (v) => setSelectedVariant(v);

  const handleBuy = () => {
    addToCart(product, selectedVariant.label);
  };

  return (
    <div className="page-wrapper">
      <Head>
        <title>{product.name} — Casio Mexico</title>
        <meta name="description" content={product.description} />
      </Head>
      <Navbar />

      {/* Breadcrumb */}
      <div className="bc">
        <div className="bc-inner">
          <Link href="/">Inicio</Link>
          <span>›</span>
          <Link href={`/categoria/${product.category.toLowerCase().replace(" ", "-")}`}>{product.category}</Link>
          <span>›</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* Main product */}
      <div className="product-wrap">
        {/* LEFT: Images */}
        <div className="gallery">
          {/* Main image */}
          <div className="main-img">
            <img
              src={selectedVariant.img}
              alt={`${product.name} - ${selectedVariant.label}`}
              key={selectedVariant.img}
            />
            {product.tag && <span className="img-badge">{product.tag}</span>}
          </div>
          {/* Thumbnails — todos los imgs únicos */}
          <div className="thumbs">
            {[...new Map(product.variants.map(v => [v.img, v])).values()].map((v) => (
              <button
                key={v.img}
                className={`thumb ${selectedVariant.img === v.img ? "active" : ""}`}
                onClick={() => setSelectedVariant(v)}
              >
                <img src={v.img} alt={v.label} />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Details */}
        <div className="details">
          {/* Header */}
          <div className="d-header">
            <span className="d-brand">CASIO</span>
            <span className="d-model">{product.model}</span>
          </div>
          <h1>{product.name}</h1>

          {/* Price */}
          <div className="price-block">
            <span className="price">${product.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
            <span className="currency">MXN</span>
            <span className="msi">✓ Hasta 12 MSI con Mercado Pago</span>
          </div>

          {/* Color selector */}
          <div className="color-block">
            <p className="color-label">
              Color: <strong>{selectedVariant.label}</strong>
            </p>
            <div className="color-options">
              {product.variants.map((v) => (
                <button
                  key={v.label}
                  className={`color-btn ${selectedVariant.label === v.label ? "active" : ""}`}
                  onClick={() => handleVariantSelect(v)}
                  title={v.label}
                >
                  <img src={v.img} alt={v.label} />
                  <span>{v.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="cta-block">
            <Link href="/checkout" className="buy-btn" onClick={handleBuy}>
              COMPRAR AHORA — ${product.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN
            </Link>
            <p className="secure">🔒 Pago 100% seguro con Mercado Pago · Visa · Mastercard · OXXO</p>
          </div>

          {/* Trust badges */}
          <div className="trust-row">
            <div className="trust-pill">🚚 Envío 1-7 días</div>
            <div className="trust-pill">✓ Original garantizado</div>
            <div className="trust-pill">↩ 30 días devolución</div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button className={activeTab === "desc" ? "tab active" : "tab"} onClick={() => setActiveTab("desc")}>Descripción</button>
            <button className={activeTab === "specs" ? "tab active" : "tab"} onClick={() => setActiveTab("specs")}>Especificaciones</button>
            <button className={activeTab === "ship" ? "tab active" : "tab"} onClick={() => setActiveTab("ship")}>Envío y devoluciones</button>
          </div>

          {activeTab === "desc" && (
            <div className="tab-content">
              <p>{product.description}</p>
            </div>
          )}
          {activeTab === "specs" && (
            <div className="tab-content">
              <table className="specs-table">
                <tbody>
                  {product.specs.map((s) => (
                    <tr key={s.label}>
                      <td>{s.label}</td>
                      <td>{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "ship" && (
            <div className="tab-content">
              <h4>Envío</h4>
              <ul>{product.shipping.map((s) => <li key={s}>{s}</li>)}</ul>
              <h4 style={{marginTop:"1rem"}}>Devoluciones</h4>
              <ul>{product.returns.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="related-section">
          <h2>TAMBIÉN TE PUEDE INTERESAR</h2>
          <div className="related-grid">
            {related.map((p) => (
              <div key={p.id} className="related-card">
                <Link href={`/producto/${p.slug}`} className="rc-img">
                  <img src={p.images[0]} alt={p.name} />
                </Link>
                <div className="rc-info">
                  <span>{p.category}</span>
                  <Link href={`/producto/${p.slug}`}><h4>{p.name}</h4></Link>
                  <div className="rc-bottom">
                    <span>${p.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</span>
                    <Link href="/checkout" className="rc-buy" onClick={() => addToCart(p, p.variants[0].label)}>COMPRAR</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        /* Breadcrumb */
        .bc { background: #f8f8f8; border-bottom: 1px solid #eee; }
        .bc-inner {
          max-width: 1400px; margin: 0 auto; padding: 0.8rem 2rem;
          display: flex; gap: 0.5rem; align-items: center;
          font-size: 0.75rem; color: #999;
        }
        .bc-inner a { color: #999; text-decoration: none; transition: color 0.2s; }
        .bc-inner a:hover { color: #e8001a; }
        .bc-inner span:last-child { color: #333; }

        /* Product layout */
        .product-wrap {
          max-width: 1400px; margin: 0 auto; padding: 3rem 2rem 5rem;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 5rem; align-items: start;
        }

        /* Gallery */
        .gallery { position: sticky; top: 115px; }
        .main-img {
          position: relative; background: #f8f8f8;
          border: 1px solid #eee; aspect-ratio: 1; overflow: hidden;
          margin-bottom: 8px;
        }
        .main-img img {
          width: 100%; height: 100%; object-fit: contain; padding: 2rem;
          transition: opacity 0.25s ease;
        }
        .img-badge {
          position: absolute; top: 1rem; left: 1rem;
          background: #e8001a; color: #fff;
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em;
          padding: 0.3rem 0.7rem; text-transform: uppercase;
        }
        .thumbs { display: flex; gap: 6px; flex-wrap: wrap; }
        .thumb {
          width: 72px; height: 72px; background: #f8f8f8;
          border: 1px solid #e0e0e0; overflow: hidden; cursor: pointer;
          transition: border-color 0.2s; padding: 4px;
          display: flex; align-items: center; justify-content: center;
        }
        .thumb img { width: 100%; height: 100%; object-fit: contain; }
        .thumb.active { border-color: #e8001a; border-width: 2px; }
        .thumb:hover { border-color: #999; }

        /* Details */
        .d-header {
          display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;
        }
        .d-brand {
          font-family: 'Bebas Neue', sans-serif; font-size: 0.8rem;
          letter-spacing: 0.25em; color: #e8001a; background: #fff0f2;
          padding: 0.2rem 0.6rem; border: 1px solid #ffd0d6;
        }
        .d-model { font-size: 0.78rem; color: #999; letter-spacing: 0.1em; }
        h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          color: #1a1a1a; letter-spacing: 0.04em;
          line-height: 1.1; margin-bottom: 1.5rem;
        }

        /* Price */
        .price-block {
          display: flex; align-items: baseline; gap: 0.5rem;
          margin-bottom: 0.5rem; flex-wrap: wrap;
          padding-bottom: 1.5rem; border-bottom: 1px solid #eee;
        }
        .price {
          font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem;
          color: #1a1a1a; letter-spacing: 0.02em;
        }
        .currency { font-size: 1rem; color: #666; }
        .msi {
          width: 100%; font-size: 0.75rem; color: #27ae60;
          letter-spacing: 0.04em;
        }

        /* Color selector */
        .color-block { margin: 1.5rem 0; }
        .color-label {
          font-size: 0.82rem; color: #666; margin-bottom: 0.8rem;
          letter-spacing: 0.04em;
        }
        .color-label strong { color: #1a1a1a; }
        .color-options { display: flex; gap: 8px; flex-wrap: wrap; }
        .color-btn {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          border: 2px solid #e0e0e0; background: #fafafa;
          padding: 4px; width: 68px; cursor: pointer;
          transition: all 0.2s;
        }
        .color-btn img { width: 56px; height: 56px; object-fit: contain; }
        .color-btn span {
          font-size: 0.55rem; color: #666; text-align: center;
          line-height: 1.2; letter-spacing: 0.03em; max-width: 60px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .color-btn:hover { border-color: #999; }
        .color-btn.active { border-color: #e8001a; border-width: 2px; }
        .color-btn.active span { color: #e8001a; font-weight: 600; }

        /* CTA */
        .cta-block { margin: 1.5rem 0 1rem; }
        .buy-btn {
          display: block; width: 100%;
          background: #e8001a; color: #fff;
          text-align: center; padding: 1.1rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem; letter-spacing: 0.2em;
          text-decoration: none; transition: background 0.2s;
          margin-bottom: 0.8rem;
        }
        .buy-btn:hover { background: #c0001a; }
        .secure { font-size: 0.72rem; color: #999; text-align: center; }

        /* Trust pills */
        .trust-row {
          display: flex; gap: 0.5rem; margin-bottom: 2rem; flex-wrap: wrap;
        }
        .trust-pill {
          font-size: 0.72rem; color: #555; border: 1px solid #e8e8e8;
          background: #fafafa; padding: 0.4rem 0.8rem;
        }

        /* Tabs */
        .tabs {
          display: flex; border-bottom: 2px solid #eee; margin-bottom: 0;
        }
        .tab {
          background: none; border: none; padding: 0.8rem 1.2rem;
          font-size: 0.82rem; color: #999; cursor: pointer;
          letter-spacing: 0.06em; border-bottom: 2px solid transparent;
          margin-bottom: -2px; transition: all 0.2s;
          font-family: 'Barlow', sans-serif;
        }
        .tab:hover { color: #333; }
        .tab.active { color: #e8001a; border-bottom-color: #e8001a; font-weight: 600; }
        .tab-content {
          padding: 1.5rem 0; font-size: 0.88rem; color: #555; line-height: 1.8;
        }
        .specs-table { width: 100%; border-collapse: collapse; }
        .specs-table tr { border-bottom: 1px solid #f0f0f0; }
        .specs-table td { padding: 0.6rem 0.5rem; font-size: 0.82rem; color: #555; }
        .specs-table td:first-child { color: #999; width: 45%; font-weight: 500; }
        .tab-content h4 { font-size: 0.82rem; color: #333; margin-bottom: 0.5rem; font-weight: 600; }
        .tab-content ul { list-style: none; }
        .tab-content ul li { font-size: 0.82rem; color: #666; padding: 0.3rem 0; border-bottom: 1px solid #f5f5f5; }
        .tab-content ul li::before { content: "→ "; color: #e8001a; }

        /* Related */
        .related-section {
          max-width: 1400px; margin: 0 auto; padding: 0 2rem 5rem;
          border-top: 1px solid #eee;
        }
        .related-section h2 {
          font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem;
          letter-spacing: 0.15em; color: #1a1a1a;
          padding: 2rem 0 1.5rem; border-bottom: 1px solid #eee;
          margin-bottom: 1.5rem;
        }
        .related-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: #eee;
        }
        .related-card { background: #fff; }
        .rc-img {
          display: block; aspect-ratio: 1; overflow: hidden; background: #f8f8f8;
        }
        .rc-img img {
          width: 100%; height: 100%; object-fit: contain; padding: 1rem;
          transition: transform 0.4s;
        }
        .related-card:hover .rc-img img { transform: scale(1.04); }
        .rc-info { padding: 1rem; }
        .rc-info > span { font-size: 0.65rem; color: #e8001a; letter-spacing: 0.15em; text-transform: uppercase; }
        .rc-info h4 {
          font-size: 0.82rem; color: #333; margin: 0.3rem 0 0.8rem;
          font-weight: 400; line-height: 1.4;
        }
        .rc-info h4:hover { color: #e8001a; }
        .rc-bottom { display: flex; justify-content: space-between; align-items: center; }
        .rc-bottom > span { font-family: 'Bebas Neue', sans-serif; font-size: 1rem; color: #1a1a1a; }
        .rc-buy {
          font-family: 'Bebas Neue', sans-serif; font-size: 0.7rem;
          letter-spacing: 0.12em; color: #fff; background: #e8001a;
          padding: 0.35rem 0.8rem; text-decoration: none; transition: background 0.2s;
        }
        .rc-buy:hover { background: #c0001a; }

        @media (max-width: 1024px) {
          .product-wrap { grid-template-columns: 1fr; gap: 2rem; }
          .gallery { position: static; }
          .related-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .color-btn { width: 58px; }
          .color-btn img { width: 46px; height: 46px; }
        }
      `}</style>
    </div>
  );
}
