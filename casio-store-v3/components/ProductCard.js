import Link from "next/link";
import { useCart } from "../lib/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link href={`/producto/${product.slug}`} className="product-img-wrap">
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
        />
      </Link>
      <div className="product-info">
        <span className="product-model">{product.model}</span>
        <Link href={`/producto/${product.slug}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <div className="product-bottom">
          <span className="product-price">
            ${product.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN
          </span>
          <button
            className="add-btn"
            onClick={() => addToCart(product)}
          >
            + Agregar
          </button>
        </div>
      </div>

      <style jsx>{`
        .product-card {
          background: #0f0f0f;
          border: 1px solid #1a1a1a;
          transition: border-color 0.3s, transform 0.3s;
          overflow: hidden;
        }
        .product-card:hover {
          border-color: #333;
          transform: translateY(-4px);
        }
        .product-img-wrap {
          display: block;
          position: relative;
          overflow: hidden;
          aspect-ratio: 1;
          background: #1a1a1a;
        }
        .product-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .product-card:hover .product-img-wrap img {
          transform: scale(1.05);
        }
        .product-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #e8001a;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 0.3rem 0.6rem;
          z-index: 2;
        }
        .product-info {
          padding: 1.2rem;
        }
        .product-model {
          font-size: 0.7rem;
          color: #555;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.4rem;
        }
        .product-name {
          font-size: 0.9rem;
          font-weight: 400;
          color: #ccc;
          margin: 0 0 1rem;
          line-height: 1.4;
          text-decoration: none;
        }
        .product-name:hover { color: #fff; }
        .product-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .product-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          color: #fff;
          letter-spacing: 0.05em;
        }
        .add-btn {
          background: transparent;
          border: 1px solid #333;
          color: #ccc;
          font-size: 0.75rem;
          padding: 0.4rem 0.8rem;
          cursor: pointer;
          letter-spacing: 0.05em;
          transition: all 0.2s;
        }
        .add-btn:hover {
          background: #e8001a;
          border-color: #e8001a;
          color: #fff;
        }
      `}</style>
    </div>
  );
}
