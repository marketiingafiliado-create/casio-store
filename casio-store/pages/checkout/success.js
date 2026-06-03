import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { useCart } from "../../lib/CartContext";

export default function CheckoutSuccess() {
  const { clearCart } = useCart();
  useEffect(() => { clearCart(); }, []);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="result-page">
        <div className="result-icon success">✓</div>
        <h1>¡PAGO EXITOSO!</h1>
        <p>Tu pedido ha sido confirmado. Recibirás un correo con los detalles de tu compra.</p>
        <Link href="/" className="result-btn">SEGUIR COMPRANDO</Link>
      </div>
      <style jsx>{`
        .result-page {
          max-width: 500px;
          margin: 8rem auto;
          text-align: center;
          padding: 2rem;
        }
        .result-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 2rem;
        }
        .result-icon.success { background: rgba(76,175,80,0.15); color: #4caf50; border: 2px solid #4caf50; }
        h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          letter-spacing: 0.15em;
          color: #fff;
          margin-bottom: 1rem;
        }
        p { color: #888; margin-bottom: 2rem; }
        .result-btn {
          background: #e8001a;
          color: #fff;
          padding: 0.9rem 2rem;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.15em;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
