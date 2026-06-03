import { useState } from "react";
import { useCart } from "../lib/CartContext";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Link from "next/link";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", state: "", zip: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError("Por favor completa todos los campos requeridos.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, buyer: form }),
      });
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        setError("Error al procesar el pago. Intenta de nuevo.");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="empty-checkout">
          <h2>Tu carrito está vacío</h2>
          <Link href="/categoria/todos" className="btn-back">Ver productos</Link>
        </div>
        <style jsx>{`
          .empty-checkout {
            max-width: 400px;
            margin: 10rem auto;
            text-align: center;
            padding: 2rem;
          }
          .empty-checkout h2 {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 2rem;
            color: #fff;
            margin-bottom: 1.5rem;
          }
          .btn-back {
            background: #e8001a;
            color: #fff;
            padding: 0.8rem 2rem;
            font-family: 'Bebas Neue', sans-serif;
            letter-spacing: 0.1em;
            text-decoration: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Head>
        <title>Checkout — Casio Mexico</title>
      </Head>
      <Navbar />

      <div className="checkout-page">
        <h1 className="checkout-title">CHECKOUT</h1>

        <div className="checkout-layout">
          {/* Form */}
          <div className="checkout-form-col">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>INFORMACIÓN DE CONTACTO</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre completo *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Juan García" required />
                  </div>
                  <div className="form-group">
                    <label>Teléfono *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="55 1234 5678" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" required />
                </div>
              </div>

              <div className="form-section">
                <h3>DIRECCIÓN DE ENVÍO</h3>
                <div className="form-group">
                  <label>Dirección</label>
                  <input name="address" value={form.address} onChange={handleChange} placeholder="Calle, número, colonia" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Ciudad</label>
                    <input name="city" value={form.city} onChange={handleChange} placeholder="Ciudad de México" />
                  </div>
                  <div className="form-group">
                    <label>Estado</label>
                    <input name="state" value={form.state} onChange={handleChange} placeholder="CDMX" />
                  </div>
                  <div className="form-group">
                    <label>C.P.</label>
                    <input name="zip" value={form.zip} onChange={handleChange} placeholder="06600" />
                  </div>
                </div>
              </div>

              {error && <div className="form-error">{error}</div>}

              <div className="payment-methods">
                <h3>MÉTODO DE PAGO</h3>
                <div className="mp-banner">
                  <div className="mp-logo">💳 Mercado Pago</div>
                  <p>Paga con tarjeta de crédito, débito, OXXO, transferencia bancaria o saldo de Mercado Pago.</p>
                  <div className="mp-methods">
                    <span>Visa</span>
                    <span>Mastercard</span>
                    <span>OXXO</span>
                    <span>SPEI</span>
                    <span>Amex</span>
                  </div>
                </div>
              </div>

              <button type="submit" className="pay-btn" disabled={loading}>
                {loading ? "PROCESANDO..." : `PAGAR $${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN`}
              </button>

              <p className="secure-note">
                🔒 Pago 100% seguro procesado por Mercado Pago
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>RESUMEN DE PEDIDO</h3>
            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.key} className="summary-item">
                  <img src={item.product.images[0]} alt={item.product.name} />
                  <div className="summary-item-info">
                    <p>{item.product.name}</p>
                    {item.variant && <span>{item.variant}</span>}
                    <span>Cant: {item.qty}</span>
                  </div>
                  <span className="summary-item-price">
                    ${(item.product.price * item.qty).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span className="free-ship">{total >= 499 ? "GRATIS" : "$99 MXN"}</span>
              </div>
              <div className="summary-row total-row">
                <span>TOTAL</span>
                <span>${(total >= 499 ? total : total + 99).toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }
        .checkout-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3rem;
          letter-spacing: 0.15em;
          color: #fff;
          margin-bottom: 3rem;
          border-bottom: 1px solid #1a1a1a;
          padding-bottom: 1.5rem;
        }
        .checkout-layout {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 3rem;
          align-items: start;
        }
        .form-section {
          margin-bottom: 2.5rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid #111;
        }
        .form-section h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.2em;
          color: #fff;
          margin-bottom: 1.5rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }
        .form-group label {
          font-size: 0.72rem;
          color: #666;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .form-group input {
          background: #0f0f0f;
          border: 1px solid #222;
          color: #ccc;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          font-family: var(--font-body);
          transition: border-color 0.2s;
          outline: none;
        }
        .form-group input:focus { border-color: #e8001a; }
        .form-error {
          background: rgba(232,0,26,0.1);
          border: 1px solid rgba(232,0,26,0.3);
          color: #ff6b6b;
          padding: 0.8rem 1rem;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }
        .payment-methods { margin-bottom: 2rem; }
        .payment-methods h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.2em;
          color: #fff;
          margin-bottom: 1rem;
        }
        .mp-banner {
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          padding: 1.5rem;
        }
        .mp-logo {
          font-size: 1rem;
          color: #fff;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .mp-banner p { font-size: 0.8rem; color: #666; margin-bottom: 1rem; }
        .mp-methods { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .mp-methods span {
          background: #111;
          border: 1px solid #222;
          color: #666;
          font-size: 0.7rem;
          padding: 0.3rem 0.6rem;
          border-radius: 3px;
        }
        .pay-btn {
          width: 100%;
          background: #e8001a;
          color: #fff;
          border: none;
          padding: 1.2rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.2em;
          cursor: pointer;
          transition: background 0.2s;
          margin-bottom: 1rem;
        }
        .pay-btn:hover:not(:disabled) { background: #c0001a; }
        .pay-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .secure-note { font-size: 0.75rem; color: #555; text-align: center; }

        /* Summary */
        .order-summary {
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          padding: 2rem;
          position: sticky;
          top: 90px;
        }
        .order-summary h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.2em;
          color: #fff;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #1a1a1a;
          padding-bottom: 1rem;
        }
        .summary-items { margin-bottom: 1.5rem; }
        .summary-item {
          display: flex;
          gap: 1rem;
          padding: 0.8rem 0;
          border-bottom: 1px solid #111;
          align-items: center;
        }
        .summary-item img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          background: #1a1a1a;
          flex-shrink: 0;
        }
        .summary-item-info { flex: 1; }
        .summary-item-info p { font-size: 0.78rem; color: #ccc; margin-bottom: 0.3rem; line-height: 1.3; }
        .summary-item-info span { font-size: 0.7rem; color: #555; display: block; }
        .summary-item-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          color: #fff;
          white-space: nowrap;
        }
        .summary-totals { border-top: 1px solid #1a1a1a; padding-top: 1rem; }
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          font-size: 0.85rem;
          color: #888;
        }
        .free-ship { color: #4caf50; font-size: 0.8rem; font-weight: 600; }
        .total-row {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          color: #fff;
          letter-spacing: 0.08em;
          border-top: 1px solid #222;
          margin-top: 0.5rem;
          padding-top: 0.8rem;
        }

        @media (max-width: 900px) {
          .checkout-layout { grid-template-columns: 1fr; }
          .order-summary { position: static; }
        }
      `}</style>
    </div>
  );
}
