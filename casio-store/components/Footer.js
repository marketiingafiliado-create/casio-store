import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="https://casio-mexico.myshopify.com/cdn/shop/files/Logo-Casio.png?height=68&v=1776185193" alt="Casio" />
          <p>Distribuidor autorizado Casio México.<br />Relojes originales con garantía oficial.</p>
        </div>
        <div className="footer-col">
          <h4>PRODUCTOS</h4>
          <Link href="/categoria/g-shock">G-SHOCK</Link>
          <Link href="/categoria/premium">Relojes Premium</Link>
          <Link href="/categoria/collection">Collection</Link>
          <Link href="/categoria/vintage">Vintage</Link>
          <Link href="/categoria/mujer">Mujer</Link>
        </div>
        <div className="footer-col">
          <h4>SOPORTE</h4>
          <a href="#">Garantía</a>
          <a href="#">Política de devolución</a>
          <a href="#">Preguntas frecuentes</a>
          <a href="#">Contacto</a>
        </div>
        <div className="footer-col">
          <h4>LEGAL</h4>
          <a href="#">Aviso de privacidad</a>
          <a href="#">Términos y condiciones</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Casio Mexico · Distribuidor Autorizado</p>
        <div className="payment-icons">
          <span>Visa</span>
          <span>Mastercard</span>
          <span>OXXO</span>
          <span>Mercado Pago</span>
        </div>
      </div>
      <style jsx>{`
        .footer {
          background: #050505;
          border-top: 1px solid #1a1a1a;
          margin-top: 6rem;
        }
        .footer-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem 3rem;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
        }
        .footer-brand img {
          height: 32px;
          filter: brightness(0) invert(1);
          margin-bottom: 1rem;
          display: block;
        }
        .footer-brand p {
          color: #555;
          font-size: 0.85rem;
          line-height: 1.6;
        }
        .footer-col h4 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.15em;
          color: #fff;
          margin-bottom: 1.2rem;
        }
        .footer-col a {
          display: block;
          color: #555;
          text-decoration: none;
          font-size: 0.85rem;
          margin-bottom: 0.6rem;
          transition: color 0.2s;
        }
        .footer-col a:hover { color: #e8001a; }
        .footer-bottom {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.5rem 2rem;
          border-top: 1px solid #111;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-bottom p { color: #333; font-size: 0.8rem; }
        .payment-icons {
          display: flex;
          gap: 1rem;
        }
        .payment-icons span {
          color: #333;
          font-size: 0.75rem;
          background: #111;
          padding: 0.3rem 0.6rem;
          border-radius: 3px;
          border: 1px solid #222;
        }
        @media (max-width: 768px) {
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
