import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="https://casio-mexico.myshopify.com/cdn/shop/files/Logo-Casio.png?height=68&v=1776185193" alt="Casio" />
          <p>Distribuidor autorizado Casio México. Relojes originales con garantía oficial de 1 año.</p>
          <div className="social-links">
            <a href="#">FB</a>
            <a href="#">IG</a>
            <a href="#">TK</a>
          </div>
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
          <a href="#">Rastrear pedido</a>
          <a href="#">Preguntas frecuentes</a>
          <a href="#">Contacto</a>
        </div>
        <div className="footer-col">
          <h4>EMPRESA</h4>
          <a href="#">Sobre Casio México</a>
          <a href="#">Términos y condiciones</a>
          <a href="#">Aviso de privacidad</a>
          <a href="#">Distribuidores</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Casio Mexico — Distribuidor Autorizado</p>
        <div className="payments">
          <span>Visa</span>
          <span>Mastercard</span>
          <span>OXXO</span>
          <span>SPEI</span>
          <span>Amex</span>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #050505;
          border-top: 1px solid #111;
          margin-top: 0;
        }
        .footer-inner {
          max-width: 1600px;
          margin: 0 auto;
          padding: 5rem 2rem 3rem;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 4rem;
        }
        .footer-brand img {
          height: 28px;
          filter: brightness(0) invert(1);
          margin-bottom: 1.2rem;
          display: block;
        }
        .footer-brand p {
          color: #444;
          font-size: 0.82rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .social-links { display: flex; gap: 0.8rem; }
        .social-links a {
          width: 34px;
          height: 34px;
          border: 1px solid #222;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
          font-size: 0.7rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
          letter-spacing: 0;
        }
        .social-links a:hover { border-color: #e8001a; color: #e8001a; }
        .footer-col h4 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.2em;
          color: #fff;
          margin-bottom: 1.5rem;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid #111;
        }
        .footer-col a {
          display: block;
          color: #444;
          text-decoration: none;
          font-size: 0.82rem;
          margin-bottom: 0.7rem;
          transition: color 0.2s;
          letter-spacing: 0.03em;
        }
        .footer-col a:hover { color: #e8001a; }
        .footer-bottom {
          max-width: 1600px;
          margin: 0 auto;
          padding: 1.5rem 2rem;
          border-top: 1px solid #0e0e0e;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-bottom p { color: #2a2a2a; font-size: 0.75rem; }
        .payments { display: flex; gap: 0.5rem; }
        .payments span {
          color: #2a2a2a;
          font-size: 0.68rem;
          background: #0d0d0d;
          padding: 0.3rem 0.5rem;
          border: 1px solid #111;
        }
        @media (max-width: 900px) {
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; gap: 1rem; }
        }
      `}</style>
    </footer>
  );
}
