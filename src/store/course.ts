import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CourseState, CourseActions } from '../types';

export const useCourseStore = create(
  persist<CourseState & CourseActions>(
    (set) => ({
      courseId: null,
      setCourseId: (id: number | undefined) =>
        set({
          courseId: id,
        }),
      resetCourseId: () =>
        set({
          courseId: null,
        }),
    }),
    {
      name: 'course-id',
    }
  )
);
