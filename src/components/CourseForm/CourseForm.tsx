import { CourseFormProps } from '../../types';
import styles from './CourseForm.module.css';

function CourseForm({
  values,
  handleChange,
  onSubmit,
  success,
  error,
  errors,
  isEditing,
  handleAddTopic,
  handleEditTopic,
  handleDeleteTopic, // Recibe la función de eliminar
  topicsList,
}: CourseFormProps) {
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
          {errors.title && <span className={styles.fieldError}>{errors.title}</span>}
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={values.price}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.price && <span className={styles.fieldError}>{errors.price}</span>}
        </div>

        <div>
          <label htmlFor="topics">Topics</label>
          <select
            id="topics"
            name="topics"
            multiple
            value={values.topics}
            onChange={handleChange}
            className={styles.input}
          >
            {topicsList.map((topic) => (
              <option key={topic.id} value={topic.id}>{topic.description}</option>
            ))}
          </select>
          {errors.topics && <span className={styles.fieldError}>{errors.topics}</span>}

          <div className={styles.buttons}>
            <button type="button" className={styles.btn} onClick={handleAddTopic}>
              Add New Topic
            </button>
            {values.topics.length === 1 && (
              <>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => handleEditTopic(Number(values.topics))}
                >
                  Edit Selected Topic
                </button>

                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => handleDeleteTopic(Number(values.topics))}
                >
                  Delete Selected Topic
                </button>
              </>
            )}
          </div>
        </div>

        <div>
            <label htmlFor="level">Level</label>
            <select
              id="level"
              name="level"
              value={values.level}
              onChange={handleChange} 
              className={styles.input}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            {errors.level && <span className={styles.fieldError}>{errors.level}</span>}
          </div>

        <button type="submit" className={styles.btn}>
          {isEditing ? 'Save Changes' : 'Add Course'}
        </button>
      </form>

      {error && <span className={styles.fieldError}>{error}</span>}
      {success && <span className={styles.fieldSuccess}>{success}</span>}
    </div>
  );
}

export default CourseForm;






