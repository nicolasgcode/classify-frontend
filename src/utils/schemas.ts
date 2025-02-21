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
  dni: z
    .string() // Asumimos que viene como string (por ejemplo, por el input de tipo "number")
    .min(1, { message: 'DNI is required' })
    .transform((val) => Number(val)) // Convertir el valor a número
    .refine((val) => !isNaN(val), { message: 'DNI must be a valid number' }),
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});
