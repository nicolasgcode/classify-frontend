import styles from './CourseForm.module.css';

import { CourseFormProps } from '../../types';

const CourseForm: React.FC<CourseFormProps> = ({
  values,
  handleChange,
  onSubmit,
  handleCancel,
  success,
  error,
  errors,
  isEditing,
}) => {
  return (
    <div className={styles.container}>
      <h2>{isEditing ? 'Edit Course' : 'Add Course'}</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={values.price}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="topics">Topics</label>
          <input
            type="text"
            id="topics"
            name="topics"
            value={values.topics.map(topic => topic.description).join(', ')}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="levels">Levels</label>
          <input
            type="text"
            id="levels"
            name="levels"
            value={values.levels.map(level => level.name).join(', ')}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
    
        <button type="submit" className={styles.btn}>
          {isEditing ? 'Save Changes' : 'Add Course'}
        </button>
        {isEditing && (
          <button type="button" className={styles.btn} onClick={handleCancel}>
            Cancel
          </button>
        )}
      </form>
      {error &&  <span className={styles.fieldError}>{error}</span>}
      {success &&  <span className={styles.fieldError}>{success}</span>}
      {errors.firstName && <span className={styles.fieldError}>{errors.firstName}</span>}
      {errors.lastName && <span className={styles.fieldError}>{errors.lastName}</span>}
      {errors.position && <span className={styles.fieldError}>{errors.position}</span>}
      {errors.department && <span className={styles.fieldError}>{errors.department}</span>}
      {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
    </div>
  );
};

export default CourseForm;
