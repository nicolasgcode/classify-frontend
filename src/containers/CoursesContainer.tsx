import { useEffect, useState } from 'react'
import { loadCourses } from '../utils'
import { CourseData } from '../types'
import { CourseList }  from '../components'


const CoursesContainer: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    loadCourses(setCourses, setError, setIsLoading);
  }, []);

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCourses = courses.filter((course) =>
    `${course.title}`
      .toLowerCase()
      .includes(searchTerm)
  );

  return (
    <CourseList courses = {filteredCourses} isLoading = {isLoading} error={error} handleSearch={handleSearch}
      searchTerm={searchTerm}/>
  )
}


export default CoursesContainer;