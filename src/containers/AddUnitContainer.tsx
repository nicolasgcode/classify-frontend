import { useState } from 'react';
import { UnitForm } from '../components'; 
import { useCourseStore } from '../store'
import { Unit } from '../types';

function AddUnitContainer() {
  const courseId = useCourseStore((state) => state.courseId);
  const [unitData, setUnitData] = useState<Unit>({
    title: '',
    description: '',
    content: '',
  });



  return (
    <div>
      {courseId && (
        <UnitForm
          unitData={unitData}
          setUnitData={setUnitData}
          courseId={Number(courseId)} 
        />
      )}
    </div>
  );
}

export default AddUnitContainer;





