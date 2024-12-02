import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createCourse, deleteTopic, updateCourse, updateTopic } from '../services';
import { loadTopics } from '../utils';
import { CourseForm, TopicModal } from '../components';
import { CourseData, Topic } from '../types';
import { useNavigate } from 'react-router-dom';
import { useCourseStore } from '../store';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  title: z.string().min(1),
  price: z.string().min(1),
  level: z.string().min(1),
  topics: z.array(z.string()).min(1),
});

export type CourseFields = z.infer<typeof schema>;

type CourseFormProps = {
  course? : CourseData
  handleCancelEdit?: () => void;
}

function AddCourseContainer({ course, handleCancelEdit }: CourseFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]); 
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false); 
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null); 
  const navigate = useNavigate();
  const { setCourseId } = useCourseStore();
  const courseId = useCourseStore((state) => state.courseId);

const { register, handleSubmit, control, setValue, formState: {errors, isSubmitting}, } = useForm<CourseFields>({defaultValues: course ? {
  title: course.title,
  price: course.price.toString(),
  level: course.level,
  topics: course.topics.map((topic) => topic.id.toString()),
 } : undefined, 
 resolver: zodResolver(schema)});

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

  };

  const handleDeleteTopic = (topicId: number ) => {
    const confirmed = window.confirm('Are you sure you want to delete this topic?');
    if (!confirmed) {
      return;
    }
    borrarTopic(topicId);
    UpdateTopics(topicId);
  }

  async function onSubmit(data: CourseFields) {

    const price = parseFloat(data.price);
    const topics = data.topics.map((topicId) => parseInt(topicId, 10));

    const updatedData = {
      ...data,
      price,  
      topics
    };

    if (course) {
      try {
        await updateCourse(course.id, updatedData);
        setSuccess('Course updated successfully!');
        setError(null);
      } catch {
        setError('Error updating course, please try again');
        console.log(updatedData)
        setSuccess(null);
      }
    } else {
    try {
      const createdCourse = await createCourse(updatedData);
      setSuccess('Course created successfully!');
      setCourseId(createdCourse.course.courseCreated.id);
      console.log(courseId)
      console.log(setCourseId)
      setError(null);
      navigate('/add-units')
    } catch {
      setError('Error creating course, please try again');
      console.log(data)
      setSuccess(null);
    }
  }
  };

  return (
    <div>
      <CourseForm
        register={register}
        setValue={setValue}
        control={control}
        isSubmitting={isSubmitting}
        course={course}
        onSubmit={handleSubmit(onSubmit)}
        success={success}
        errors={errors}
        error={error}
        topicsList={topics}
        handleCancelEdit={handleCancelEdit}
        handleAddTopic={openTopicModal}
        handleEditTopic={handleEditTopic} 
        handleDeleteTopic={handleDeleteTopic}
      />

      <TopicModal
        topic={editingTopic}
        isOpen={isTopicModalOpen}
        onClose={closeTopicModal}
        topicToEdit={editingTopic} 
      />
    </div>
  );
}

export default AddCourseContainer;




