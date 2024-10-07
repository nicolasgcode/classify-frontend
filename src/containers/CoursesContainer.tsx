import { useEffect, useState } from 'react'
import { loadCourses } from '../utils'
import { Course } from '../types'
import { CourseList }  from '../components'


const CoursesContainer: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadCourses(setCourses, setError, setIsLoading);
  }, []);

  return (
    <CourseList courses = {courses} isLoading = {isLoading} error={error}/>
  )
}


export default CoursesContainer;