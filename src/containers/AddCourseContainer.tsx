import { useState, useEffect } from 'react';
import { useForm } from '../hooks';
import { createCourse, deleteTopic } from '../services';
import { loadTopics, loadLevels } from '../utils';
import { CourseForm, TopicModal } from '../components';
import { CourseData, Topic, Level } from '../types';
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

  if (!values.levelIds || values.levelIds.length === 0) {
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
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null); // Para manejar la edición de un tópico
  const navigate = useNavigate();
  const { setCourseId } = useCourseStore();


  const { values, handleChange, reset, errors, handleSubmit } = useForm<CourseData>(
    {
      title: '',
      price: 0,
      topics: [], // Este estado contiene los IDs de los tópicos seleccionados
      levelIds: []
    },
    validateCourseFields
  );

  useEffect(() => {
    loadTopics(setTopics, setError); // Cargar los tópicos existentes
    loadLevels(setLevelIds, setError); // Cargar los niveles
  }, []);

  const openTopicModal = () => {
    setEditingTopic(null); // Aseguramos que no se esté editando un tópico cuando se crea uno nuevo
    setIsTopicModalOpen(true);
  };

  const closeTopicModal = () => {
    setIsTopicModalOpen(false);
  };

  const handleNewTopicAdded = (newTopic: Topic) => {
    if (editingTopic) {
      // Si estamos editando un tópico, reemplazamos el tópico en la lista de 'topics'
      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
          topic.id === editingTopic.id ? { ...topic, description: newTopic.description } : topic
        )
      );
      // Actualizamos el 'editingTopic' para que tenga la descripción más reciente
      setEditingTopic((prev) => prev?.id === editingTopic.id ? { ...prev, description: newTopic.description } : prev);

      // Actualizamos 'values.topics' de forma inmutable
      values.topics = values.topics.map((id) => (id === editingTopic.id.toString() ? newTopic.id.toString() : id));
    } else {
      // Si estamos agregando un nuevo tópico
      setTopics((prevTopics) => [...prevTopics, newTopic]);
      values.topics.push(newTopic.id.toString()); // Añadir el ID del nuevo tópico a 'topics'
    }
  };

  const handleEditTopic = (topicId: number) => {
    const topic = topics.find((t) => t.id === topicId);
    if (topic) {
      setEditingTopic(topic); // Establecer el tópico a editar
      setIsTopicModalOpen(true); // Abrir el modal en modo edición
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
    // Eliminar el tópico de la lista de tópicos seleccionados
    setTopics((prevTopics) => prevTopics.filter((topic) => topic.id !== topicId));

    // Eliminar el tópico de 'values.topics'
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
        topics: values.topics.map(Number), // Convertir los IDs de tópicos a números
        levelIds: values.levelIds.map(Number) // Convertir los IDs de niveles a números
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
        levelsList={levelIds}
        handleAddTopic={openTopicModal}
        handleEditTopic={handleEditTopic} 
        handleDeleteTopic={handleDeleteTopic}
      />

      {/* Modal para agregar o editar tópico */}
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




