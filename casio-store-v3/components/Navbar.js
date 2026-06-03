import Link from "next/link";
import { useState } from "react";
import { useCart } from "../lib/CartContext";

export default function Navbar() {
  const { count, cart, total, cartOpen, setCartOpen, removeFromCart, updateQty } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const navItems = [
    {
      label: "G-SHOCK",
      href: "/categoria/g-shock",
      sub: ["Novedades", "Series 2100", "Full Metal", "Master of G", "Colaboraciones"],
    },
    {
      label: "RELOJES",
      href: "/categoria/todos",
      sub: ["Todos los Relojes", "Hombres", "Mujer", "Vintage", "Premium"],
    },
    {
      label: "COLECCIÓN",
      href: "/categoria/collection",
      sub: null,
    },
    {
      label: "OUTLET",
      href: "/categoria/todos",
      sub: null,
    },
  ];

  return (
    <>
      <nav
        className="navbar"
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* Top bar */}
        <div className="nav-top">
          <div className="nav-top-inner">
            <span className="nav-top-msg">Distribuidor Autorizado Casio México</span>
            <div className="nav-top-links">
              <a href="#">Mi cuenta</a>
              <a href="#">Rastrear pedido</a>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="nav-main">
          <div className="nav-main-inner">
            <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>

            <Link href="/" className="nav-logo">
              <img
                src="https://casio-mexico.myshopify.com/cdn/shop/files/Logo-Casio.png?height=68&v=1776185193"
                alt="Casio Mexico"
              />
            </Link>

            <ul className="nav-links">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  onMouseEnter={() => item.sub && setActiveMenu(item.label)}
                >
                  <Link href={item.href}>{item.label}</Link>
                  {item.sub && (
                    <div className={`dropdown ${activeMenu === item.label ? "open" : ""}`}>
                      {item.sub.map((s) => (
                        <Link key={s} href={item.href} className="dropdown-item">
                          {s}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="nav-actions">
              <button className="cart-btn" onClick={() => setCartOpen(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {count > 0 && <span className="badge">{count}</span>}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* CART DRAWER */}
      <div className={`overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart ${cartOpen ? "open" : ""}`}>
        <div className="cart-head">
          <h2>CARRITO ({count})</h2>
          <button onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío</p>
              <Link href="/categoria/todos" onClick={() => setCartOpen(false)}>
                Ver relojes →
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.key} className="cart-item">
                <img src={item.product.images[0]} alt={item.product.name} />
                <div className="ci-info">
                  <p className="ci-name">{item.product.name}</p>
                  {item.variant && <p className="ci-var">{item.variant}</p>}
                  <div className="ci-row">
                    <div className="qty">
                      <button onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                    </div>
                    <span className="ci-price">
                      ${(item.product.price * item.qty).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                <button className="ci-remove" onClick={() => removeFromCart(item.key)}>✕</button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-foot">
            <div className="cart-total-row">
              <span>TOTAL</span>
              <span>${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</span>
            </div>
            <Link href="/checkout" className="go-checkout" onClick={() => setCartOpen(false)}>
              PROCEDER AL PAGO
            </Link>
          </div>
        )}
      </aside>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: #000;
        }
        .nav-top {
          border-bottom: 1px solid #111;
          background: #050505;
        }
        .nav-top-inner {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0.4rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-top-msg {
          font-size: 0.7rem;
          color: #555;
          letter-spacing: 0.1em;
        }
        .nav-top-links {
          display: flex;
          gap: 1.5rem;
        }
        .nav-top-links a {
          font-size: 0.7rem;
          color: #555;
          text-decoration: none;
          letter-spacing: 0.08em;
          transition: color 0.2s;
        }
        .nav-top-links a:hover { color: #fff; }
        .nav-main {
          border-bottom: 1px solid #111;
        }
        .nav-main-inner {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }
        .nav-logo img {
          height: 32px;
          filter: brightness(0) invert(1);
        }
        .nav-links {
          display: flex;
          list-style: none;
          height: 100%;
          gap: 0;
          margin: 0;
          padding: 0;
          flex: 1;
          justify-content: center;
        }
        .nav-links li {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .nav-links li > a {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 1.5rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem;
          letter-spacing: 0.15em;
          color: #ccc;
          text-decoration: none;
          transition: color 0.2s;
          border-bottom: 2px solid transparent;
        }
        .nav-links li:hover > a {
          color: #fff;
          border-bottom-color: #e8001a;
        }
        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-top: 2px solid #e8001a;
          min-width: 200px;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-8px);
          transition: all 0.2s;
        }
        .dropdown.open {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
        }
        .dropdown-item {
          display: block;
          padding: 0.7rem 1.2rem;
          font-size: 0.8rem;
          color: #888;
          text-decoration: none;
          letter-spacing: 0.08em;
          border-bottom: 1px solid #111;
          transition: all 0.15s;
        }
        .dropdown-item:hover { color: #fff; background: #111; padding-left: 1.5rem; }
        .nav-actions { display: flex; align-items: center; gap: 1rem; }
        .cart-btn {
          position: relative;
          background: none;
          border: none;
          color: #ccc;
          cursor: pointer;
          padding: 0.5rem;
          transition: color 0.2s;
        }
        .cart-btn:hover { color: #fff; }
        .badge {
          position: absolute;
          top: 2px;
          right: 2px;
          background: #e8001a;
          color: #fff;
          font-size: 0.6rem;
          font-weight: 700;
          width: 15px;
          height: 15px;
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
          padding: 0.4rem;
        }
        .burger span { display: block; width: 20px; height: 1.5px; background: #fff; }

        /* CART */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          z-index: 1999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .overlay.open { opacity: 1; pointer-events: all; }
        .cart {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 400px;
          max-width: 100vw;
          background: #0a0a0a;
          z-index: 2000;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
          display: flex;
          flex-direction: column;
          border-left: 1px solid #1a1a1a;
        }
        .cart.open { transform: translateX(0); }
        .cart-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 1.8rem;
          border-bottom: 1px solid #1a1a1a;
        }
        .cart-head h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 0.15em;
          color: #fff;
        }
        .cart-head button {
          background: none;
          border: none;
          color: #666;
          font-size: 1rem;
          cursor: pointer;
        }
        .cart-body { flex: 1; overflow-y: auto; padding: 1rem 1.8rem; }
        .cart-empty { text-align: center; padding: 4rem 0; color: #555; font-size: 0.85rem; }
        .cart-empty a { display: block; margin-top: 1rem; color: #e8001a; text-decoration: none; }
        .cart-item {
          display: flex;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid #111;
          position: relative;
        }
        .cart-item img { width: 65px; height: 65px; object-fit: cover; background: #141414; flex-shrink: 0; }
        .ci-info { flex: 1; }
        .ci-name { font-size: 0.78rem; color: #bbb; margin: 0 0 0.3rem; line-height: 1.3; padding-right: 1rem; }
        .ci-var { font-size: 0.7rem; color: #555; margin: 0 0 0.6rem; }
        .ci-row { display: flex; align-items: center; justify-content: space-between; }
        .qty { display: flex; align-items: center; background: #111; border: 1px solid #1e1e1e; }
        .qty button { background: none; border: none; color: #ccc; padding: 0.25rem 0.5rem; cursor: pointer; font-size: 0.9rem; }
        .qty span { font-size: 0.8rem; color: #fff; padding: 0 0.3rem; min-width: 18px; text-align: center; }
        .ci-price { font-family: 'Bebas Neue', sans-serif; font-size: 0.95rem; color: #fff; }
        .ci-remove { position: absolute; top: 1rem; right: 0; background: none; border: none; color: #333; cursor: pointer; font-size: 0.75rem; }
        .cart-foot { padding: 1.5rem 1.8rem; border-top: 1px solid #1a1a1a; background: #050505; }
        .cart-total-row {
          display: flex;
          justify-content: space-between;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.1em;
          color: #fff;
          margin-bottom: 1rem;
        }
        .go-checkout {
          display: block;
          background: #e8001a;
          color: #fff;
          text-align: center;
          padding: 1rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.2em;
          text-decoration: none;
          transition: background 0.2s;
        }
        .go-checkout:hover { background: #c0001a; }

        /* MOBILE */
        .mobile-menu {
          position: fixed;
          top: 107px;
          left: 0;
          right: 0;
          background: #000;
          border-bottom: 1px solid #111;
          z-index: 999;
          display: flex;
          flex-direction: column;
        }
        .mobile-menu a {
          padding: 1rem 2rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.15em;
          color: #ccc;
          text-decoration: none;
          border-bottom: 1px solid #111;
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-top { display: none; }
          .burger { display: flex; }
          .nav-main-inner { height: 56px; }
        }
      `}</style>
    </>
  );
}
