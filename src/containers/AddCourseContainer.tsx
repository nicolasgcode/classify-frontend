import { useState, useEffect } from 'react';
import { useForm } from '../hooks';
import { createCourse } from '../services';
import { loadTopics, loadLevels } from '../utils';
import { CourseForm, TopicModal } from '../components';
import { CourseData, Topic, Level } from '../types';
import { useNavigate } from 'react-router-dom';

const validateCourseFields = (values: CourseData) => {
  const errors: { [key: string]: string } = {};

  if (!values.title) {
    errors.title = 'Title is required';
  }

  if (!values.price) {
    errors.price = 'Price is required';
  }

  if (!values.topics) {
    errors.topics = 'Topics cannot be empty';
  }

  if (!values.levelIds) {
    errors.levelIds = 'Levels cannot be empty';
  }

  return errors;
};

function AddCourseContainer() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]); // Lista de tópicos
  const [levelIds, setLevelIds] = useState<Level[]>([]); // Lista de niveles
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false); // Estado para abrir/cerrar el modal de tópico
  const [newTopic, setNewTopic] = useState<Topic | null>(null); // Para almacenar el nuevo tópico creado

  const navigate = useNavigate();

  const { values, handleChange, reset, errors, handleSubmit } = useForm<CourseData>(
    {
      title: '',
      price: 0,
      topics: [],
      levelIds: []
    },
    validateCourseFields
  );

  useEffect(() => {
    loadTopics(setTopics, setError); // Cargar los tópicos existentes
    loadLevels(setLevelIds, setError); // Cargar los niveles
  }, []);

  // Función para abrir el modal de "Add Topic"
  const openTopicModal = () => {
    setIsTopicModalOpen(true);
  };

  // Función para cerrar el modal
  const closeTopicModal = () => {
    setIsTopicModalOpen(false);
  };

  // Función para manejar el nuevo tópico creado en el modal
  const handleNewTopicAdded = (newTopic: Topic) => {
    setNewTopic(newTopic);
    setTopics((prevTopics) => [...prevTopics, newTopic]); // Agregar el nuevo tópico a la lista
    values.topics.push(newTopic.id.toString()); // Añadir el ID del nuevo tópico al estado de 'topics'
    setIsTopicModalOpen(false); // Cerrar el modal
  };

  const courseData = {
    ...values,
    topics: values.topics.map(Number), // Convertir los IDs de los tópicos a números
    levelIds: values.levelIds.map(Number), // Convertir los IDs de los niveles a números
  };

  const submitForm = async () => {
    try {
      const createdCourse = await createCourse(courseData);
      setSuccess('Course added successfully!');
      setError(null);
      reset();
      navigate(`/add-units/${createdCourse.id}`);
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
        isEditing={false}
        topicsList={topics} // Lista de tópicos que se muestra en el formulario
        levelsList={levelIds}
        handleAddTopic={openTopicModal} // Función para abrir el modal
      />

      {/* Modal para agregar nuevo tópico */}
      <TopicModal
        isOpen={isTopicModalOpen}
        onClose={closeTopicModal}
        onTopicAdded={handleNewTopicAdded} // Pasamos la función para manejar el nuevo tópico
      />
    </div>
  );
}

export default AddCourseContainer;


