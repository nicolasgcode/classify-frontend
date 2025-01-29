import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CourseState = {
  courseId: number | null; // ID del curso, inicialmente es null
};

type CourseActions = {
  setCourseId: (id: number | undefined) => void; // Función para establecer el courseId
  resetCourseId: () => void; // Función para resetear el courseId
};

export const useCourseStore = create(
  persist<CourseState & CourseActions>(
    (set) => ({
      courseId: null, // Valor inicial de courseId
      setCourseId: (id: number | undefined) =>
        set({
          courseId: id, // Establecer el courseId
        }),
      resetCourseId: () =>
        set({
          courseId: null, // Resetear el courseId
        }),
    }),
    {
      name: 'course-id', // Nombre del almacenamiento persistente en localStorage
    }
  )
);
