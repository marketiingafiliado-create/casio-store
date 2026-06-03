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
        <p>Tu pedido ha sido confirmado. Recibirás un correo con los detalles y número de seguimiento en breve.</p>
        <Link href="/" className="result-btn">SEGUIR COMPRANDO</Link>
      </div>
      <style jsx>{`
        .result-page { max-width: 500px; margin: 10rem auto; text-align: center; padding: 2rem; }
        .result-icon { width: 90px; height: 90px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 2rem; }
        .result-icon.success { background: rgba(76,175,80,0.1); color: #4caf50; border: 1px solid rgba(76,175,80,0.3); }
        h1 { font-family: 'Bebas Neue', sans-serif; font-size: 2.8rem; letter-spacing: 0.12em; color: #fff; margin-bottom: 1rem; }
        p { color: #666; margin-bottom: 2.5rem; font-size: 0.88rem; line-height: 1.7; }
        .result-btn { display: inline-block; background: #e8001a; color: #fff; padding: 1rem 2.5rem; font-family: 'Bebas Neue', sans-serif; font-size: 0.95rem; letter-spacing: 0.2em; text-decoration: none; transition: background 0.2s; }
        .result-btn:hover { background: #c0001a; }
      `}</style>
    </div>
  );
}
