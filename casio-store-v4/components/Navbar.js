import Link from "next/link";
import { useState } from "react";
import { useCart } from "../lib/CartContext";

export default function Navbar() {
  const { count, cart, total, cartOpen, setCartOpen, removeFromCart, updateQty } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const navItems = [
    { label: "G-SHOCK", href: "/categoria/g-shock", sub: ["Novedades", "Series 2100", "Full Metal", "Master of G", "Digital", "Analógico Digital"] },
    { label: "RELOJES", href: "/categoria/todos", sub: ["Todos los Relojes", "Hombres", "Mujer", "Vintage", "Premium", "Outlet"] },
    { label: "COLECCIÓN", href: "/categoria/collection", sub: ["Collection", "Edifice", "Pro Trek", "Baby-G"] },
    { label: "OUTLET", href: "/categoria/todos", sub: null },
  ];

  return (
    <>
      <nav onMouseLeave={() => setActiveMenu(null)} className="navbar">
        {/* Top bar */}
        <div className="nav-top">
          <div className="nav-top-inner">
            <span>Distribuidor Autorizado Casio México · Envío gratis desde $499 MXN</span>
            <div className="nav-top-right">
              <a href="#">Mi cuenta</a>
              <a href="#">Rastrear pedido</a>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="nav-main">
          <div className="nav-main-inner">
            <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>

            <Link href="/" className="nav-logo">
              <img src="https://casio-mexico.myshopify.com/cdn/shop/files/Logo-Casio.png?height=68&v=1776185193" alt="Casio Mexico" />
            </Link>

            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.label} onMouseEnter={() => item.sub && setActiveMenu(item.label)}>
                  <Link href={item.href}>{item.label}</Link>
                  {item.sub && (
                    <div className={`dropdown ${activeMenu === item.label ? "open" : ""}`}>
                      {item.sub.map((s) => (
                        <Link key={s} href={item.href} className="dd-item">{s}</Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="nav-actions">
              <button className="cart-btn" onClick={() => setCartOpen(true)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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

      {/* CART */}
      <div className={`overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="cd-head">
          <h2>MI CARRITO ({count})</h2>
          <button onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div className="cd-body">
          {cart.length === 0 ? (
            <div className="cd-empty">
              <p>Tu carrito está vacío</p>
              <Link href="/categoria/todos" onClick={() => setCartOpen(false)}>Ver relojes →</Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.key} className="cd-item">
                <img src={item.product.images[0]} alt={item.product.name} />
                <div className="cd-info">
                  <p>{item.product.name}</p>
                  {item.variant && <span className="cd-var">{item.variant}</span>}
                  <div className="cd-row">
                    <div className="qty">
                      <button onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                    </div>
                    <span className="cd-price">${(item.product.price * item.qty).toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
                <button className="cd-remove" onClick={() => removeFromCart(item.key)}>✕</button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cd-foot">
            <div className="cd-total">
              <span>TOTAL</span>
              <span>${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</span>
            </div>
            <Link href="/checkout" className="cd-checkout" onClick={() => setCartOpen(false)}>PROCEDER AL PAGO</Link>
          </div>
        )}
      </aside>

      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
          ))}
        </div>
      )}

      <style jsx>{`
        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: #fff; box-shadow: 0 1px 0 #e8e8e8; }
        .nav-top { background: #1a1a1a; }
        .nav-top-inner {
          max-width: 1600px; margin: 0 auto; padding: 0.45rem 2rem;
          display: flex; justify-content: space-between; align-items: center;
        }
        .nav-top-inner > span { font-size: 0.7rem; color: #999; letter-spacing: 0.08em; }
        .nav-top-right { display: flex; gap: 1.5rem; }
        .nav-top-right a { font-size: 0.7rem; color: #888; text-decoration: none; transition: color 0.2s; }
        .nav-top-right a:hover { color: #fff; }
        .nav-main { border-bottom: 1px solid #eee; }
        .nav-main-inner {
          max-width: 1600px; margin: 0 auto; padding: 0 2rem;
          height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 2rem;
        }
        .nav-logo img { height: 34px; width: auto; }
        .nav-links { display: flex; list-style: none; height: 100%; margin: 0; padding: 0; }
        .nav-links li { position: relative; height: 100%; display: flex; align-items: center; }
        .nav-links li > a {
          display: flex; align-items: center; height: 100%; padding: 0 1.4rem;
          font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; letter-spacing: 0.12em;
          color: #333; text-decoration: none; border-bottom: 3px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .nav-links li:hover > a { color: #e8001a; border-bottom-color: #e8001a; }
        .dropdown {
          position: absolute; top: 100%; left: 0; background: #fff;
          border: 1px solid #e8e8e8; border-top: 3px solid #e8001a;
          min-width: 200px; box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          opacity: 0; pointer-events: none; transform: translateY(-6px);
          transition: all 0.2s; z-index: 100;
        }
        .dropdown.open { opacity: 1; pointer-events: all; transform: translateY(0); }
        .dd-item {
          display: block; padding: 0.7rem 1.2rem; font-size: 0.82rem; color: #555;
          text-decoration: none; border-bottom: 1px solid #f5f5f5; transition: all 0.15s;
          letter-spacing: 0.04em;
        }
        .dd-item:hover { color: #e8001a; background: #fafafa; padding-left: 1.5rem; }
        .nav-actions { display: flex; align-items: center; gap: 1rem; }
        .cart-btn {
          position: relative; background: none; border: none; color: #333;
          cursor: pointer; padding: 0.5rem; transition: color 0.2s;
        }
        .cart-btn:hover { color: #e8001a; }
        .badge {
          position: absolute; top: 0; right: 0; background: #e8001a; color: #fff;
          font-size: 0.6rem; font-weight: 700; width: 16px; height: 16px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
        }
        .burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 0.4rem; }
        .burger span { display: block; width: 22px; height: 2px; background: #333; }

        /* CART DRAWER */
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 1999; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
        .overlay.open { opacity: 1; pointer-events: all; }
        .cart-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; width: 400px; max-width: 100vw;
          background: #fff; z-index: 2000; transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
          display: flex; flex-direction: column; border-left: 1px solid #e8e8e8;
          box-shadow: -4px 0 24px rgba(0,0,0,0.08);
        }
        .cart-drawer.open { transform: translateX(0); }
        .cd-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.5rem 1.8rem; border-bottom: 1px solid #eee;
        }
        .cd-head h2 { font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; letter-spacing: 0.15em; color: #1a1a1a; }
        .cd-head button { background: none; border: none; color: #999; font-size: 1rem; cursor: pointer; }
        .cd-body { flex: 1; overflow-y: auto; padding: 1rem 1.8rem; }
        .cd-empty { text-align: center; padding: 4rem 0; color: #999; font-size: 0.85rem; }
        .cd-empty a { display: block; margin-top: 1rem; color: #e8001a; text-decoration: none; }
        .cd-item { display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid #f5f5f5; position: relative; }
        .cd-item img { width: 68px; height: 68px; object-fit: cover; background: #f5f5f5; flex-shrink: 0; border: 1px solid #eee; }
        .cd-info { flex: 1; }
        .cd-info p { font-size: 0.8rem; color: #333; margin: 0 0 0.3rem; line-height: 1.3; padding-right: 1rem; }
        .cd-var { font-size: 0.7rem; color: #999; display: block; margin-bottom: 0.5rem; }
        .cd-row { display: flex; align-items: center; justify-content: space-between; }
        .qty { display: flex; align-items: center; border: 1px solid #e8e8e8; }
        .qty button { background: none; border: none; color: #555; padding: 0.25rem 0.6rem; cursor: pointer; font-size: 0.9rem; }
        .qty button:hover { background: #f5f5f5; }
        .qty span { font-size: 0.82rem; color: #333; padding: 0 0.4rem; min-width: 20px; text-align: center; }
        .cd-price { font-family: 'Bebas Neue', sans-serif; font-size: 1rem; color: #1a1a1a; }
        .cd-remove { position: absolute; top: 1rem; right: 0; background: none; border: none; color: #ccc; cursor: pointer; font-size: 0.75rem; }
        .cd-remove:hover { color: #e8001a; }
        .cd-foot { padding: 1.5rem 1.8rem; border-top: 1px solid #eee; background: #fafafa; }
        .cd-total { display: flex; justify-content: space-between; font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; letter-spacing: 0.08em; color: #1a1a1a; margin-bottom: 1rem; }
        .cd-checkout { display: block; background: #e8001a; color: #fff; text-align: center; padding: 1rem; font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; letter-spacing: 0.2em; text-decoration: none; transition: background 0.2s; }
        .cd-checkout:hover { background: #c0001a; }

        .mobile-menu { position: fixed; top: 107px; left: 0; right: 0; background: #fff; border-bottom: 1px solid #eee; z-index: 999; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .mobile-menu a { display: block; padding: 1rem 2rem; font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; letter-spacing: 0.12em; color: #333; text-decoration: none; border-bottom: 1px solid #f5f5f5; }
        .mobile-menu a:hover { color: #e8001a; background: #fafafa; }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-top { display: none; }
          .burger { display: flex; }
          .nav-main-inner { height: 58px; }
          .page-wrapper { padding-top: 59px; }
        }
      `}</style>
    </>
  );
}
