import styles from './CheckoutSuccess.module.css';

import { useEffect } from 'react';
import { useCartStore } from '../../store';

export function CheckoutSuccess() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className={styles.container}>
      <h1>Checkout Success</h1>
      <p>Thank you for your purchase!</p>
      <a href="/account/myCourses">View Purchase</a>
    </div>
  );
}
