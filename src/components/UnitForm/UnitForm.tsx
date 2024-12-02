import { UnitFormProps } from '../../types';
import styles from './UnitForm.module.css';

function UnitForm({ register,
  onSubmit,
  success,
  error,
  errors,
  unit,
  handleCancelEdit,
  }: UnitFormProps) {

  return (
    <div className={styles.container}>
      <h2>{unit ? "Update course unit" : "Add unit to course"}</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form className={styles.form} onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Unit Title</label>
          <input
            type="text"
            id="title"
            {...register('title')}
            required
            className={styles.input}
          />
          {errors.title && <div className="fieldError">{errors.title.message}</div>}
        </div>

        <div>
          <label htmlFor="description">Unit Description</label>
          <input
            type="text"
            id="description"
            {...register('description')}
            required
            className={styles.input}
          />
          {errors.description && <div className="fieldError">{errors.description.message}</div>}
        </div>

        <div>
          <label htmlFor="content">Unit Content</label>
          <textarea
            id="content"
            {...register('content')}
            required
            className={styles.input}
          />
          {errors.content && <div className="fieldError">{errors.content.message}</div>}
        </div>

        <button type="submit" className={styles.btn}>{unit ? "Update Unit" : "Add Unit"}</button>
         {unit && (
          <button onClick={handleCancelEdit} className={styles.btn}>
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
}

export default UnitForm;






