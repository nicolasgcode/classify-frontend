import React from 'react';
import { CourseListProps } from '../../types';

import styles from './CourseList.module.css'

const CourseList: React.FC<CourseListProps> = ({ courses, isLoading, error }) => {

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
      <h1 className={styles.title}>Cursos</h1>
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
                <p>No hay tópicos disponibles.</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default CourseList;