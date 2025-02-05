import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Interfaz para el store del carrito
interface CartStore {
  items: number[]; // Lista de IDs de los cursos en el carrito
  addItem: (courseId: number) => void; // Agregar un curso al carrito
  removeItem: (courseId: number) => void; // Eliminar un curso del carrito
  getTotalItems: () => number; // Obtener el número total de cursos en el carrito
}

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      items: [], // Lista vacía por defecto
      addItem: (courseId: number) =>
        set((state) => {
          const updatedItems = [...state.items, courseId]; // Agregar un curso al carrito
          return { items: updatedItems };
        }),
      removeItem: (courseId: number) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item !== courseId); // Eliminar un curso del carrito
          return { items: updatedItems };
        }),
      getTotalItems: () => {
        return 0;
      },
    }),
    {
      name: 'cart-items', // Nombre de la clave en localStorage
    }
  )
);
