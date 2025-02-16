import { loadUserCourses } from '../../utils'
import { useState, useEffect } from 'react';
import { userCourses } from '../../types';
import { useAuthStore } from  '../../store'
import styles from './MyCoursesPage.module.css'

export function MyCoursesPage () {
  const [userCourses, setUserCourses] = useState<userCourses>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userId = useAuthStore(state => state.userId);

  useEffect(() => {
    loadUserCourses(userId, setUserCourses, setError, setIsLoading);
  }, [userId]);

return (
  <div className={styles.coursesContainer}>
    {isLoading && <p className={styles.loadingText}>Loading...</p>}
    {error && <p className={styles.errorText}>{error}</p>}
    
    {userCourses && userCourses.courses.length > 0 ? (
      <ul className={styles.courseList}>
        {userCourses.courses.map((course) => (
          <li key={course.id} className={styles.courseItem}>
            <h3 className={styles.courseTitle}>{course.title}</h3>

            {/* Topics */}
            {course.topics && course.topics.length > 0 && (
              <div className={styles.courseTopics}>
                <h4>Topics:</h4>
                <ul>
                  {course.topics.map((topic) => (
                    <li key={topic.id} className={styles.topicItem}>
                       {topic.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Units */}
            {course.units && course.units.length > 0 && (
              <div className={styles.courseUnits}>
                <h4>Units:</h4>
                <ul>
                  {course.units.map((unit) => (
                    <li key={unit.id} className={styles.unitItem}>
                      <h5>{unit.title}</h5>
                      <p><strong>Description:</strong> {unit.description}</p>
                      <p><strong>Content:</strong> {unit.content}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    ) : (
      <p>No courses found.</p>
    )}
  </div>
);

}