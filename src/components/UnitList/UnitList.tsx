import { UnitListProps } from '../../types';

import styles from './UnitList.module.css';

function UnitList({
  units,
  isLoading,
  error,
  handleSearch,
  searchTerm,
  onDeleteUnit,
}: UnitListProps) {


  if (isLoading) {
    return <div className={styles.container}>Loading units...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Units</h1>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search unit by title..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {units.map((unit, index) => (
          <li key={index} className={styles.courseItem}>
            <div className={styles.courseHeader}>
              <div><strong>Title:</strong> {unit.title}</div>
              <div><strong>Description:</strong> {unit.description}</div>
              <div><strong>Content:</strong> {unit.content}</div>
            </div>

            <div className={styles.adminButtons}>
              <button className={styles.editBtn}>
                Edit
              </button>
              <button className={styles.deleteBtn} onClick={() => onDeleteUnit(unit.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UnitList;
