import Link from "next/link";
import Navbar from "../../components/Navbar";
export default function CheckoutFailure() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="result-page">
        <div className="result-icon failure">✕</div>
        <h1>PAGO FALLIDO</h1>
        <p>Hubo un problema al procesar tu pago. Por favor verifica tus datos e intenta nuevamente.</p>
        <Link href="/checkout" className="result-btn">INTENTAR DE NUEVO</Link>
      </div>
      <style jsx>{`
        .result-page { max-width: 500px; margin: 10rem auto; text-align: center; padding: 2rem; }
        .result-icon { width: 90px; height: 90px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 2rem; }
        .result-icon.failure { background: rgba(232,0,26,0.1); color: #e8001a; border: 1px solid rgba(232,0,26,0.2); }
        h1 { font-family: 'Bebas Neue', sans-serif; font-size: 2.8rem; letter-spacing: 0.12em; color: #fff; margin-bottom: 1rem; }
        p { color: #666; margin-bottom: 2.5rem; font-size: 0.88rem; line-height: 1.7; }
        .result-btn { display: inline-block; background: #e8001a; color: #fff; padding: 1rem 2.5rem; font-family: 'Bebas Neue', sans-serif; font-size: 0.95rem; letter-spacing: 0.2em; text-decoration: none; }
      `}</style>
    </div>
  );
}
