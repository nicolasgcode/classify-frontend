import styles from './ShoppingCart.module.css';
import { useCartStore } from '../../store';

export function ShoppingCart() {
  const { items, removeItem } = useCartStore((state) => state);

  // Calcular el total
  const total = items.reduce((acc, course) => acc + course.price, 0).toFixed(2); // Aseguramos que el total tenga dos decimales

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Cart</h1>
      </div>

      {items.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {items.map((course, index) => (
              <li key={index} className={styles.courseItem}>
                <div className={styles.courseHeader}>
                  <strong>{course.title}</strong>
                  <span className={styles.coursePrice}>Price: ${course.price.toFixed(2)}</span>
                  <button className={styles.removeBtn} onClick={() => removeItem(course.id)}>
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.total}>
            <strong>Total: ${total}</strong>
          </div>
        </>
      )}

      <button className={styles.checkoutBtn}>Checkout</button>
    </div>
  );
}
