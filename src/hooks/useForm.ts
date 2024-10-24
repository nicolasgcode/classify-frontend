import { useState } from 'react';

type ValidateFunction<T> = (values: T) => { [key: string]: string };

function useForm<T>(initialValues: T, validate: ValidateFunction<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit =
    (callback: () => Promise<void>) =>
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      await callback();
    };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    handleChange,
    handleSubmit,
    reset,
    errors,
  };
}

export default useForm;
