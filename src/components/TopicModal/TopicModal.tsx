import axios from 'axios';
import styles from './TopicModal.module.css'; // Asegúrate de tener los estilos adecuados
import useForm from '../../hooks/useForm'; // Importar el hook `useForm`

interface TopicModalProps {
  isOpen: boolean; // Si el modal está abierto o cerrado
  onClose: () => void; // Función para cerrar el modal
  onTopicAdded: (newTopic: { id: string; description: string }) => void; // Función para pasar el nuevo tópico agregado
}

function TopicModal({ isOpen, onClose, onTopicAdded }: TopicModalProps) {
  // Define la validación para el formulario
  const validate = (values: { description: string }) => {
    const errors: { [key: string]: string } = {};

    if (!values.description) {
      errors.description = 'Topic description is required';
    }

    return errors;
  };

  // Usa el hook useForm con validación
  const { values, handleChange, handleSubmit, reset, errors } = useForm(
    { description: '' },
    validate
  );

  // Función para manejar el envío del formulario y agregar el tópico
  const handleAddTopic = async () => {
    try {
      // Enviar los datos al backend
      const response = await axios.post('http://localhost:3000/api/topics', {
        description: values.description,
      });

      const newTopic = response.data.data; 
      
      onTopicAdded(newTopic);
      
      reset(); 
      onClose(); 
    } catch (error) {
      console.error('Error adding topic:', error);
    }
  };

  if (!isOpen) return null; 

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Add New Topic</h2>
        <form onSubmit={(e) => handleSubmit(handleAddTopic)(e)}>
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
            {errors.description && (
              <div className={styles.fieldError}>{errors.description}</div>
            )}
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.addBtn}>Add Topic</button>
            <button type="button" onClick={onClose} className={styles.closeBtn}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TopicModal;



