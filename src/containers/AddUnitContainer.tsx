import { UnitForm } from '../components';
import { useCourseStore } from '../store';
import { addUnitToCourse, updateUnit } from '../services';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddUnitProps, UnitFields } from '../types';
import { unitSchema } from '../utils';
import { useNavigate } from 'react-router-dom';

export function AddUnitContainer({ unit, handleCancelEdit }: AddUnitProps) {
  const courseId = useCourseStore((state) => state.courseId);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UnitFields>({
    defaultValues: unit
      ? {
          title: unit.title,
          description: unit.description,
          content: unit.content,
        }
      : undefined,
    resolver: zodResolver(unitSchema),
  });

  async function onSubmit(data: UnitFields) {
    if (unit) {
      try {
        if (unit.id !== undefined) {
          await updateUnit(unit.id, data);
        } else {
          setError('Unit ID is undefined');
          setSuccess(null);
        }
        setSuccess('Unit updated successfully!');
        setError(null);
      } catch {
        setError('Error updating unit, please try again');
        setSuccess(null);
      }
    } else {
      try {
        if (courseId !== null) {
          await addUnitToCourse(courseId, data);
        } else {
          setError('Course ID is null');
          setSuccess(null);
          console.log('Course ID is null');
        }
        setSuccess('Unit added successfully!');
        console.log(success);
        const confirmed = window.confirm(
          'Unit added successfully! Do you want to add another unit?'
        );
        reset();

        if (!confirmed) {
          navigate('/courses');
        }
      } catch {
        setError('Error adding unit, please try again');
        setSuccess(null);
      }
    }
  }

  return (
    <div>
      {courseId && (
        <UnitForm
          register={register}
          onSubmit={handleSubmit(onSubmit)}
          errors={errors}
          error={error}
          isSubmitting={isSubmitting}
          unit={unit}
          courseId={Number(courseId)}
          handleCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
}
