"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

export type CartItem = {
    id: number | string;
    name: string;
    price: number;
    src: string[];
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: number | string) => void;
    updateQuantity: (id: number | string, quantity: number) => void;
    clearCart: () => void;
    subtotal: number;
    totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (newItem: Omit<CartItem, "quantity">) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === newItem.id);
            if (existingItem) {
                return prevCart.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item));
            }
            return [...prevCart, { ...newItem, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number | string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number | string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)));
    };

    const clearCart = () => setCart([]);

    // Instant real-time calculations using useMemo for micro-performance optimization
    const subtotal = useMemo(() => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cart]);

    const totalItems = useMemo(() => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }, [cart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                subtotal,
                totalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}
