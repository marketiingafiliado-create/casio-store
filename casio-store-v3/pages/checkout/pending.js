import Link from "next/link";
import Navbar from "../../components/Navbar";
export default function CheckoutPending() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="result-page">
        <div className="result-icon pending">⏳</div>
        <h1>PAGO PENDIENTE</h1>
        <p>Tu pago está siendo procesado. Te notificaremos por correo cuando sea confirmado. Puede tomar algunos minutos.</p>
        <Link href="/" className="result-btn">IR AL INICIO</Link>
      </div>
      <style jsx>{`
        .result-page { max-width: 500px; margin: 10rem auto; text-align: center; padding: 2rem; }
        .result-icon { width: 90px; height: 90px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 2rem; }
        .result-icon.pending { background: rgba(255,193,7,0.1); color: #ffc107; border: 1px solid rgba(255,193,7,0.2); }
        h1 { font-family: 'Bebas Neue', sans-serif; font-size: 2.8rem; letter-spacing: 0.12em; color: #fff; margin-bottom: 1rem; }
        p { color: #666; margin-bottom: 2.5rem; font-size: 0.88rem; line-height: 1.7; }
        .result-btn { display: inline-block; background: #e8001a; color: #fff; padding: 1rem 2.5rem; font-family: 'Bebas Neue', sans-serif; font-size: 0.95rem; letter-spacing: 0.2em; text-decoration: none; }
      `}</style>
    </div>
  );
}
