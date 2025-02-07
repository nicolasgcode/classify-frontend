import { CourseListProps } from '../../types';
import { useAuthStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import { CourseData } from '../../types';
import { useCourseStore, useCartStore } from '../../store';

import styles from './CourseList.module.css';

export default function CourseList({
  courses,
  isLoading,
  error,
  handleSearch,
  searchTerm,
  onDelete,
  onEdit
}: CourseListProps & { onDelete: (courseId: number | undefined) => void; onEdit: (course: CourseData) => void }) {

  const admin = useAuthStore(state => state.admin);
   const { items, addItem, removeItem } = useCartStore();
  const { setCourseId } = useCourseStore();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className={styles.container}>Cargando cursos...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error: {error}</div>;
  }

  if (!Array.isArray(courses)) {
    return <div className={styles.container}>Error: courses is not an array</div>;
  }

  function seeUnits (courseId : number | undefined) {
    setCourseId(courseId);
    navigate('/see-units');
  }

  return (
    <div className={styles.container}>
      {admin && (
        <button className={styles.addCourseBtn} onClick={() => navigate('/add-course')}>
          Add Course
        </button>
      )}

      <div className={styles.header}>
        <h1 className={styles.title}>Courses</h1>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search course by title..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {courses.map((course, index) => (
          <li key={index} className={styles.courseItem}>
            <div className={styles.courseHeader}>
              <strong>{course.title}</strong>
              <span className={styles.coursePrice}>${course.price}</span>
            </div>

            <div className={styles.topics}>
              <h3>Topics:</h3>
              {Array.isArray(course.topics) && course.topics.length > 0 ? (
                <div>
                  {course.topics.map((topic, topicIndex) => (
                    <div key={topic.id || topicIndex} className={styles.topicItem}>
                      {topic.description}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No topics available.</p>
              )}
            </div>

             <div className={styles.units}>
              <h3>Units:</h3>
              {Array.isArray(course.units) && course.units.length > 0 ? (
                <div>
                  {course.units.map((unit, unitIndex) => (
                    <div key={unit.id || unitIndex} className={styles.topicItem}>
                      {unit.title}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No topics available.</p>
              )}
            </div>

           {!admin && (
              <>
                <button 
                  className={`${styles.addBtn} ${items.some(item => item.id === course.id) ? styles.disabled : ''}`} 
                  onClick={() => course.id !== undefined && addItem(course.id, course.title, course.price)} 
                  disabled={items.some(item => item.id === course.id)} 
                >
                  + Add to Cart
                </button>

                {course.id !== undefined && items.some(item => item.id === course.id) && (
                  <button 
                    className={styles.removeBtn} 
                    onClick={() => course.id !== undefined && removeItem(course.id)}
                  >
                    - Remove from Cart
                  </button>
                )}
              </>
            )}
            {admin && (
              <div className={styles.adminButtons}>
                <button className={styles.editBtn} onClick={ ()=> onEdit(course)}>Edit</button>
                <button className={styles.deleteBtn} onClick={() => onDelete(course.id)}>Delete</button>
                <button className={styles.seeUnits} onClick={() => seeUnits(course.id)}>See Units</button>
              </div>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
}

