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
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.length > 0 ? product.variants[0].label : null
  );
  const [currentImg, setCurrentImg] = useState(0);

  return (
    <div className="page-wrapper">
      <Head>
        <title>{product.name} — Casio Mexico</title>
        <meta name="description" content={product.description} />
      </Head>
      <Navbar />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="bc-inner">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <Link href={`/categoria/${product.category.toLowerCase().replace(' ', '-')}`}>{product.category}</Link>
          <span>/</span>
          <span>{product.model}</span>
        </div>
      </div>

      {/* Product */}
      <div className="product-layout">
        {/* Gallery */}
        <div className="gallery">
          <div className="main-img">
            <img src={product.images[currentImg]} alt={product.name} />
            {product.tag && <span className="img-tag">{product.tag}</span>}
          </div>
          {product.images.length > 1 && (
            <div className="thumbs">
              {product.images.map((img, i) => (
                <button key={i} className={`thumb ${i === currentImg ? "active" : ""}`} onClick={() => setCurrentImg(i)}>
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="details">
          <div className="details-top">
            <span className="d-category">{product.category}</span>
            <span className="d-model">Modelo: {product.model}</span>
          </div>
          <h1 className="d-title">{product.name}</h1>

          <div className="price-block">
            <span className="big-price">${product.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })} <small>MXN</small></span>
            <span className="msi-tag">✓ Hasta 12 MSI con Mercado Pago</span>
          </div>

          <p className="d-desc">{product.description}</p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="variants">
              <p className="v-label">Variante: <strong>{selectedVariant}</strong></p>
              <div className="v-options">
                {product.variants.map((v) => (
                  <button
                    key={v.label}
                    className={`v-btn ${selectedVariant === v.label ? "active" : ""}`}
                    onClick={() => setSelectedVariant(v.label)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="cta-block">
            <Link
              href="/checkout"
              className="buy-btn"
              onClick={() => addToCart(product, selectedVariant)}
            >
              COMPRAR AHORA
            </Link>
            <p className="secure-msg">🔒 Pago seguro con Mercado Pago</p>
          </div>

          {/* Features */}
          <div className="features">
            <h3>ESPECIFICACIONES</h3>
            {product.features.map((f) => (
              <div key={f} className="feature-row">
                <span className="f-dot" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* Shipping */}
          <div className="shipping-pills">
            <div className="pill">🚚 Envío 2-5 días hábiles</div>
            <div className="pill">✓ Garantía 1 año</div>
            <div className="pill">↩ Devolución 30 días</div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="related">
          <div className="related-header">
            <h2>TAMBIÉN TE PUEDE INTERESAR</h2>
          </div>
          <div className="related-grid">
            {related.map((p) => (
              <div key={p.id} className="rc">
                <Link href={`/producto/${p.slug}`} className="rc-img">
                  <img src={p.images[0]} alt={p.name} />
                </Link>
                <div className="rc-info">
                  <span>{p.category}</span>
                  <Link href={`/producto/${p.slug}`}><h4>{p.name}</h4></Link>
                  <div className="rc-bottom">
                    <span>${p.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</span>
                    <Link href="/checkout" className="rc-buy" onClick={() => addToCart(p)}>COMPRAR</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        .breadcrumb { background: #050505; border-bottom: 1px solid #0e0e0e; }
        .bc-inner {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0.9rem 2rem;
          display: flex;
          gap: 0.6rem;
          align-items: center;
          font-size: 0.72rem;
          color: #444;
        }
        .bc-inner a { color: #444; text-decoration: none; transition: color 0.2s; }
        .bc-inner a:hover { color: #e8001a; }

        .product-layout {
          max-width: 1600px;
          margin: 0 auto;
          padding: 4rem 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: start;
        }

        /* Gallery */
        .gallery { position: sticky; top: 115px; }
        .main-img {
          position: relative;
          background: #0d0d0d;
          border: 1px solid #111;
          aspect-ratio: 1;
          overflow: hidden;
        }
        .main-img img { width: 100%; height: 100%; object-fit: cover; }
        .img-tag {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          background: #e8001a;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 0.35rem 0.7rem;
        }
        .thumbs { display: flex; gap: 4px; margin-top: 4px; }
        .thumb {
          width: 80px;
          height: 80px;
          background: #0d0d0d;
          border: 1px solid #111;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.2s;
          padding: 0;
        }
        .thumb.active { border-color: #e8001a; }
        .thumb img { width: 100%; height: 100%; object-fit: cover; }

        /* Details */
        .details-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
        }
        .d-category {
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          color: #e8001a;
          font-family: 'Barlow Condensed', sans-serif;
          text-transform: uppercase;
        }
        .d-model { font-size: 0.7rem; color: #333; letter-spacing: 0.1em; }
        .d-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          color: #fff;
          letter-spacing: 0.06em;
          line-height: 1.05;
          margin-bottom: 2rem;
        }

        .price-block {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #111;
        }
        .big-price {
          display: block;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.8rem;
          color: #fff;
          letter-spacing: 0.03em;
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .big-price small { font-size: 1.2rem; color: #666; }
        .msi-tag { font-size: 0.75rem; color: #4caf50; letter-spacing: 0.05em; }

        .d-desc {
          color: #666;
          font-size: 0.88rem;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        /* Variants */
        .variants { margin-bottom: 2rem; }
        .v-label { font-size: 0.75rem; color: #666; margin-bottom: 0.8rem; letter-spacing: 0.05em; }
        .v-label strong { color: #ccc; }
        .v-options { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .v-btn {
          border: 1px solid #1e1e1e;
          background: transparent;
          color: #666;
          padding: 0.5rem 1rem;
          font-size: 0.73rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Barlow', sans-serif;
        }
        .v-btn:hover { border-color: #444; color: #ccc; }
        .v-btn.active { border-color: #e8001a; color: #fff; background: rgba(232,0,26,0.08); }

        /* CTA */
        .cta-block { margin-bottom: 2.5rem; }
        .buy-btn {
          display: block;
          width: 100%;
          background: #e8001a;
          color: #fff;
          text-align: center;
          padding: 1.2rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.25em;
          text-decoration: none;
          transition: background 0.2s;
          margin-bottom: 0.8rem;
        }
        .buy-btn:hover { background: #c0001a; }
        .secure-msg { font-size: 0.72rem; color: #444; text-align: center; letter-spacing: 0.05em; }

        /* Features */
        .features {
          background: #080808;
          border: 1px solid #111;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .features h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.82rem;
          letter-spacing: 0.2em;
          color: #fff;
          margin-bottom: 1rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid #111;
        }
        .feature-row {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid #0d0d0d;
          font-size: 0.82rem;
          color: #777;
        }
        .feature-row:last-child { border: none; }
        .f-dot { width: 4px; height: 4px; background: #e8001a; border-radius: 50%; flex-shrink: 0; }

        /* Shipping pills */
        .shipping-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .pill {
          font-size: 0.7rem;
          color: #555;
          border: 1px solid #111;
          padding: 0.4rem 0.8rem;
          letter-spacing: 0.05em;
        }

        /* Related */
        .related {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 2rem 5rem;
        }
        .related-header {
          border-bottom: 1px solid #1a1a1a;
          padding-bottom: 1.2rem;
          margin-bottom: 2rem;
        }
        .related-header h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem;
          letter-spacing: 0.15em;
          color: #fff;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          background: #060606;
        }
        .rc { background: #0a0a0a; }
        .rc-img {
          display: block;
          aspect-ratio: 1;
          overflow: hidden;
          background: #111;
        }
        .rc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .rc:hover .rc-img img { transform: scale(1.04); }
        .rc-info { padding: 1.2rem; }
        .rc-info > span { font-size: 0.65rem; color: #e8001a; letter-spacing: 0.2em; font-family: 'Barlow Condensed', sans-serif; }
        .rc-info h4 { font-size: 0.82rem; color: #999; margin: 0.3rem 0 0.8rem; font-weight: 400; line-height: 1.4; }
        .rc-bottom { display: flex; justify-content: space-between; align-items: center; }
        .rc-bottom > span { font-family: 'Bebas Neue', sans-serif; font-size: 1rem; color: #fff; }
        .rc-buy {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: #888;
          border: 1px solid #1e1e1e;
          padding: 0.35rem 0.7rem;
          text-decoration: none;
          transition: all 0.2s;
        }
        .rc-buy:hover { background: #e8001a; border-color: #e8001a; color: #fff; }

        @media (max-width: 1024px) {
          .product-layout { grid-template-columns: 1fr; gap: 2.5rem; }
          .gallery { position: static; }
          .related-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
