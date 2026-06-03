import Link from "next/link";
import { useState } from "react";
import { useCart } from "../lib/CartContext";

export default function Navbar() {
  const { count, cart, total, cartOpen, setCartOpen, removeFromCart, updateQty } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/categoria/g-shock", label: "G-SHOCK" },
    { href: "/categoria/premium", label: "RELOJES" },
    { href: "/categoria/todos", label: "CATÁLOGO" },
    { href: "/categoria/mujer", label: "MUJER" },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <img src="https://casio-mexico.myshopify.com/cdn/shop/files/Logo-Casio.png?height=68&v=1776185193" alt="Casio Mexico" />
          </Link>

          {/* Links desktop */}
          <ul className="nav-links">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>

          {/* Acciones */}
          <div className="nav-actions">
            <button className="cart-btn" onClick={() => setCartOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>
            <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</Link>
            ))}
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      <div className={`cart-overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Mi Carrito ({count})</h2>
          <button onClick={() => setCartOpen(false)}>✕</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío</p>
              <Link href="/categoria/todos" onClick={() => setCartOpen(false)}>Ver productos →</Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.key} className="cart-item">
                <img src={item.product.images[0]} alt={item.product.name} />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.product.name}</p>
                  {item.variant && <p className="cart-item-variant">{item.variant}</p>}
                  <div className="cart-item-controls">
                    <div className="qty-controls">
                      <button onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                    </div>
                    <span className="cart-item-price">
                      ${(item.product.price * item.qty).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.key)}>✕</button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</span>
            </div>
            <Link href="/checkout" className="checkout-btn" onClick={() => setCartOpen(false)}>
              PROCEDER AL PAGO
            </Link>
          </div>
        )}
      </aside>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: #0a0a0a;
          border-bottom: 1px solid #222;
        }
        .nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }
        .nav-logo img {
          height: 36px;
          width: auto;
          filter: brightness(0) invert(1);
        }
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2.5rem;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          color: #ccc;
          text-decoration: none;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.1em;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: #e8001a; }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .cart-btn {
          position: relative;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 0.5rem;
        }
        .cart-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: #e8001a;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }
        .burger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #fff;
        }
        .mobile-menu {
          display: flex;
          flex-direction: column;
          padding: 1rem 2rem;
          border-top: 1px solid #222;
          gap: 1rem;
        }
        .mobile-menu a {
          color: #ccc;
          text-decoration: none;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 0.1em;
        }
        /* Cart Drawer */
        .cart-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 1999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .cart-overlay.open { opacity: 1; pointer-events: all; }
        .cart-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 420px;
          max-width: 100vw;
          background: #111;
          z-index: 2000;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
          display: flex;
          flex-direction: column;
          border-left: 1px solid #222;
        }
        .cart-drawer.open { transform: translateX(0); }
        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #222;
        }
        .cart-header h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 0.1em;
          color: #fff;
          margin: 0;
        }
        .cart-header button {
          background: none;
          border: none;
          color: #999;
          font-size: 1.2rem;
          cursor: pointer;
        }
        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 2rem;
        }
        .cart-empty {
          text-align: center;
          padding: 3rem 0;
          color: #666;
        }
        .cart-empty a {
          color: #e8001a;
          text-decoration: none;
          display: block;
          margin-top: 1rem;
        }
        .cart-item {
          display: flex;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid #1e1e1e;
          position: relative;
        }
        .cart-item img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          background: #1a1a1a;
        }
        .cart-item-info { flex: 1; }
        .cart-item-name {
          font-size: 0.8rem;
          color: #ccc;
          margin: 0 0 0.3rem;
          line-height: 1.3;
        }
        .cart-item-variant {
          font-size: 0.7rem;
          color: #666;
          margin: 0 0 0.5rem;
        }
        .cart-item-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .qty-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #1e1e1e;
          border-radius: 4px;
          overflow: hidden;
        }
        .qty-controls button {
          background: none;
          border: none;
          color: #ccc;
          padding: 0.3rem 0.6rem;
          cursor: pointer;
          font-size: 1rem;
        }
        .qty-controls span {
          font-size: 0.85rem;
          color: #fff;
          min-width: 20px;
          text-align: center;
        }
        .cart-item-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          color: #fff;
          letter-spacing: 0.05em;
        }
        .remove-btn {
          position: absolute;
          top: 1rem;
          right: 0;
          background: none;
          border: none;
          color: #444;
          cursor: pointer;
          font-size: 0.8rem;
        }
        .cart-footer {
          padding: 1.5rem 2rem;
          border-top: 1px solid #222;
          background: #0a0a0a;
        }
        .cart-total {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.08em;
          color: #fff;
        }
        .checkout-btn {
          display: block;
          background: #e8001a;
          color: #fff;
          text-align: center;
          padding: 1rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.15em;
          text-decoration: none;
          transition: background 0.2s;
        }
        .checkout-btn:hover { background: #c0001a; }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .burger { display: flex; }
        }
      `}</style>
    </>
  );
}
