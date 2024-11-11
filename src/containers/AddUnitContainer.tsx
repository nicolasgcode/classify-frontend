import { useState, useEffect } from 'react';
import { getCourse } from '../services'; 
import { UnitForm } from '../components'; 
import { CourseData, Unit } from '../types';
import { useCourseStore } from '../store'

function AddUnitContainer() {
  const courseId = useCourseStore((state) => state.courseId);
  const [course, setCourse] = useState<CourseData | null>(null);
  const [unitData, setUnitData] = useState<Unit>({
    title: '',
    description: '',
    content: '',
  });
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseDetails = await getCourse(Number(courseId));
        setCourse(courseDetails);
        // Establecer el primer nivel como seleccionado si existen niveles
        if (courseDetails.levels && courseDetails.levels.length > 0) {
          setSelectedLevelId(courseDetails.levels[0].id);
        }
      } catch (err) {
        console.error('Error loading course details:', err);
      }
    };
    fetchCourse();
  }, [courseId]);

  return (
    <div>
      {course && (
        <UnitForm
          unitData={unitData}
          setUnitData={setUnitData}
          levels={course.levels} 
          selectedLevelId={selectedLevelId} 
          setSelectedLevelId={setSelectedLevelId} 
          courseId={Number(courseId)} 
        />
      )}
    </div>
  );
}

export default AddUnitContainer;





