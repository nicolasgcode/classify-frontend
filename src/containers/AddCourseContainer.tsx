import { useState, useEffect } from 'react';
import { useForm } from '../hooks';
import { createCourse, deleteTopic } from '../services';
import { loadTopics } from '../utils';
import { CourseForm, TopicModal } from '../components';
import { CourseData, Topic } from '../types';
import { useNavigate } from 'react-router-dom';
import { useCourseStore } from '../store';

const validateCourseFields = (values: CourseData) => {
  const errors: { [key: string]: string } = {};

  if (!values.title) {
    errors.title = 'Title is required';
  }

  if (!values.price) {
    errors.price = 'Price is required';
  }

  if (!values.topics || values.topics.length === 0) {
    errors.topics = 'Topics cannot be empty';
  }

  if (!values.level) {
    errors.level = 'Level is required';
  }

  return errors;
};

function AddCourseContainer() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]); 
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false); 
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null); 
  const navigate = useNavigate();
  const { setCourseId } = useCourseStore();


  const { values, handleChange, reset, errors, handleSubmit } = useForm<CourseData>(
    {
      title: '',
      price: 0,
      topics: [], 
      level: '',
    },
    validateCourseFields
  );

  useEffect(() => {
    loadTopics(setTopics, setError); 
  }, []);

  const openTopicModal = () => {
    setEditingTopic(null); 
    setIsTopicModalOpen(true);
  };

  const closeTopicModal = () => {
    setIsTopicModalOpen(false);
  };

  const handleNewTopicAdded = (newTopic: Topic) => {
    if (editingTopic) {
      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
          topic.id === editingTopic.id ? { ...topic, description: newTopic.description } : topic
        )
      );

      setEditingTopic((prev) => prev?.id === editingTopic.id ? { ...prev, description: newTopic.description } : prev);

      
      values.topics = values.topics.map((id) => (id === editingTopic.id.toString() ? newTopic.id.toString() : id));
    } else {
      // Si estamos agregando un nuevo tópico
      setTopics((prevTopics) => [...prevTopics, newTopic]);
      values.topics.push(newTopic.id.toString()); 
    }
  };

  const handleEditTopic = (topicId: number) => {
    const topic = topics.find((t) => t.id === topicId);
    if (topic) {
      setEditingTopic(topic); 
      setIsTopicModalOpen(true); 
    }
  };

  const borrarTopic = async (topicId: number) => {
    try {
      await deleteTopic(topicId);
    } catch (err) {
      setError('Error deleting topic: ' + (err as Error).message);
    }
  }

const UpdateTopics = (topicId: number) => {
    setTopics((prevTopics) => prevTopics.filter((topic) => topic.id !== topicId));

    values.topics = values.topics.filter((id) => id !== topicId.toString());
  };

  const handleDeleteTopic = (topicId: number ) => {
    borrarTopic(topicId);
    UpdateTopics(topicId);
  }


  const submitForm = async () => {
    try {
      const createdCourse = await createCourse({
        ...values,
        topics: values.topics.map(Number),
      });
      setSuccess('Course added successfully!');
      setError(null);
      reset();
      setCourseId(createdCourse.id);
      navigate('/add-units');
    } catch (err) {
      setError('Error adding course: ' + (err as Error).message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <CourseForm
        values={values}
        handleChange={handleChange}
        onSubmit={handleSubmit(submitForm)}
        success={success}
        errors={errors}
        error={error}
        topicsList={topics}
        handleAddTopic={openTopicModal}
        handleEditTopic={handleEditTopic} 
        handleDeleteTopic={handleDeleteTopic}
      />

      <TopicModal
        isOpen={isTopicModalOpen}
        onClose={closeTopicModal}
        onTopicAdded={handleNewTopicAdded}
        topicToEdit={editingTopic} 
      />
    </div>
  );
}

export default AddCourseContainer;




