import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { getProductBySlug, products } from "../../lib/products";
import { useCart } from "../../lib/CartContext";
import Link from "next/link";
import Head from "next/head";

export async function getStaticPaths() {
  return {
    paths: products.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { notFound: true };
  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  return { props: { product, related } };
}

export default function ProductPage({ product, related }) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.length > 0 ? product.variants[0].label : null
  );
  const [currentImg, setCurrentImg] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="page-wrapper">
      <Head>
        <title>{product.name} — Casio Mexico</title>
        <meta name="description" content={product.description} />
      </Head>
      <Navbar />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <Link href={`/categoria/${product.category.toLowerCase()}`}>{product.category}</Link>
          <span>/</span>
          <span>{product.model}</span>
        </div>
      </div>

      {/* Product Main */}
      <div className="product-main">
        {/* Images */}
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.images[currentImg]} alt={product.name} />
            <span className="product-badge">{product.tag}</span>
          </div>
          {product.images.length > 1 && (
            <div className="thumbs">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`thumb ${i === currentImg ? "active" : ""}`}
                  onClick={() => setCurrentImg(i)}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="product-details">
          <span className="product-category-tag">{product.category}</span>
          <h1 className="product-title">{product.name}</h1>
          <span className="product-model-tag">Modelo: {product.model}</span>

          <div className="product-price-block">
            <span className="big-price">
              ${product.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN
            </span>
            <span className="msi">Hasta 12 MSI con Mercado Pago</span>
          </div>

          <p className="product-description">{product.description}</p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="variant-selector">
              <p className="variant-label">Color / Variante: <strong>{selectedVariant}</strong></p>
              <div className="variant-options">
                {product.variants.map((v) => (
                  <button
                    key={v.label}
                    className={`variant-btn ${selectedVariant === v.label ? "active" : ""}`}
                    onClick={() => setSelectedVariant(v.label)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to cart */}
          <div className="add-to-cart-block">
            <button className={`add-to-cart-btn ${added ? "added" : ""}`} onClick={handleAddToCart}>
              {added ? "✓ AGREGADO AL CARRITO" : "AGREGAR AL CARRITO"}
            </button>
            <Link href="/checkout" className="buy-now-btn">
              COMPRAR AHORA
            </Link>
          </div>

          {/* Features */}
          <div className="product-features">
            <h3>CARACTERÍSTICAS</h3>
            <ul>
              {product.features.map((f) => (
                <li key={f}>
                  <span className="feature-dot" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping info */}
          <div className="shipping-info">
            <div className="shipping-item">
              <span>🚀</span>
              <span>Envío en 2-5 días hábiles a todo México</span>
            </div>
            <div className="shipping-item">
              <span>✓</span>
              <span>Reloj 100% original con garantía de 1 año</span>
            </div>
            <div className="shipping-item">
              <span>↩</span>
              <span>Devoluciones en 30 días</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="related-section">
          <div className="section-header">
            <h2>TAMBIÉN TE PUEDE INTERESAR</h2>
          </div>
          <div className="related-grid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      <Footer />

      <style jsx>{`
        .breadcrumb {
          background: #0a0a0a;
          border-bottom: 1px solid #111;
        }
        .breadcrumb-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0.8rem 2rem;
          display: flex;
          gap: 0.5rem;
          align-items: center;
          font-size: 0.75rem;
          color: #555;
        }
        .breadcrumb-inner a { color: #555; text-decoration: none; }
        .breadcrumb-inner a:hover { color: #e8001a; }

        .product-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }

        .product-gallery { position: sticky; top: 90px; }
        .main-image {
          position: relative;
          background: #0f0f0f;
          border: 1px solid #1a1a1a;
          aspect-ratio: 1;
          overflow: hidden;
        }
        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .product-badge {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          background: #e8001a;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 0.4rem 0.8rem;
        }
        .thumbs {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        .thumb {
          width: 80px;
          height: 80px;
          background: #0f0f0f;
          border: 1px solid #1a1a1a;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .thumb.active { border-color: #e8001a; }
        .thumb img { width: 100%; height: 100%; object-fit: cover; }

        .product-category-tag {
          display: inline-block;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          color: #e8001a;
          text-transform: uppercase;
          margin-bottom: 0.8rem;
          font-family: var(--font-cond);
        }
        .product-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          letter-spacing: 0.08em;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }
        .product-model-tag {
          font-size: 0.75rem;
          color: #555;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 2rem;
        }
        .product-price-block {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #1a1a1a;
        }
        .big-price {
          display: block;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          color: #fff;
          letter-spacing: 0.05em;
        }
        .msi {
          font-size: 0.75rem;
          color: #4caf50;
          letter-spacing: 0.05em;
        }
        .product-description {
          color: #777;
          font-size: 0.9rem;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .variant-selector { margin-bottom: 2rem; }
        .variant-label {
          font-size: 0.8rem;
          color: #888;
          margin-bottom: 0.8rem;
          letter-spacing: 0.05em;
        }
        .variant-label strong { color: #fff; }
        .variant-options { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .variant-btn {
          border: 1px solid #222;
          background: transparent;
          color: #999;
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s;
        }
        .variant-btn:hover { border-color: #555; color: #fff; }
        .variant-btn.active { border-color: #e8001a; color: #fff; background: rgba(232,0,26,0.1); }

        .add-to-cart-block {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .add-to-cart-btn {
          flex: 2;
          background: #e8001a;
          color: #fff;
          border: none;
          padding: 1rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: background 0.2s;
        }
        .add-to-cart-btn:hover { background: #c0001a; }
        .add-to-cart-btn.added { background: #2e7d32; }
        .buy-now-btn {
          flex: 1;
          border: 1px solid #333;
          color: #ccc;
          padding: 1rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.15em;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s;
        }
        .buy-now-btn:hover { border-color: #fff; color: #fff; }

        .product-features {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
        }
        .product-features h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.15em;
          color: #fff;
          margin-bottom: 1rem;
        }
        .product-features ul { list-style: none; }
        .product-features li {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.85rem;
          color: #888;
          padding: 0.4rem 0;
          border-bottom: 1px solid #1a1a1a;
        }
        .product-features li:last-child { border: none; }
        .feature-dot {
          width: 4px;
          height: 4px;
          background: #e8001a;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .shipping-info {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .shipping-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.8rem;
          color: #666;
        }

        .related-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem 4rem;
        }
        .section-header {
          border-bottom: 1px solid #1a1a1a;
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
        }
        .section-header h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 0.15em;
          color: #fff;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: #111;
        }

        @media (max-width: 1024px) {
          .product-main { grid-template-columns: 1fr; gap: 2rem; }
          .product-gallery { position: static; }
          .related-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
