import { useState } from "react";
import { useCart } from "../lib/CartContext";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Link from "next/link";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", zip: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) { setError("Completa los campos requeridos."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, buyer: form }),
      });
      const data = await res.json();
      if (data.init_point) { window.location.href = data.init_point; }
      else { setError("Error al procesar el pago. Intenta de nuevo."); }
    } catch { setError("Error de conexión. Intenta de nuevo."); }
    finally { setLoading(false); }
  };

  const shipping = total >= 499 ? 0 : 99;
  const finalTotal = total + shipping;

  if (cart.length === 0) return (
    <div className="page-wrapper">
      <Navbar />
      <div className="empty">
        <h2>CARRITO VACÍO</h2>
        <p>Agrega algunos relojes antes de continuar.</p>
        <Link href="/categoria/todos">VER RELOJES →</Link>
      </div>
      <style jsx>{`
        .empty { max-width: 400px; margin: 12rem auto; text-align: center; padding: 2rem; }
        .empty h2 { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; color: #fff; letter-spacing: 0.1em; margin-bottom: 1rem; }
        .empty p { color: #555; margin-bottom: 2rem; font-size: 0.9rem; }
        .empty a { color: #e8001a; text-decoration: none; font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.15em; font-size: 0.9rem; }
      `}</style>
    </div>
  );

  return (
    <div className="page-wrapper">
      <Head><title>Checkout — Casio Mexico</title></Head>
      <Navbar />

      <div className="checkout-wrap">
        <div className="checkout-header">
          <h1>CHECKOUT</h1>
          <Link href="/categoria/todos" className="back-link">← Seguir comprando</Link>
        </div>

        <div className="checkout-layout">
          {/* Form */}
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h3><span>01</span> INFORMACIÓN DE CONTACTO</h3>
                <div className="form-row-2">
                  <div className="field">
                    <label>Nombre completo *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Juan García" required />
                  </div>
                  <div className="field">
                    <label>Teléfono *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="55 1234 5678" required />
                  </div>
                </div>
                <div className="field">
                  <label>Correo electrónico *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" required />
                </div>
              </div>

              <div className="form-section">
                <h3><span>02</span> DIRECCIÓN DE ENVÍO</h3>
                <div className="field">
                  <label>Calle y número</label>
                  <input name="address" value={form.address} onChange={handleChange} placeholder="Insurgentes Sur 1457, Col. Mixcoac" />
                </div>
                <div className="form-row-3">
                  <div className="field">
                    <label>Ciudad</label>
                    <input name="city" value={form.city} onChange={handleChange} placeholder="Ciudad de México" />
                  </div>
                  <div className="field">
                    <label>Estado</label>
                    <input name="state" value={form.state} onChange={handleChange} placeholder="CDMX" />
                  </div>
                  <div className="field">
                    <label>C.P.</label>
                    <input name="zip" value={form.zip} onChange={handleChange} placeholder="03920" />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3><span>03</span> MÉTODO DE PAGO</h3>
                <div className="mp-card">
                  <div className="mp-header">
                    <div className="mp-logo">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#00b1ea"/>
                        <path d="M7 9h10M7 12h7M7 15h5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <span>Mercado Pago</span>
                    </div>
                    <span className="mp-secure">🔒 Pago seguro</span>
                  </div>
                  <p>Paga con tarjeta de crédito, débito, OXXO, SPEI o saldo Mercado Pago.</p>
                  <div className="mp-methods">
                    {["Visa", "Mastercard", "Amex", "OXXO", "SPEI"].map(m => <span key={m}>{m}</span>)}
                  </div>
                  <div className="mp-msi">✓ Hasta 12 meses sin intereses disponibles</div>
                </div>
              </div>

              {error && <div className="form-error">{error}</div>}

              <button type="submit" className="pay-btn" disabled={loading}>
                {loading ? (
                  <span>PROCESANDO...</span>
                ) : (
                  <span>PAGAR ${finalTotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</span>
                )}
              </button>
              <p className="legal-note">Al continuar aceptas nuestros <a href="#">términos y condiciones</a></p>
            </form>
          </div>

          {/* Summary */}
          <div className="order-summary">
            <h3>RESUMEN DEL PEDIDO</h3>

            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.key} className="s-item">
                  <div className="s-img">
                    <img src={item.product.images[0]} alt={item.product.name} />
                    <span className="s-qty">{item.qty}</span>
                  </div>
                  <div className="s-info">
                    <p>{item.product.name}</p>
                    {item.variant && <span>{item.variant}</span>}
                  </div>
                  <span className="s-price">
                    ${(item.product.price * item.qty).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="s-row">
                <span>Subtotal</span>
                <span>${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="s-row">
                <span>Envío</span>
                <span className={shipping === 0 ? "free" : ""}>{shipping === 0 ? "GRATIS" : `$${shipping}.00 MXN`}</span>
              </div>
              {shipping > 0 && <p className="free-note">Agrega ${(499 - total).toFixed(2)} más para envío gratis</p>}
              <div className="s-row total-row">
                <span>TOTAL</span>
                <span>${finalTotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</span>
              </div>
            </div>

            <div className="trust-mini">
              <div>✓ Relojes 100% originales</div>
              <div>🛡 Garantía oficial 1 año</div>
              <div>↩ Devolución 30 días</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-wrap {
          max-width: 1300px;
          margin: 0 auto;
          padding: 4rem 2rem 6rem;
        }
        .checkout-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #111;
        }
        .checkout-header h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3rem;
          letter-spacing: 0.15em;
          color: #fff;
        }
        .back-link { font-size: 0.8rem; color: #555; text-decoration: none; letter-spacing: 0.05em; transition: color 0.2s; }
        .back-link:hover { color: #e8001a; }

        .checkout-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 3rem;
          align-items: start;
        }

        /* Form */
        .form-section {
          margin-bottom: 2.5rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid #0e0e0e;
        }
        .form-section h3 {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.2em;
          color: #fff;
          margin-bottom: 1.5rem;
        }
        .form-section h3 span {
          background: #e8001a;
          color: #fff;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          flex-shrink: 0;
        }
        .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-row-3 { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1rem; }
        .field { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
        .field label { font-size: 0.68rem; color: #555; letter-spacing: 0.1em; text-transform: uppercase; }
        .field input {
          background: #080808;
          border: 1px solid #1a1a1a;
          border-bottom: 1px solid #222;
          color: #ccc;
          padding: 0.85rem 1rem;
          font-size: 0.88rem;
          font-family: 'Barlow', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }
        .field input:focus { border-color: #e8001a; }
        .field input::placeholder { color: #333; }

        /* MP Card */
        .mp-card {
          background: #080808;
          border: 1px solid #1a1a1a;
          padding: 1.5rem;
        }
        .mp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
        }
        .mp-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.9rem;
          color: #fff;
          font-weight: 500;
        }
        .mp-secure { font-size: 0.7rem; color: #4caf50; }
        .mp-card p { font-size: 0.78rem; color: #666; margin-bottom: 1rem; line-height: 1.5; }
        .mp-methods { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.8rem; }
        .mp-methods span {
          font-size: 0.65rem;
          color: #555;
          border: 1px solid #1a1a1a;
          padding: 0.25rem 0.5rem;
          background: #0d0d0d;
        }
        .mp-msi { font-size: 0.72rem; color: #4caf50; }

        .form-error {
          background: rgba(232,0,26,0.08);
          border: 1px solid rgba(232,0,26,0.2);
          color: #ff6b6b;
          padding: 0.8rem 1rem;
          font-size: 0.82rem;
          margin-bottom: 1.5rem;
        }

        .pay-btn {
          width: 100%;
          background: #e8001a;
          color: #fff;
          border: none;
          padding: 1.3rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 0.25em;
          cursor: pointer;
          transition: background 0.2s;
          margin-bottom: 0.8rem;
        }
        .pay-btn:hover:not(:disabled) { background: #c0001a; }
        .pay-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .legal-note { font-size: 0.7rem; color: #333; text-align: center; }
        .legal-note a { color: #555; }

        /* Summary */
        .order-summary {
          background: #080808;
          border: 1px solid #111;
          padding: 2rem;
          position: sticky;
          top: 115px;
        }
        .order-summary h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.2em;
          color: #fff;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #111;
        }
        .summary-items { margin-bottom: 1.5rem; }
        .s-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.8rem 0;
          border-bottom: 1px solid #0d0d0d;
        }
        .s-img {
          position: relative;
          width: 58px;
          height: 58px;
          flex-shrink: 0;
        }
        .s-img img { width: 100%; height: 100%; object-fit: cover; background: #141414; }
        .s-qty {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #e8001a;
          color: #fff;
          font-size: 0.6rem;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .s-info { flex: 1; }
        .s-info p { font-size: 0.75rem; color: #ccc; line-height: 1.3; margin: 0 0 0.2rem; }
        .s-info span { font-size: 0.68rem; color: #555; }
        .s-price { font-family: 'Bebas Neue', sans-serif; font-size: 0.95rem; color: #fff; white-space: nowrap; }

        .summary-totals { border-top: 1px solid #111; padding-top: 1rem; }
        .s-row {
          display: flex;
          justify-content: space-between;
          padding: 0.45rem 0;
          font-size: 0.8rem;
          color: #666;
        }
        .free { color: #4caf50; font-weight: 600; }
        .free-note { font-size: 0.68rem; color: #555; margin: 0.2rem 0 0.4rem; text-align: right; }
        .total-row {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          color: #fff;
          letter-spacing: 0.08em;
          border-top: 1px solid #1a1a1a;
          margin-top: 0.5rem;
          padding-top: 1rem;
        }

        .trust-mini {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #0e0e0e;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .trust-mini div { font-size: 0.72rem; color: #444; }

        @media (max-width: 900px) {
          .checkout-layout { grid-template-columns: 1fr; }
          .order-summary { position: static; }
          .form-row-2 { grid-template-columns: 1fr; }
          .form-row-3 { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}
