import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = () => {
    if (items.length === 0) return;

    const itemsList = items
      .map(
        (item) =>
          `${item.name}${item.quantity > 1 ? ` (x${item.quantity})` : ""} - R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}`
      )
      .join("\n");

    const message = `Olá! Gostaria de comprar os seguintes itens:\n\n${itemsList}\n\nTotal: R$ ${totalPrice.toFixed(2).replace(".", ",")}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5514998199235?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
