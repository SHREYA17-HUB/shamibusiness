import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./data";

export type Role = "customer" | "vendor" | "admin";
export type SessionUser = { name: string; email: string; role: Role };
export type CartLine = { id: string; qty: number };

type AppState = {
  user: SessionUser | null;
  login: (u: SessionUser) => void;
  logout: () => void;
  cart: CartLine[];
  cartItems: { product: Product; qty: number }[];
  cartCount: number;
  subtotal: number;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
};

const AppContext = createContext<AppState | null>(null);
const KEY = "sbv-state-v1";

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw) as { user: SessionUser | null; cart: CartLine[]; wishlist: string[] };
        setUser(s.user ?? null);
        setCart(s.cart ?? []);
        setWishlist(s.wishlist ?? []);
      } else {
        setCart([
          { id: products[0]!.id, qty: 2 },
          { id: products[8]!.id, qty: 3 },
        ]);
        setWishlist([products[5]!.id, products[11]!.id]);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ user, cart, wishlist }));
  }, [user, cart, wishlist, hydrated]);

  const value = useMemo<AppState>(() => {
    const cartItems = cart
      .map((l) => ({ product: products.find((p) => p.id === l.id)!, qty: l.qty }))
      .filter((l) => l.product);
    return {
      user,
      login: (u) => setUser(u),
      logout: () => setUser(null),
      cart,
      cartItems,
      cartCount: cart.reduce((s, l) => s + l.qty, 0),
      subtotal: cartItems.reduce((s, l) => s + l.product.price * l.qty, 0),
      addToCart: (id, qty = 1) =>
        setCart((c) =>
          c.some((l) => l.id === id)
            ? c.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
            : [...c, { id, qty }],
        ),
      setQty: (id, qty) =>
        setCart((c) => c.map((l) => (l.id === id ? { ...l, qty: Math.max(1, qty) } : l))),
      removeFromCart: (id) => setCart((c) => c.filter((l) => l.id !== id)),
      clearCart: () => setCart([]),
      wishlist,
      toggleWishlist: (id) =>
        setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
    };
  }, [user, cart, wishlist]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}