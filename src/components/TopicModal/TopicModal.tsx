import { useEffect, useState } from 'react';
import styles from './TopicModal.module.css'; 
import { useForm } from 'react-hook-form';
import { createTopic, updateTopic } from '../../services';
import { Topic } from '../../types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  description: z.string().min(1),
});

export type TopicFields = z.infer<typeof schema>;

type TopicModalProps = {
  topic?: Topic;
  isOpen: boolean;
  onClose: () => void;
  handleCancelEdit?: () => void;
}

function TopicModal({ isOpen, onClose, topic }: TopicModalProps) {

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

 const { register, handleSubmit, reset,  formState: {errors, isSubmitting}, } = useForm<TopicFields>({defaultValues: topic ? {
    description: topic.description
 } : undefined, 
 resolver: zodResolver(schema)});

 const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (topic && !hasInitialized) {
      reset({ description: topic.description });
      setHasInitialized(true); 
    }
  }, [topic, reset, hasInitialized]);


  async function onSubmit(data: TopicFields) {
    if (topic) {
      try {
        if (topic.id !== undefined && topic.id !== null) {
          await updateTopic(topic.id, data);
        } else {
          setError('Invalid topic ID');
        }
        setError(null);
        onClose();
      } catch {
        setError('Error updating topic, please try again');
        setSuccess(null);
      }
    } else {
    try {
      await createTopic(data);
      onClose();
      setError(null);
    } catch {
      setError('Error creating topic, please try again');
      setSuccess(null);
    }
  }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{topic ? 'Edit Topic' : 'Add New Topic'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="description">Topic Description</label>
            <input
              id="description"
              type="text"
              {...register('description')}
              className={styles.input}
            />
            {errors.description && <div className={styles.fieldError}>{errors.description.message}</div>}
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.addBtn} disabled={isSubmitting}>
              {topic ? 'Save Changes' : 'Add Topic'}
            </button>
            <button type="button" onClick={onClose} className={styles.closeBtn}>
              Close
            </button>
          </div>
        </form>
      </div>
      {success && <p className={styles.success}>{success}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default TopicModal;





