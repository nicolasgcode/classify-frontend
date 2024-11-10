import { useState } from 'react';
import { UnitFormProps, Level, Unit } from '../../types';
import { addUnitToLevel } from '../../services'; 
import { useForm } from '../../hooks'; 
import styles from './UnitForm.module.css';

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

function UnitForm({
  levels,
  selectedLevelId,
  setSelectedLevelId,
  courseId,
}: UnitFormProps
  ) {
  const { values, handleChange, reset, errors, handleSubmit } = useForm<Unit>(
    { title: '', description: '', content: '' },
    validateUnitFields
  );

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUnitSubmit = async (e: React.FormEvent) => {
    if (handleSubmit(e)) {
      if (selectedLevelId) {
        try {
          // Llamada al servicio para agregar la unidad al nivel
          await addUnitToLevel(courseId, selectedLevelId, values);
          setSuccess('Unit added successfully!');
          setError(null);
          reset(); // Limpiar los datos del formulario después de enviar
        } catch (err) {
          setError('Error adding unit: ' + (err as Error).message);
          setSuccess(null);
        }
      } else {
        setError('Please select a level.');
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
          <label htmlFor="level">Select Level</label>
          <select
            id="level"
            name="level"
            value={selectedLevelId ?? ''}
            onChange={(e) => setSelectedLevelId(Number(e.target.value))}
            required
            className={styles.input}
          >
            <option value="">Select Level</option>
            {levels.map((level: Level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

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
      </form>
    </div>
  );
}

export default UnitForm;



