import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("casio_cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("casio_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, variant = null, qty = 1) => {
    const key = `${product.id}-${variant || "default"}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => i.key === key ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { key, product, variant, qty }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  };

  const updateQty = (key, qty) => {
    if (qty <= 0) return removeFromCart(key);
    setCart((prev) => prev.map((i) => i.key === key ? { ...i, qty } : i));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, count, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
