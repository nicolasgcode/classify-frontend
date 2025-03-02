import { UserListProps } from '../../types';
import styles from './UserList.module.css';

export default function UserList({
  users,
  isLoading,
  error,
  onEdit,
  onDelete,
}: UserListProps) {
  if (isLoading) {
    return <div className={styles.container}>Loading users...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error: {error}</div>;
  }

  if (!Array.isArray(users)) {
    return <div className={styles.container}>Error: users is not an array</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>
      <ul className={styles.userList}>
        {users.map((user, index) => (
          <li key={index} className={styles.userItem}>
            {user.admin && (
              <div className={styles.adminHeader}>
                <strong>Admin</strong>
              </div>
            )}
            <div className={styles.userHeader}>
              <strong>
                {user.name} {user.surname}
              </strong>
            </div>
            <div className={styles.userEmail}>
              <span>{user.email}</span>
            </div>
            {!user.admin && (
              <div className={styles.purchaseRecord}>
                <h3>Course Purchase Records:</h3>
                {Array.isArray(user.orders) && user.orders.length > 0 ? (
                  <div>
                    {user.orders.map((order, purchaseIndex) => (
                      <div
                        key={order.id || purchaseIndex}
                        className={styles.purchaseItem}
                      >
                        <div>
                          <strong>Purchase date:</strong>{' '}
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                        <div>
                          <strong>Courses:</strong>
                          <ul
                            style={{
                              listStyleType: 'none',
                              paddingLeft: '0',
                            }}
                          >
                            {order.orderLines.map((orderLine, index) => (
                              <li key={index}>{orderLine.course.title}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No purchase records available.</p>
                )}
              </div>
            )}

            <div className={styles.adminButtons}>
              <button className={styles.editBtn} onClick={() => onEdit(user)}>
                Edit
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => onDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
