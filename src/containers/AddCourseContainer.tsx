import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { CourseForm, TopicModal } from '../components';
import { createCourse, deleteTopic, updateCourse } from '../services';
import { Topic, CourseFields, AddCourseProps } from '../types';
import { loadTopics, courseSchema } from '../utils';
import { useCourseStore } from '../store';

export function AddCourseContainer({
  course,
  handleCancelEdit = () => {},
}: AddCourseProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const { setCourseId } = useCourseStore();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CourseFields>({
    defaultValues: course
      ? {
          title: course.title,
          price: course.price.toString(),
          level: course.level,
          topics: course.topics.map((topic) =>
            typeof topic === 'number' ? topic.toString() : topic.id?.toString()
          ),
        }
      : undefined,
    resolver: zodResolver(courseSchema),
  });

  useEffect(() => {
    loadTopics(setTopics, setError);
  }, []);

  const openTopicModal = () => {
    setEditingTopic(null);
    setIsTopicModalOpen(true);
  };

  const closeTopicModal = () => {
    setIsTopicModalOpen(false);
    loadTopics(setTopics, setError);
  };

  const handleEditTopic = (topicId: number | undefined) => {
    const topic = topics.find((t) => t.id === topicId);
    if (topic) {
      setEditingTopic(topic);
      setIsTopicModalOpen(true);
    }
  };

  const borrarTopic = async (topicId: number | undefined) => {
    if (topicId == undefined) {
      return;
    }
    try {
      await deleteTopic(topicId);
    } catch (err) {
      setError('Error deleting topic: ' + (err as Error).message);
    }
  };

  const UpdateTopics = (topicId: number) => {
    setTopics((prevTopics) =>
      prevTopics.filter((topic) => topic.id !== topicId)
    );
  };

  const handleDeleteTopic = (topicId: number | undefined) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this topic?'
    );
    if (!confirmed) {
      return;
    }

    if (topicId == undefined) {
      return;
    }

    borrarTopic(topicId);
    UpdateTopics(topicId);
  };

  async function onSubmit(data: CourseFields) {
    const price = parseFloat(data.price);
    const topics = data.topics.map((topicId) => parseInt(topicId, 10));

    const updatedData = {
      ...data,
      price,
      topics,
    };

    if (course) {
      try {
        await updateCourse(course.id, updatedData);
        setSuccess('Course updated successfully!');
        setError(null);
        window.location.reload();
      } catch {
        setError('Error updating course, please try again');
        console.log(updatedData);
        setSuccess(null);
      }
    } else {
      try {
        const createdCourse = await createCourse(updatedData);
        setSuccess('Course created successfully!');
        setCourseId(createdCourse.id);
        setError(null);
        navigate('/addunits');
      } catch {
        setError('Error creating course, please try again');
        setSuccess(null);
      }
    }
  }

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
      />
    </div>
  );
}
