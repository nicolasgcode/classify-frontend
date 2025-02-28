import { useState } from 'react';

type ValidateFunction<T> = (values: T) => { [key: string]: string };

export function useForm<T>(initialValues: T, validate: ValidateFunction<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, selectedOptions } =
      e.target as HTMLSelectElement;

    if (type === 'select-one' || type === 'select-multiple') {
      // Si es un select de una o más opciones (por ejemplo, topics o level)
      if (name === 'topics') {
        // Para los selects múltiples, recogemos todos los valores seleccionados
        const selectedIds = Array.from(selectedOptions).map(
          (option) => option.value
        );
        // Actualiza el estado correspondiente a 'topics'
        setValues((prevValues) => ({
          ...prevValues,
          [name]: selectedIds, // 'topics' se actualiza con los IDs seleccionados
        }));
      } else if (name === 'level') {
        // Si el campo es 'level', lo tratamos como un campo de texto simple
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value, // Actualiza el valor de 'level' con el valor seleccionado
        }));
      }
    } else {
      // Si es un campo de texto (por ejemplo, 'title' o 'price')
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
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
