import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useAuthFormSchema<T>(formType: T) {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === 'register'
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
}
