import { CourseFormProps } from '../../types';
import styles from './CourseForm.module.css';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

export function CourseForm({
  register,
  onSubmit,
  success,
  error,
  errors,
  handleAddTopic,
  handleEditTopic,
  handleDeleteTopic,
  topicsList,
  course,
  handleCancelEdit,
  control,
}: CourseFormProps) {
  return (
    <div className={styles.container}>
      <h2>{course ? 'Edit Course' : 'Add Course'}</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        
        <div className={styles.formgroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            {...register('title')}
            className={styles.input}
          />
          {errors.title && <span className={styles.fieldError}>{errors.title.message}</span>}
        </div>

        <div className={styles.formgroup}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            {...register('price')}
            className={styles.input}
          />
          {errors.price && <span className={styles.fieldError}>{errors.price.message}</span>}
        </div>

        <div className={styles.formgroup}>
          <label>Topics</label>
          <div className={styles.topicsList}>
            {topicsList.map((topic) => (
              <div key={topic.id} className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id={`topic-${topic.id}`}
                  value={topic.id.toString()}
                  {...register('topics')}
                  className={styles.input}
                />
                <label htmlFor={`topic-${topic.id}`} className={styles.checkboxLabel}>
                  {topic.description}
                </label>

                <div className={styles.buttons}>
                  <button
                    type="button"
                    className={styles.editTopicBtn}
                    onClick={() => handleEditTopic(topic.id)}
                  >
                    Edit Topic
                  </button>
                  <button
                    type="button"
                    className={styles.deleteTopicBtn}
                    onClick={() => handleDeleteTopic(topic.id)}
                  >
                    Delete Topic
                  </button>
                </div>
              </div>
            ))}
          </div>
          {errors.topics && <span className={styles.fieldError}>{errors.topics.message}</span>}

          <div className={styles.buttons}>
            <button type="button" className={styles.btn} onClick={handleAddTopic}>
              Add New Topic
            </button>
          </div>
        </div>

        <div className={styles.formgroup}>
          <Controller
            name="level"
            control={control}
            defaultValue={course ? course.level : 'Beginner'}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: 'beginner', label: 'Beginner' },
                  { value: 'intermediate', label: 'Intermediate' },
                  { value: 'advanced', label: 'Advanced' }
                ]}
                onChange={(selectedOption) => {
                  console.log('Selected value:', selectedOption?.value);
                  field.onChange(selectedOption?.value);
                }}
                value={field.value ? { value: field.value, label: field.value } : null}
              />
            )}
          />
          {errors.level && <span className={styles.fieldError}>{errors.level.message}</span>}
        </div>

        <button type="submit" className={styles.btn}>
          {course ? 'Save Changes' : 'Add Course'}
        </button>

        {course && (
          <button onClick={handleCancelEdit} className={styles.btn}>
            Cancel Edit
          </button>
        )}
      </form>

      {error && <span className={styles.fieldError}>{error}</span>}
      {success && <span className={styles.success}>{success}</span>}
    </div>
  );
}

export default CourseForm;









