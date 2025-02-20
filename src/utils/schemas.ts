import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  price: z.string().min(1, { message: 'Price is required' }),
  level: z.string().min(1),
  topics: z
    .array(z.string())
    .min(1, { message: 'At least one topic is required' }),
});

export const unitSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = z.object({
  dni: z.string(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});
