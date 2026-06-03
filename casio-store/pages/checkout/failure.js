import Link from "next/link";
import Navbar from "../../components/Navbar";

export function CheckoutFailure() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="result-page">
        <div className="result-icon failure">✕</div>
        <h1>PAGO FALLIDO</h1>
        <p>Hubo un problema al procesar tu pago. Por favor intenta de nuevo.</p>
        <Link href="/checkout" className="result-btn">INTENTAR DE NUEVO</Link>
      </div>
      <style jsx>{`
        .result-page { max-width: 500px; margin: 8rem auto; text-align: center; padding: 2rem; }
        .result-icon { width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 2rem; }
        .result-icon.failure { background: rgba(232,0,26,0.15); color: #e8001a; border: 2px solid #e8001a; }
        h1 { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; letter-spacing: 0.15em; color: #fff; margin-bottom: 1rem; }
        p { color: #888; margin-bottom: 2rem; }
        .result-btn { background: #e8001a; color: #fff; padding: 0.9rem 2rem; font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.15em; text-decoration: none; }
      `}</style>
    </div>
  );
}

export default CheckoutFailure;
