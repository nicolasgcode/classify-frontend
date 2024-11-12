import { useEffect, useState } from 'react'
import { loadCourses } from '../utils'
import { CourseData } from '../types'
import { CourseList }  from '../components'
import { deleteCourse } from '../services'


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

  const handleDelete = async (courseId: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this unit?');
    if (!isConfirmed) {
      return;
    }
    try {
      await deleteCourse(courseId);
      updateList(courseId); // Llama al backend para eliminar la unidad
    } catch (err) {
      setError('Error deleting course: ' + (err as Error).message);
    }
  };

  const updateList = (courseId: number) => {
    setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
  }

  const filteredCourses = courses.filter((course) =>
    `${course.title}`
      .toLowerCase()
      .includes(searchTerm)
  );

  return (
    <CourseList courses = {filteredCourses} isLoading = {isLoading} error={error} handleSearch={handleSearch}
      searchTerm={searchTerm} onDelete={handleDelete}/>
  )
}


export default CoursesContainer;