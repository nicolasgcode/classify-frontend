import { CourseListProps } from '../../types';
import { useAuthStore } from '../../store';
import { useNavigate } from 'react-router-dom';

import styles from './CourseList.module.css';

function CourseList({
  courses,
  isLoading,
  error,
  handleSearch,
  searchTerm,
}: CourseListProps) {

  const admin = useAuthStore(state => state.admin);
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
              <h3>Tópicos:</h3>
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

            {!admin && <button className={styles.addBtn}>Add +</button>}
            {admin && (
              <div className={styles.adminButtons}>
                <button className={styles.editBtn}>Edit</button>
                <button className={styles.deleteBtn}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default CourseList;
