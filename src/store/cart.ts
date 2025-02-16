import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  id: number;
  title: string;
  price: number;
};

interface CartStore {
  items: CartItem[];
  addItem: (id: number, title: string, price: number) => void;
  removeItem: (id: number) => void;
  getTotalItems: () => number;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      items: [],
      addItem: (id: number, title: string, price: number) =>
        set((state) => {
          const updatedItems = [...state.items, { id, title, price }];
          return { items: updatedItems };
        }),
      removeItem: (id: number) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          return { items: updatedItems };
        }),
      getTotalItems: () => {
        return 0; // Este método no cambia nada si solo necesitas el número de artículos.
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-items',
    }
  )
);
