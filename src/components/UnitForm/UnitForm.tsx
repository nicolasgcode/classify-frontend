import { useState } from 'react';
import { UnitFormProps, Level, Unit } from '../../types';
import { addUnitToLevel } from '../../services'; 
import { useForm } from '../../hooks'; 
import styles from './UnitForm.module.css';
import { useNavigate } from 'react-router-dom';

function validateUnitFields(values: Unit) {
  const errors: { [key: string]: string } = {};

  if (!values.title) {
    errors.title = 'Title is required';
  }

  if (!values.description) {
    errors.description = 'Description is required';
  }

  if (!values.content) {
    errors.content = 'Content is required';
  }

  return errors;
}

function UnitForm({ courseId }: UnitFormProps) {
  const { values, handleChange, reset, errors, handleSubmit } = useForm<Unit>(
    { title: '', description: '', content: '' },
    validateUnitFields
  );

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const seeUnits = () => {
    navigate(`/see-units`);
  };

  const handleUnitSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evitar que se recargue la página al enviar el formulario
    if (handleSubmit(e)) {
      try {
          await addUnitToLevel(courseId, values); // Se pasa el levelId al servicio
          setSuccess('Unit added successfully!');
          setError(null);
          reset(); // Limpiar los datos del formulario después de enviar
      } catch (err) {
        setError('Error adding unit: ' + (err as Error).message);
        setSuccess(null);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add Unit</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form className={styles.form} onSubmit={handleUnitSubmit}>
        <div>
          <label htmlFor="title">Unit Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            required
            className={styles.input}
          />
          {errors.title && <div className="fieldError">{errors.title}</div>}
        </div>

        <div>
          <label htmlFor="description">Unit Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            required
            className={styles.input}
          />
          {errors.description && <div className="fieldError">{errors.description}</div>}
        </div>

        <div>
          <label htmlFor="content">Unit Content</label>
          <textarea
            id="content"
            name="content"
            value={values.content}
            onChange={handleChange}
            required
            className={styles.input}
          />
          {errors.content && <div className="fieldError">{errors.content}</div>}
        </div>

        <button type="submit" className={styles.btn}>Add Unit</button>
        <button type="button" onClick={seeUnits} className={styles.btn}>See units</button>
      </form>
    </div>
  );
}

export default UnitForm;






