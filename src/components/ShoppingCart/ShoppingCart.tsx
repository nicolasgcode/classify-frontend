import styles from './ShoppingCart.module.css';
import { useCartStore, useAuthStore } from '../../store';
import { createCheckout } from '../../services';

export function ShoppingCart() {
  const { items, removeItem } = useCartStore((state) => state);
  const { userId } = useAuthStore((state) => state);

  // Calcular el total
  const total = items.reduce((acc, course) => acc + course.price, 0).toFixed(2);

  async function onSubmit() {
    const data = items.map((course) => ({
      id: course.id,
      name: course.title,
      price: course.price * 100,
    }));
    try {
      const response = await createCheckout(data, userId);
      window.location.href = response.url;
      return response;
    } catch (error) {
      console.log('Error creating checkout, please try again');
      throw error;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Cart</h1>
      </div>

      {items.length === 0 ? (
        <p className={styles.cartEmpty}>Your cart is empty!</p>
      ) : (
        <>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {items.map((course, index) => (
              <li key={index} className={styles.courseItem}>
                <div className={styles.courseHeader}>
                  <strong>{course.title}</strong>
                  <span className={styles.coursePrice}>
                    Price: ${course.price.toFixed(2)}
                  </span>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(course.id)}
                  >
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

      {items.length > 0 && (
        <button className={styles.checkoutBtn} onClick={onSubmit}>
          Checkout
        </button>
      )}
    </div>
  );
}
