import axios from '../../libs/axios.ts';

import { useEffect, useState } from 'react';
import styles from './TopicModal.module.css'; 
import { useForm } from '../../hooks';


interface TopicModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  onTopicAdded: (newTopic: Topic) => void; 
  topicToEdit?: Topic; 
}

function TopicModal({ isOpen, onClose, onTopicAdded, topicToEdit }: TopicModalProps) {
  const validate = (values: { description: string }) => {
    const errors: { [key: string]: string } = {};
    if (!values.description) {
      errors.description = 'Topic description is required';
    }
    return errors;
  };

  const { values, handleChange, handleSubmit, reset, errors } = useForm(
    { description: topicToEdit ? topicToEdit.description : '' },
    validate
  );


 const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (topicToEdit && !hasInitialized) {
      // Solo resetear una vez, cuando el modal se abre y no se ha inicializado aún
      reset({ description: topicToEdit.description });
      setHasInitialized(true); // Marcar como inicializado
    }
  }, [topicToEdit, reset, hasInitialized]);

  const handleAddTopic = async () => {
    try {
      const response = topicToEdit
        ? await axios.put(`http://localhost:3000/api/topics/${topicToEdit.id}`, {
            description: values.description,
          })
        : await axios.post('http://localhost:3000/api/topics', { description: values.description });

      const newTopic = response.data.data;
      onTopicAdded(newTopic); 
      reset();
      onClose(); 
    } catch (error) {
      console.error('Error adding or updating topic:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{topicToEdit ? 'Edit Topic' : 'Add New Topic'}</h2>
        <form onSubmit={handleSubmit(handleAddTopic)}>
          <div>
            <label htmlFor="description">Topic Description</label>
            <input
              id="description"
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.description && <div className={styles.fieldError}>{errors.description}</div>}
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.addBtn}>
              {topicToEdit ? 'Save Changes' : 'Add Topic'}
            </button>
            <button type="button" onClick={onClose} className={styles.closeBtn}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TopicModal;





