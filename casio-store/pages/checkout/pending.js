import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function CheckoutPending() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="result-page">
        <div className="result-icon pending">⏳</div>
        <h1>PAGO PENDIENTE</h1>
        <p>Tu pago está siendo procesado. Te notificaremos por correo cuando sea confirmado.</p>
        <Link href="/" className="result-btn">IR AL INICIO</Link>
      </div>
      <style jsx>{`
        .result-page { max-width: 500px; margin: 8rem auto; text-align: center; padding: 2rem; }
        .result-icon { width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 2rem; }
        .result-icon.pending { background: rgba(255,193,7,0.15); color: #ffc107; border: 2px solid #ffc107; }
        h1 { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; letter-spacing: 0.15em; color: #fff; margin-bottom: 1rem; }
        p { color: #888; margin-bottom: 2rem; }
        .result-btn { background: #e8001a; color: #fff; padding: 0.9rem 2rem; font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.15em; text-decoration: none; }
      `}</style>
    </div>
  );
}
