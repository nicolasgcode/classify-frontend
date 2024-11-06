import { useState } from 'react';
import { useForm } from '../hooks';
import { createCourse } from '../services';
import { CourseForm } from '../components';
import { CourseData } from '../types';


const validateCourseFields = (values: CourseData) => {
  const errors: { [key: string]: string } = {};

  if (!values.title) {
    errors.title = 'Title is required';
  }

  if (!values.price) {
    errors.price = 'Price is required';
  }

  if (!values.levels) {
    errors.levels = 'Levels cannot be empty';
  }

  if (!values.topics) {
    errors.topics = 'Topics cannot be empty';
  }

  return errors;
};

const AddContainer: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { values, handleChange, reset, errors, handleSubmit } = useForm<CourseData>(
    {
      title: '',
      price: 0,
      topics: [],
      levels: [],
    },
    validateCourseFields
  );

  const submitForm = async () => {
    try {
      await createCourse(values);
      setSuccess('Employee added successfully!');
      setError(null); 
      reset(); 
    } catch (err) {
      setError('Error adding employee:' + (err as Error).message);
      setSuccess(null); 
    }
  };

  return (
    <CourseForm
      values={values}
      handleChange={handleChange}
      onSubmit={handleSubmit(submitForm)} 
      success={success}
      errors={errors}
      error={error}
      isEditing={false} 
    />
  );
};

export default AddContainer;
