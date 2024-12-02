import { UnitForm } from '../components'; 
import { useCourseStore } from '../store'
import { addUnitToCourse, updateUnit } from '../services';
import { useState } from 'react';
import { Unit } from '../types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
});

export type UnitFields = z.infer<typeof schema>;

type UnitFormProps = {
  unit? : Unit
  handleCancelEdit?: () => void;
}

function AddUnitContainer({ unit, handleCancelEdit }: UnitFormProps) {
  const courseId = useCourseStore((state) => state.courseId);
  const [error, setError] = useState <string | null>(null);
  const [success, setSuccess] = useState <string | null>(null);
  
  const { register, handleSubmit, reset, formState: {errors, isSubmitting}, } = useForm<UnitFields>({defaultValues: unit ? {
    title: unit.title,
    description: unit.description,
    content: unit.content,
  } : undefined, 
  resolver: zodResolver(schema)});

  async function onSubmit(data: UnitFields) {
    if (unit) {
      try {
        await updateUnit(unit.id, data);
        setSuccess('Unit updated successfully!');
        setError(null);
      } catch {
        setError('Error updating unit, please try again');
        setSuccess(null);
      }
    } else {
    try {
      await addUnitToCourse(courseId, data);
      setSuccess('Unit added successfully!');
      setError(null);
      reset();

    } catch {
      setError('Error adding unit, please try again');
      setSuccess(null);
    }
    }
  };

  return (
    <div>
      {courseId && (
        <UnitForm
          register = {register}
          onSubmit = {handleSubmit(onSubmit)}
          errors = {errors}
          error={error}
          success={success}
          isSubmitting = {isSubmitting}
          unit={unit}
          courseId={Number(courseId)} 
          handleCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
}

export default AddUnitContainer;





