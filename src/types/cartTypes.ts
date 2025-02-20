export type CartItem = {
  id: number;
  title: string;
  price: number;
};

export type CartStore = {
  items: CartItem[];
  addItem: (id: number, title: string, price: number) => void;
  removeItem: (id: number) => void;
  getTotalItems: () => number;
  clearCart: () => void;
};
